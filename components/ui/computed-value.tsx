import { cn } from "@/lib/utils";

type ComputedValueProps = {
	value: number;
	/** Currency prefix, e.g. "EUR €". */
	prefix: string;
	locale: string;
	label?: string;
	disabled?: boolean;
	className?: string;
};

/** A read-only, derived figure. Looks like a result, not an editable input. */
export function ComputedValue({
	value,
	prefix,
	locale,
	label,
	disabled,
	className,
}: ComputedValueProps) {
	return (
		<output
			aria-label={label}
			className={cn(
				"flex h-9 w-full min-w-0 items-center justify-end rounded-md border border-dashed border-input bg-muted/60 px-3 text-sm text-muted-foreground tabular-nums select-text md:text-sm",
				disabled && "opacity-50",
				className,
			)}
		>
			{prefix} {new Intl.NumberFormat(locale).format(value)}
		</output>
	);
}
