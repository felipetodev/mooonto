import { createForm, createFormExpenses } from "@/db/queries/form";
import { createUser, getUserById } from "@/db/queries/user";
import { type FormValues, formSchema } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { FormCardsFeed } from "../components/cards";
import { CardsSkeleton } from "../components/cards-skeleton";

export default async function Page({ searchParams }: { searchParams: any }) {
	const auth = await currentUser();

	if (!auth) {
		console.error("Unauthorized");
		redirect("/");
	}

	const { id: userId } = auth;

	const user = await getUserById({ userId });

	const params = await searchParams;

	if (Object.keys(params).length > 0 && !user) {
		// check for valid form values in search params
		try {
			const formValuesEntries = Object.entries(params);

			const formParsed = formValuesEntries.reduce<Record<string, unknown>>(
				(acc, [key, value]) => {
					if (!isNaN(Number(value))) {
						acc[key] = Number(value);
					} else if (value === "true" || value === "false") {
						acc[key] = value === "true";
					} else if (value === "undefined") {
						acc[key] = undefined;
					}

					return acc;
				},
				{},
			) as FormValues;

			const { success, data: formData } = formSchema.safeParse(formParsed);

			if (auth && success) {
				await createUser({
					userId,
					username: auth.username,
					firstName: auth.firstName || "",
					lastName: auth.lastName || "",
					fullName: auth.fullName || "",
					email: auth.emailAddresses[0]?.emailAddress,
					imageUrl: auth.imageUrl,
				});

				const formId = await createForm({
					userId,
					title: "Bienvenido a tu primer mooonto 👋",
				});

				await createFormExpenses({
					formId,
					...formData,
				});
			}
		} catch (error) {
			console.error("User is doing something weird: ", error);
			notFound();
		}
	}

	return (
		<Suspense fallback={<CardsSkeleton />}>
			<FormCardsFeed userId={userId} imageUrl={user?.imageUrl} />
		</Suspense>
	);
}
