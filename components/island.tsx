"use client";

// Recibo — the full ledger (default island).
// Every field the user typed, line by line, in the shape of the report they
// are about to generate. Any line jumps back to its field.

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView } from "motion/react";
import { type RefObject, useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import type { FormCompletionProgressResult } from "@/hooks/use-form-completions";
import {
	type Row,
	buildIslandSummary,
	entered,
	money,
} from "@/lib/island-fields";
import type { IntlConfig } from "@/lib/types";
import type { FormValues } from "@/schemas/form";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const SPRING = { type: "spring", duration: 0.35, bounce: 0 } as const;

type IslandProps = {
	formRef: RefObject<HTMLFormElement | null>;
	formResults: FormCompletionProgressResult;
	formValues: FormValues;
	intlConfig: IntlConfig;
	onJump: (name: keyof FormValues) => void;
};

export function Island({
	formRef,
	formResults,
	formValues,
	intlConfig,
	onJump,
}: IslandProps) {
	const symbol = intlConfig.symbol;
	const isInView = useInView(formRef, { margin: "500px 0px -250px 0px" });
	const base = useMemo(
		() => buildIslandSummary(formValues, formResults),
		[formValues, formResults],
	);
	const summary = {
		...base,
		hourlyContracted: formResults.minimumHourlyRateBeingContracted,
		hourlyFreelance: formResults.minimumHourlyRateBeingFreelance,
		total: formResults.totalResult,
	};
	const [open, setOpen] = useState(false);
	const [onlyMissing, setOnlyMissing] = useState(false);
	const [ref, { height }] = useMeasure();

	const missing = summary.missing.length;
	const sections = summary.sections
		.map((section) => ({
			...section,
			visible: onlyMissing ? section.missing : section.rows,
		}))
		.filter((section) => section.visible.length > 0);

	const jump = (name: keyof FormValues) => {
		setOpen(false);
		onJump(name);
	};

	return (
		<AnimatePresence>
			{isInView ? (
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { duration: 0.1 } }}
					className="pointer-events-none sticky bottom-0 z-20 flex h-28 justify-center"
				>
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.25, ease: EASE_OUT }}
						className="pointer-events-auto absolute bottom-4 w-[min(100%,440px)] rounded-2xl border bg-white shadow-lg"
					>
						<motion.div
							initial={false}
							animate={{ height: open ? height : 0 }}
							transition={SPRING}
							className="overflow-hidden"
						>
							<div
								ref={ref}
								id="receipt-panel"
								inert={!open}
								className="max-h-[min(60vh,520px)] overflow-y-auto overscroll-contain px-4 pt-4 font-mono text-[13px]"
							>
								<header className="flex items-start justify-between gap-x-3">
									<div>
										<p className="font-bold tracking-[0.2em]">MOOONTO</p>
										<p className="text-xs text-muted-foreground">
											Borrador de tu reporte
										</p>
									</div>
									<button
										type="button"
										aria-pressed={onlyMissing}
										onClick={() => setOnlyMissing((v) => !v)}
										className={cn(
											"rounded-full border px-2.5 py-1 text-xs transition-colors duration-150 ease-out",
											onlyMissing && "border-primary bg-primary text-white",
										)}
									>
										Solo lo que falta ({missing})
									</button>
								</header>

								{sections.length === 0 ? (
									<p className="py-8 text-center text-muted-foreground">
										No falta nada. Todo listo.
									</p>
								) : null}

								{sections.map((section, index) => (
									<motion.section
										key={section.id}
										initial={false}
										animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
										transition={{
											duration: 0.2,
											ease: EASE_OUT,
											delay: open ? 0.05 + index * 0.04 : 0,
										}}
										className="mt-4 border-t border-dashed pt-3"
									>
										<h3 className="mb-1 text-xs font-bold tracking-wider uppercase">
											{section.title}
										</h3>
										<ul>
											{section.visible.map((row) => (
												<li key={row.def.name}>
													<ReceiptRow
														row={row}
														symbol={symbol}

														onClick={() => jump(row.def.name)}
													/>
												</li>
											))}
										</ul>
										{!onlyMissing ? (
											<p className="mt-1 flex justify-between px-1.5 font-bold">
												<span>Subtotal</span>
												<span>{money(section.total, symbol)}</span>
											</p>
										) : null}
									</motion.section>
								))}

								<footer className="mt-4 border-t-2 border-double border-[#1A1A18] py-3">
									<p className="flex justify-between px-1.5 text-xs text-muted-foreground">
										<span>Hora contratado / freelance</span>
										<span>
											{money(summary.hourlyContracted, symbol)} /{" "}
											{money(summary.hourlyFreelance, symbol)}
										</span>
									</p>
								</footer>
							</div>
						</motion.div>

						<div
							className={cn(
								"flex items-center gap-x-3 p-3",
								open && "border-t border-dashed",
							)}
						>
							<div className="min-w-0 flex-1 font-mono leading-tight">
								<p className="text-xs text-muted-foreground">
									{summary.filledCount} de {summary.requiredCount} campos
									{missing > 0 ? (
										<span className="text-primary"> · faltan {missing}</span>
									) : null}
								</p>
								<p className="text-lg font-bold">
									{money(summary.total, symbol)}
									<span className="text-xs font-normal text-muted-foreground">
										{" "}
										/mes
									</span>
								</p>
							</div>
							<Button
								type="button"
								className="h-9 transition-transform duration-150 ease-out active:scale-[0.97]"
								onClick={() => setOpen((o) => !o)}
								aria-expanded={open}
								aria-controls="receipt-panel"
							>
								{open ? "Ocultar" : "Ver detalle"}
							</Button>
						</div>
					</motion.div>
				</motion.section>
			) : null}
		</AnimatePresence>
	);
}

function ReceiptRow({
	row,
	symbol,
	onClick,
}: {
	row: Row;
	symbol: string;
	onClick: () => void;
}) {
	const converted =
		row.filled && (row.def.yearly || row.def.name === "childrensExpenses");

	return (
		<button
			type="button"
			onClick={onClick}
			title="Ir al campo"
			className={cn(
				"flex w-full items-baseline gap-x-2 rounded px-1.5 py-1 text-left transition-colors duration-150 ease-out hover:bg-muted",
			)}
		>
			<span className={cn("truncate", !row.filled && "text-primary")}>
				{row.def.label}
			</span>
			<span
				aria-hidden="true"
				className="min-w-4 flex-1 -translate-y-0.75 border-b border-dotted border-[#1A1A18]/30"
			/>
			{row.filled ? (
				<span className="shrink-0 text-right">
					{converted ? (
						<span className="mr-2 text-xs text-muted-foreground">
							{row.def.yearly ? `${entered(row, symbol)}/año` : "por persona"}
						</span>
					) : null}
					{row.def.unit
						? entered(row, symbol)
						: money(converted ? row.monthly : row.value, symbol)}
				</span>
			) : (
				<span className="shrink-0 rounded-full bg-primary px-2 text-xs leading-5 font-bold text-white">
					Falta
				</span>
			)}
		</button>
	);
}
