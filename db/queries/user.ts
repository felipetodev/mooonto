import { db } from "@/db";
import { type SelectUser, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type User = Pick<
	SelectUser,
	| "username"
	| "firstName"
	| "lastName"
	| "fullName"
	| "email"
	| "userId"
	| "imageUrl"
>;

export const createUser = async (userPayload: User) => {
	await db.insert(usersTable).values(userPayload);
};

export async function getUserById({
	userId,
}: { userId: SelectUser["userId"] }): Promise<SelectUser | null> {
	return db
		.select()
		.from(usersTable)
		.where(eq(usersTable.userId, userId))
		.limit(1)
		.then(([users]) => users ?? null);
}
