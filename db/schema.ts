import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
	id: integer("id").primaryKey(),
	userId: text("user_id").unique().notNull(),
	username: text("username").unique(),
	firstName: text("name").notNull(),
	lastName: text("last_name").notNull(),
	fullName: text("full_name").notNull(),
	email: text("email").unique().notNull(),
	imageUrl: text("image_url"),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const formsTable = sqliteTable("forms", {
	id: integer("id").primaryKey(),
	title: text("title").notNull(),
	formId: text("form_id").unique().default(sql`(gen_random_uuid())`).notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.userId, { onDelete: "cascade" }),
	description: text("description"),
	slug: text("slug").unique(),
	// folderId: integer("folder_id").references(() => foldersTable.id),
	isFavorite: integer("is_favorite", { mode: "boolean" })
		.default(sql`(0)`)
		.notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const tagsTable = sqliteTable("tags", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.userId, { onDelete: "cascade" }),
	color: text("color").default("#6B7280"),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const formTagsTable = sqliteTable("form_tags", {
	id: integer("id").primaryKey(),
	formId: text("form_id")
		.notNull()
		.references(() => formsTable.formId, { onDelete: "cascade" }),
	tagId: integer("tag_id")
		.notNull()
		.references(() => tagsTable.id, { onDelete: "cascade" }),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const formExpensesTable = sqliteTable("form_expenses", {
	id: integer("id").primaryKey(),
	formId: text("form_id")
		.notNull()
		.references(() => formsTable.formId, { onDelete: "cascade" }),
	// work expenses form (part1)
	selfEmployed: integer("self_employed", { mode: "number" }).notNull(),
	consultancy: integer("consultancy", { mode: "number" }).notNull(),
	lifecycleEquipment: integer("lifecycle_equipment", {
		mode: "number",
	}).notNull(),
	subscriptions: integer("subscriptions", { mode: "number" }).notNull(),
	cowork: integer("cowork", { mode: "boolean" }).notNull(),
	officeRent: integer("office_rent", { mode: "number" }),
	officeInsurance: integer("office_insurance", { mode: "number" }),
	officeBills: integer("office_bills", { mode: "number" }),
	officeInternet: integer("office_internet", { mode: "number" }),
	gasoline: integer("gasoline", { mode: "number" }).notNull(),
	coffee: integer("coffee", { mode: "number" }).notNull(),
	water: integer("water", { mode: "number" }).notNull(),
	// living expenses form (part2)
	livingExpenses: integer("living_expenses", { mode: "number" }).notNull(),
	commonExpenses: integer("common_expenses", { mode: "number" }).notNull(),
	food: integer("food", { mode: "number" }).notNull(),
	gym: integer("gym", { mode: "number" }).notNull(),
	entertainment: integer("entertainment", { mode: "number" }).notNull(),
	clothes: integer("clothes", { mode: "number" }).notNull(),
	carFee: integer("car_fee", { mode: "number" }).notNull(),
	livingExpensesTwo: integer("living_expenses_two", { mode: "number" }),
	internet: integer("internet", { mode: "number" }).notNull(),
	personalPhone: integer("personal_phone", { mode: "number" }).notNull(),
	healthPlan: integer("health_plan", { mode: "number" }).notNull(),
	retirementFund: integer("retirement_fund", { mode: "number" }).notNull(),
	otherExpenses: integer("other_expenses", { mode: "number" }).notNull(),
	childrens: integer("childrens", { mode: "boolean" }).notNull(),
	quantityChildrens: integer("quantity_childrens", {
		mode: "number",
	}),
	childrensExpenses: integer("childrens_expenses", { mode: "number" }),
	livingExpensesTwoTwo: integer("living_expenses_two_two", {
		mode: "number",
	}),
	carInsurance: integer("car_insurance", { mode: "number" }),
	taxes: integer("taxes", { mode: "number" }),
	// additional costs form
	unExpectedExpenses: integer("un_expected_expenses", { mode: "number" }),
	valueContribution: integer("value_contribution", { mode: "number" }),
	incomeTaxRetention: integer("income_tax_retention", { mode: "number" }),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertForm = typeof formsTable.$inferInsert;
export type SelectForm = typeof formsTable.$inferSelect;

export type InsertFormExpenses = typeof formExpensesTable.$inferInsert;
export type SelectFormExpenses = typeof formExpensesTable.$inferSelect;
