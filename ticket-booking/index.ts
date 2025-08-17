import express from "express";
import  type { Request, Response } from "express"
import { prisma } from "./db/prisma"
import Redis from "ioredis";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./config";

const redis = new Redis(config.redis!);
const app = express();

app.use(express.json());

const JWT_SECRET = config.jwt || 'default-secret';


app.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed }
    });
    res.json(user);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid creds" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid creds" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

const auth = async (req: Request, res: Response, next: any) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token!, JWT_SECRET);
    (req as any).userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.post("/events", auth, async (req: Request, res: Response) => {
  const { name, seats } = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        name,
        seats: {
          create: seats.map((seatNo: string) => ({ seatNo }))
        }
      },
      include: { seats: true }
    });
    res.json(event);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});


app.get("/events", async (_: Request, res: Response) => {
  const events = await prisma.event.findMany({
    include: { seats: true }
  });
  res.json(events);
});



app.post("/book", auth, async (req: Request, res: Response) => {
  const { seatId } = req.body;
  const userId = (req as any).userId;

  const lockKey = `lock:seat:${seatId}`;
  const lockTTL = 5000;

  try {
    const lock = await redis.set(lockKey, "locked", "PX", lockTTL, "NX");

    if (!lock) {
      return res
        .status(423)
        .json({ success: false, message: "Seat is being booked, try again." });
    }

    const booking = await prisma.$transaction(async (tx) => {
      const seat = await tx.seat.findUnique({
        where: { id: seatId },
        include: { booking: true }
      });

      if (!seat) {
        throw new Error("Seat not found");
      }

      if (seat.booking) {
        throw new Error("Seat already booked");
      }

      return await tx.booking.create({
        data: { userId, seatId }
      });
    });

    res.json({ success: true, booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  } finally {
    await redis.del(lockKey);
  }
});

app.get("/bookings", async (_: Request, res: Response) => {
  const bookings = await prisma.booking.findMany({
    include: { user: true, seat: { include: { event: true } } }
  });
  res.json(bookings);
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
