import express from "express";
import { db } from "./db/db";
import { users as usersTable } from "./db/schema/schema";
import { config } from "./config";
import { eq } from "drizzle-orm";
import redisClient from "./redis";

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
      const result = await db.insert(usersTable).values({ name, email }).returning();
      await redisClient.del('users');
      const allUsers = await db.select().from(usersTable);
      await redisClient.set('users', JSON.stringify(allUsers),{
        EX:3600,
      });
      res.status(200).json({
        user: result[0],
        existingUser: existingUser?"ExistingUser added":"New User added"
      });
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
    await redisClient.del('users');
    await redisClient.set('users', JSON.stringify(users), {
        EX:3600,
    });
    end = Date.now();
    totalTime = end - start;
    res.status(200).json({
        users,
        time: `${totalTime} ms`,
        source:'postgres'
    });
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
        return;
    }
})

app.get('/users/redis', async (req, res) => {
    start = Date.now();
    try {
    const users = await redisClient.get('users');
    end = Date.now();
    totalTime = end - start;
    res.status(200).json({users: JSON.parse(users as string), time: `${totalTime} ms`, source:'redis'});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
        return;
    }
})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})