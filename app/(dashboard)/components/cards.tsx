import { getAllForms } from "@/db/queries/form";
import type { SelectForm } from "@/db/schema";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";
import { CornerDownRight } from "lucide-react";
import Link from "next/link";

TimeAgo.addDefaultLocale(es);
const timeAgo = new TimeAgo("es-ES");

const FormCard = ({
	title,
	formId,
	imageUrl,
	updatedAt,
}: SelectForm & { imageUrl?: string | null }) => {
	return (
		<Link href={`/dashboard/form/${formId}`}>
			<div className="flex items-center rounded-lg border border-neutral-200 bg-[#FCFCFC] text-foreground transition-all hover:bg-white hover:drop-shadow-card-hover">
				<div className="grid w-full gap-y-1 px-4 py-2.5 text-sm">
					<h3 className="font-bold text-sm">{title}</h3>
					<div className="flex items-center space-x-1.5 font-semibold text-xs">
						<CornerDownRight className="size-3" />
						<span className="opacity-80">Censosud</span>
						{imageUrl ? (
							<img
								src={imageUrl}
								alt="User Avatar"
								className="size-4 rounded-full"
							/>
						) : null}
						{updatedAt ? (
							<span className="opacity-80">
								{timeAgo.format(new Date(updatedAt))}
							</span>
						) : null}
					</div>
				</div>
			</div>
		</Link>
	);
};

export async function FormCardsFeed({
	userId,
	imageUrl,
}: { userId: string; imageUrl?: string | null }) {
	const mooontos = await getAllForms({ userId });
	// console.log(mooontos);

	return (
		<>
			{mooontos.map((form) => (
				<FormCard key={form.id} {...form} imageUrl={imageUrl} />
			))}
		</>
	);
}
