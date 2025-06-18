CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
