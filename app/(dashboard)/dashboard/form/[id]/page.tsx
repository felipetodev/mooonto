import { FormUpdates } from "@/app/(dashboard)/components/form-updates";
import { getFormExpensesByFormId } from "@/db/queries/form";
import { getCurrencyCookie } from "@/lib/utils.server";
import { formSchema } from "@/schemas/form";
import { notFound } from "next/navigation";

export default async function FormPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: formId } = await params;

	const intlConfig = await getCurrencyCookie();

	const form = await getFormExpensesByFormId({ formId });

	if (!form) {
		notFound();
	}

	const { id, formId: _formId, ...formEntryValues } = form;

	const parsedDefaultValues = Object.fromEntries(
		Object.entries(formEntryValues).map(([key, value]) => [
			key,
			value === null ? undefined : value,
		]),
	);

	const { success, data } = formSchema.safeParse(parsedDefaultValues);

	if (!success) {
		console.error("Form validation failed:");
		notFound();
	}

	return (
		<div className="text-black">
			<FormUpdates defaultValues={data} intlConfig={intlConfig} />
		</div>
	);
}
