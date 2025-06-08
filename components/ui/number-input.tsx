import { cn } from "@/lib/utils";
import CurrencyInput, {
	type CurrencyInputProps,
} from "react-currency-input-field";

export function NumberInput({
	className,
	onChange,
	value,
	...props
}: Omit<CurrencyInputProps, "onValueChange"> & {
	onChange?: (value: number) => void;
}) {
	const handleValueChange = (value: string | undefined) => {
		onChange?.(Number(value ?? 0));
	};

	return (
		<CurrencyInput
			className={cn(
				"flex h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-end text-sm shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:text-base md:text-sm dark:bg-input/30",
				"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
				"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				className,
			)}
			value={value || ""}
			{...props}
			onValueChange={handleValueChange}
		/>
	);
}
