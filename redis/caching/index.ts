import express from "express";
import { db } from "./db/db";
import { users as usersTable } from "./db/schema/schema";
import { config } from "./config";
import { eq } from "drizzle-orm";

const app = express();
app.use(express.json());

let start;
let end;
let totalTime;

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    if(!name || !email) {
        res.status(400).json({error: 'Name and email are required'});
        return;
    }
  
    try {usersTable
      const existingUser = await db.query.users.findFirst({
        where: eq(usersTable.email, email),
      });
      if(existingUser) {
        res.status(400).json({error: 'User already exists'});
        return;
      }
      const result = await db.insert(usersTable).values({ name, email }).returning();
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(500).json({ error: 'Insertion failed' });
      console.log(err);
      return;
    }
  });

app.get('/users', async (req, res) => {
    start = Date.now();
    try {
    const users = await db.select().from(usersTable);
    end = Date.now();
    totalTime = end - start;
    res.status(200).json({
        users,
        time: `${totalTime} ms`,
    });
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
        return;
    }
})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})