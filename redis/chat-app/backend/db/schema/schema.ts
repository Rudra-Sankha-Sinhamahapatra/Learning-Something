import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    senderId: integer().references(() => usersTable.id, {onDelete: "cascade"}),
    receiverId: integer().references(() => usersTable.id, {onDelete: "cascade"}),
    content: text().notNull(),
    sentAt: timestamp().notNull().defaultNow(),
    isRead: boolean().notNull().default(false),
}, (table) => ({
     senderIdx: index("sender_idx").on(table.senderId),
     receiverIdx: index("receiver_idx").on(table.receiverId),
     sentAtIdx: index("sent_at_idx").on(table.sentAt),
     isReadIdx: index("is_read_idx").on(table.isRead),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  sentMessages: many(messagesTable, {relationName:"sender"}),
  receivedMessages: many(messagesTable, {relationName:"receiver"}),
}))

export const messagesRelations = relations(messagesTable, ({ one }) => ({
    sender: one(usersTable, {
      fields: [messagesTable.senderId],
      references: [usersTable.id],
      relationName: "sender",
    }),
    receiver: one(usersTable, {
      fields: [messagesTable.receiverId],
      references: [usersTable.id],
      relationName: "receiver",
    })
}))