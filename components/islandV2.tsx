"use client";

// Island V2 (Revisión) — explicit sign-off. NOT imported yet: reserved for A/B testing against `Island`.
// Three sections, each one reviewed and confirmed by the user. Editing a
// confirmed section un-confirms it. The report unlocks when all three are in.

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { type RefObject, useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import type { FormCompletionProgressResult } from "@/hooks/use-form-completions";
import {
	type SectionId,
	type SectionSummary,
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
	onSubmit: () => void;
};

type Status = "incomplete" | "pending" | "confirmed";

const signature = (section: SectionSummary) =>
	section.rows.map((r) => `${r.def.name}:${r.value}`).join("|");

const slide = {
	initial: (direction: number) => ({ opacity: 0, x: direction * 24 }),
	animate: { opacity: 1, x: 0 },
	exit: (direction: number) => ({ opacity: 0, x: direction * -24 }),
};

export function IslandV2({
	formRef,
	formResults,
	formValues,
	intlConfig,
	onJump,
	onSubmit,
}: IslandProps) {
	const symbol = intlConfig.symbol;
	const isInView = useInView(formRef, { margin: "500px 0px -250px 0px" });
	const base = useMemo(
		() => buildIslandSummary(formValues, formResults),
		[formValues, formResults],
	);
	const summary = { ...base, ...formResults, total: formResults.totalResult };
	const [openId, setOpenId] = useState<SectionId | null>(null);
	const [direction, setDirection] = useState(1);
	const [confirmed, setConfirmed] = useState<
		Partial<Record<SectionId, string>>
	>({});
	const [ref, { height }] = useMeasure();

	const statusOf = (section: SectionSummary): Status => {
		if (section.missing.length > 0) return "incomplete";
		return confirmed[section.id] === signature(section)
			? "confirmed"
			: "pending";
	};

	const sections = summary.sections;
	const allConfirmed = sections.every((s) => statusOf(s) === "confirmed");
	const open = sections.find((s) => s.id === openId);
	const view = open ? open.id : allConfirmed ? "done" : "none";

	const go = (id: SectionId | null) => {
		const from = sections.findIndex((s) => s.id === openId);
		const to = sections.findIndex((s) => s.id === id);
		setDirection(from === -1 || to === -1 || to > from ? 1 : -1);
		setOpenId(id);
	};

	const confirm = (section: SectionSummary) => {
		setConfirmed((c) => ({ ...c, [section.id]: signature(section) }));
		const next = sections.find(
			(s) => s.id !== section.id && statusOf(s) !== "confirmed",
		);
		go(next ? next.id : null);
	};

	const jump = (name: keyof FormValues) => {
		setOpenId(null);
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
						initial={{ opacity: 0, scale: 0.95, y: 8 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ duration: 0.25, ease: EASE_OUT }}
						className="pointer-events-auto absolute bottom-4 w-[min(100%,420px)] origin-bottom rounded-3xl bg-[#1A1A18] p-2 font-medium text-[#F7F4F0] shadow-lg"
					>
						<motion.div
							initial={false}
							animate={{ height: view === "none" ? 0 : height }}
							transition={SPRING}
							className="overflow-hidden"
						>
							<div ref={ref} className="relative">
								<AnimatePresence
									mode="popLayout"
									initial={false}
									custom={direction}
								>
									{open ? (
										<motion.div
											key={open.id}
											custom={direction}
											variants={slide}
											initial="initial"
											animate="animate"
											exit="exit"
											transition={{ duration: 0.2, ease: EASE_OUT }}
											className="px-2 pt-2 pb-3"
										>
											<SectionCard
												section={open}
												status={statusOf(open)}
												symbol={symbol}
												onJump={jump}
												onConfirm={() => confirm(open)}
											/>
										</motion.div>
									) : allConfirmed ? (
										<motion.div
											key="done"
											custom={direction}
											variants={slide}
											initial="initial"
											animate="animate"
											exit="exit"
											transition={{ duration: 0.2, ease: EASE_OUT }}
											className="flex items-center gap-x-3 px-2 pt-2 pb-3"
										>
											<div className="min-w-0 flex-1 leading-tight">
												<p className="text-xs opacity-60">Todo revisado</p>
												<p className="text-lg font-bold tabular-nums">
													{money(summary.total, symbol)}
													<span className="text-xs font-normal opacity-60">
														{" "}
														/mes ·{" "}
														{money(
															summary.minimumHourlyRateBeingFreelance,
															symbol,
														)}
														/h
													</span>
												</p>
											</div>
											<button
												type="button"
												onClick={onSubmit}
												className="h-9 shrink-0 rounded-full bg-secondary px-4 text-sm font-bold text-[#1A1A18] transition-transform duration-150 ease-out active:scale-[0.97]"
											>
												Obtener reporte
											</button>
										</motion.div>
									) : null}
								</AnimatePresence>
							</div>
						</motion.div>

						<div className="flex gap-x-1">
							{sections.map((section) => {
								const status = statusOf(section);
								const active = section.id === openId;
								return (
									<button
										key={section.id}
										type="button"
										aria-expanded={active}
										onClick={() => go(active ? null : section.id)}
										className={cn(
											"flex h-10 flex-1 items-center justify-center gap-x-2 rounded-full px-2 text-sm transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]",
											active ? "bg-white/15" : "hover:bg-white/10",
										)}
									>
										<StatusDot status={status} count={section.missing.length} />
										<span className="truncate">{section.short}</span>
									</button>
								);
							})}
						</div>
					</motion.div>
				</motion.section>
			) : null}
		</AnimatePresence>
	);
}

