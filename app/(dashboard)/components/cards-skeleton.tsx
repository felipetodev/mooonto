export function CardsSkeleton() {
	return (
		<div className="grid gap-y-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					className="h-[62px] rounded-lg border border-neutral-200 bg-[#FCFCFC]"
				/>
			))}
		</div>
	);
}
