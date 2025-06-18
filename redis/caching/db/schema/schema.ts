import { pgTable, varchar,serial, text } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length:100}),
    email: text('email'),
})