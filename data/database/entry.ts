import { PGlite } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import { drizzle } from 'drizzle-orm/pglite';
import initialSchemaSql from './migrations/0000_rich_vision.sql?raw';

export const pglite = await PGlite.create('idb://distribu-pglite', {
  relaxedDurability: true,
  extensions: { live },
});

await applyInitialSchemaIfMissing();

export const db = drizzle(pglite);

/**
 * Creates the database tables the first time the app runs in a browser,
 * detected by the absence of the "distribus" table. Does nothing otherwise.
 *
 * @returns Promise that resolves once the schema is guaranteed to exist
 */
async function applyInitialSchemaIfMissing(): Promise<void> {
  const { rows } = await pglite.query<{ table_name: string | null }>(
    `select to_regclass('public.distribus') as table_name`,
  );
  if (rows[0]?.table_name) return;

  await pglite.exec(initialSchemaSql);
}

// TODO: Apply migrations automatically on startup using Drizzle. You have a Note describing how
// It might be a good idea to implement this conditionally using a local storage variable (initialize the database if it has not being initiailized yet)

// The following is the method I used (the pglite-native way) for introducing a schema to the browser-based PGlite database

// await pglite.exec(`
//   CREATE TYPE "public"."recurrence_frequency" AS ENUM('daily', 'weekly', 'monthly');--> statement-breakpoint
// CREATE TYPE "public"."role" AS ENUM('manager', 'viewer');--> statement-breakpoint
// CREATE TABLE "distribu_roles" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"distribu_id" integer NOT NULL,
// 	"user_id" integer NOT NULL,
// 	"role" "role" DEFAULT 'viewer' NOT NULL,
// 	"created_at" timestamp with time zone DEFAULT now() NOT NULL
// );
// --> statement-breakpoint
// CREATE TABLE "distribus" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"name" text NOT NULL,
// 	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
// 	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
// 	CONSTRAINT "distribus_name_unique" UNIQUE("name")
// );
// --> statement-breakpoint
// CREATE TABLE "incomes" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"distribu_id" integer NOT NULL,
// 	"source" text,
// 	"amount" numeric(12, 2) NOT NULL,
// 	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
// 	"notes" text
// );
// --> statement-breakpoint
// CREATE TABLE "recurring_incomes" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"income_id" integer NOT NULL,
// 	"frequency" "recurrence_frequency" DEFAULT 'monthly',
// 	"next_occurrence" timestamp with time zone NOT NULL
// );
// --> statement-breakpoint
// CREATE TABLE "recurring_uses" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"use_id" integer NOT NULL,
// 	"frequency" "recurrence_frequency" DEFAULT 'monthly',
// 	"next_occurrence" timestamp with time zone NOT NULL
// );
// --> statement-breakpoint
// CREATE TABLE "reserve_tags" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"reserve_id" integer NOT NULL,
// 	"tag_id" integer NOT NULL
// );
// --> statement-breakpoint
// CREATE TABLE "reserves" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"distribu_id" integer NOT NULL,
// 	"name" text NOT NULL,
// 	"position" integer NOT NULL,
// 	"amount_assigned" numeric(12, 2) NOT NULL,
// 	"is_monthly" boolean NOT NULL,
// 	"is_active" boolean DEFAULT true NOT NULL,
// 	"notes" text,
// 	CONSTRAINT "reserves_name_unique" UNIQUE("name")
// );
// --> statement-breakpoint
// CREATE TABLE "sessions" (
// 	"id" text PRIMARY KEY NOT NULL,
// 	"user_id" integer NOT NULL,
// 	"expires_at" timestamp with time zone NOT NULL,
// 	"created_at" timestamp with time zone DEFAULT now() NOT NULL
// );
// --> statement-breakpoint
// CREATE TABLE "tags" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"name" text NOT NULL,
// 	CONSTRAINT "tags_name_unique" UNIQUE("name")
// );
// --> statement-breakpoint
// CREATE TABLE "users" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"username" text NOT NULL,
// 	"password_hash" text NOT NULL,
// 	"salt" text NOT NULL,
// 	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
// 	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
// 	CONSTRAINT "users_username_unique" UNIQUE("username")
// );
// --> statement-breakpoint
// CREATE TABLE "uses" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"reserve_id" integer,
// 	"amount" numeric(12, 2) NOT NULL,
// 	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
// 	"notes" text
// );
// --> statement-breakpoint
// ALTER TABLE "distribu_roles" ADD CONSTRAINT "distribu_roles_distribu_id_distribus_id_fk" FOREIGN KEY ("distribu_id") REFERENCES "public"."distribus"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "distribu_roles" ADD CONSTRAINT "distribu_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "incomes" ADD CONSTRAINT "incomes_distribu_id_distribus_id_fk" FOREIGN KEY ("distribu_id") REFERENCES "public"."distribus"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "recurring_incomes" ADD CONSTRAINT "recurring_incomes_income_id_incomes_id_fk" FOREIGN KEY ("income_id") REFERENCES "public"."incomes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "recurring_uses" ADD CONSTRAINT "recurring_uses_use_id_uses_id_fk" FOREIGN KEY ("use_id") REFERENCES "public"."uses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "reserve_tags" ADD CONSTRAINT "reserve_tags_reserve_id_reserves_id_fk" FOREIGN KEY ("reserve_id") REFERENCES "public"."reserves"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "reserve_tags" ADD CONSTRAINT "reserve_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "reserves" ADD CONSTRAINT "reserves_distribu_id_distribus_id_fk" FOREIGN KEY ("distribu_id") REFERENCES "public"."distribus"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// ALTER TABLE "uses" ADD CONSTRAINT "uses_reserve_id_reserves_id_fk" FOREIGN KEY ("reserve_id") REFERENCES "public"."reserves"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
// CREATE INDEX "distribu_roles_distribu_id_idx" ON "distribu_roles" USING btree ("distribu_id");--> statement-breakpoint
// CREATE INDEX "distribu_roles_user_id_idx" ON "distribu_roles" USING btree ("user_id");--> statement-breakpoint
// CREATE INDEX "incomes_distribu_id_idx" ON "incomes" USING btree ("distribu_id");--> statement-breakpoint
// CREATE INDEX "incomes_created_at_idx" ON "incomes" USING btree ("created_at");--> statement-breakpoint
// CREATE INDEX "reserves_distribu_id_idx" ON "reserves" USING btree ("distribu_id");--> statement-breakpoint
// CREATE INDEX "reserves_position_idx" ON "reserves" USING btree ("position");--> statement-breakpoint
// CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
// CREATE INDEX "sessions_expires_at_idx" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
// CREATE INDEX "uses_reserve_id_idx" ON "uses" USING btree ("reserve_id");--> statement-breakpoint
// CREATE INDEX "uses_created_at_idx" ON "uses" USING btree ("created_at");
//   `);
