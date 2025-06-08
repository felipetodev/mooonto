import { db } from "@/db";
import {
	type InsertForm,
	type InsertFormExpenses,
	type SelectForm,
	type SelectFormExpenses,
	formExpensesTable,
	formsTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const createForm = async (payload: InsertForm) => {
	return await db
		.insert(formsTable)
		.values(payload)
		.returning({ formId: formsTable.formId })
		.then((result) => result[0].formId);
};

export const getFormById = async ({
	formId,
}: {
	formId: SelectForm["formId"];
}): Promise<SelectForm | null> => {
	return await db
		.select()
		.from(formsTable)
		.where(eq(formsTable.formId, formId))
		.then((forms) => forms[0] || null);
};

export const getAllForms = async ({
	userId,
}: { userId: SelectForm["userId"] }): Promise<SelectForm[]> => {
	return await db
		.select()
		.from(formsTable)
		.where(eq(formsTable.userId, userId));
};

export const createFormExpenses = async (formValues: InsertFormExpenses) => {
	await db.insert(formExpensesTable).values(formValues);
};

export const getFormExpensesByFormId = async ({
	formId,
}: {
	formId: SelectFormExpenses["formId"];
}): Promise<SelectFormExpenses | null> => {
	return await db
		.select()
		.from(formExpensesTable)
		.where(eq(formExpensesTable.formId, formId))
		.then((forms) => forms[0] || null);
};