function StatusDot({ status, count }: { status: Status; count: number }) {
	if (status === "confirmed")
		return (
			<span className="grid size-5 shrink-0 place-items-center rounded-full bg-secondary text-[#1A1A18]">
				<Check className="size-3" strokeWidth={3.5} />
				<span className="sr-only">Confirmado</span>
			</span>
		);
	if (status === "pending")
		return (
			<span className="grid size-5 shrink-0 place-items-center">
				<span className="size-2 rounded-full bg-primary" />
				<span className="sr-only">Por confirmar</span>
			</span>
		);
	return (
		<span className="grid size-5 shrink-0 place-items-center rounded-full border border-white/30 text-[10px] tabular-nums">
			{count}
			<span className="sr-only"> campos por completar</span>
		</span>
	);
}

function SectionCard({
	section,
	status,
	symbol,
	onJump,
	onConfirm,
}: {
	section: SectionSummary;
	status: Status;
	symbol: string;
	onJump: (name: keyof FormValues) => void;
	onConfirm: () => void;
}) {
	const missing = section.missing.length;

	return (
		<div className="text-sm">
			<header className="flex items-baseline justify-between gap-x-3">
				<h3 className="font-bold">{section.title}</h3>
				<span className="font-bold tabular-nums">
					{money(section.total, symbol)}
				</span>
			</header>

			<ul className="mt-2 max-h-[min(40vh,280px)] overflow-y-auto overscroll-contain">
				{section.rows.map((row) => (
					<li key={row.def.name}>
						<button
							type="button"
							onClick={() => onJump(row.def.name)}
							className="flex w-full items-center justify-between gap-x-3 rounded-lg px-2 py-1.5 text-left transition-colors duration-150 ease-out hover:bg-white/10"
						>
							<span className={cn("truncate", row.filled && "opacity-70")}>
								{row.def.label}
							</span>
							{row.filled ? (
								<span className="shrink-0 tabular-nums">
									{entered(row, symbol)}
									{row.def.yearly ? (
										<span className="text-xs opacity-60"> /año</span>
									) : null}
								</span>
							) : (
								<span className="shrink-0 text-xs font-bold text-primary">
									Completar
								</span>
							)}
						</button>
					</li>
				))}
			</ul>

			<footer className="mt-3 flex items-center gap-x-3 px-2">
				<p className="min-w-0 flex-1 text-xs opacity-60">
					{status === "incomplete"
						? `Completa ${missing === 1 ? "el campo que falta" : `los ${missing} campos que faltan`} para confirmar.`
						: status === "confirmed"
							? "Confirmado. Si cambias un valor, tendrás que revisarlo de nuevo."
							: "¿Son los valores correctos? Toca uno para corregirlo."}
				</p>
				<button
					type="button"
					disabled={status !== "pending"}
					onClick={onConfirm}
					className="h-9 shrink-0 rounded-full bg-secondary px-4 text-sm font-bold text-[#1A1A18] transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100"
				>
					{status === "confirmed" ? "Confirmado" : "Está correcto"}
				</button>
			</footer>
		</div>
	);
}
