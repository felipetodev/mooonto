"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useCookies from "@/hooks/use-cookies";
import {
	CURRENCY_COOKIE_KEY,
	CURRENCY_SELECTOR,
	DEFAULT_CURRENCY,
} from "@/lib/constants";
import { useRouter } from "next/navigation";

function CurrencySelector() {
	const [currency, setCurrency] = useCookies(
		CURRENCY_COOKIE_KEY,
		DEFAULT_CURRENCY,
	);
	const router = useRouter();

	return (
		<Select
			defaultValue={currency}
			onValueChange={(e) => {
				setCurrency(e);
				router.refresh();
			}}
		>
			<SelectTrigger className="rounded-3xl">
				<SelectValue placeholder="$ CLP" />
			</SelectTrigger>
			<SelectContent align="end">
				<SelectGroup>
					<SelectLabel>Moneda:</SelectLabel>
					{CURRENCY_SELECTOR.map((c) => (
						<SelectItem key={c.name} value={c.currency}>
							<div className="flex space-x-2">
								<img
									src={`https://hatscripts.github.io/circle-flags/flags/${c.locale?.toLowerCase()}.svg`}
									width="20"
									alt={c.name}
								/>
								<span>
									{c.symbol} {c.currency}
								</span>
							</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export default CurrencySelector;
