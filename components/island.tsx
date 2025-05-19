import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FormCompletionProgressResult } from "@/hooks/use-form-completions";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { IntlConfig } from "@/lib/types";
import { AnimatePresence, motion, useInView } from "motion/react";
import { type RefObject, useMemo, useState } from "react";
import useMeasure from "react-use-measure";

type IslandProps = {
	formResults: FormCompletionProgressResult;
	intlConfig: IntlConfig;
	formRef: RefObject<HTMLFormElement | null>;
};

type IslandStates = "collapsed" | "expanded" | "full";

const MotionButton = motion.create(Button);

export function Island({ formRef, formResults, intlConfig }: IslandProps) {
	const [state, setState] = useState<IslandStates>("collapsed");
	const [ref, { height }] = useMeasure();
	const isInView = useInView(formRef, {
		margin: "0px 0px -250px 0px",
	});

	const { isMobile } = useMediaQuery();

	const width = useMemo(() => {
		if (isMobile) {
			return state === "collapsed" ? 240 : state === "expanded" ? 290 : 340;
		}
		return state === "collapsed" ? 240 : state === "expanded" ? 400 : 440;
	}, [isMobile, state]);

	return (
		<AnimatePresence>
			{isInView ? (
				<motion.section
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
					className="sticky bottom-0 h-40"
				>
					<div className="relative flex size-full justify-center">
						<div className="absolute bottom-0 my-5 flex w-max min-w-68 flex-col rounded-3xl border bg-lime-400 p-4 font-medium shadow-lg">
							<motion.div
								animate={{ width, height }}
								transition={{ type: "spring", duration: 0.35, bounce: 0 }}
								className="grid overflow-hidden"
							>
								<AnimatePresence key={state}>
									{state !== "collapsed" ? (
										<motion.div
											ref={ref}
											className="flex h-fit items-center gap-x-4 pb-4 sm:justify-between"
										>
											<motion.div
												initial={{ opacity: 0, filter: "blur(4px)" }}
												animate={{ opacity: 1, filter: "blur(0px)" }}
												exit={{ opacity: 0 }}
												transition={{
													type: "spring",
													duration: 0.35,
													bounce: 0,
												}}
												className="grid gap-y-2 text-sm"
											>
												<span>
													Total gastos mínimos{" "}
													<span className="font-bold text-neutral underline">
														trabajo
													</span>
													: {intlConfig.symbol}
													{formResults.totalStepOne}
												</span>
												<span>
													Total gastos mínimos{" "}
													<span className="font-bold text-neutral underline">
														vivienda
													</span>
													: {intlConfig.symbol}
													{formResults.totalStepTwo}
												</span>
												<span>
													Ingresos mínimos: {intlConfig.symbol}
													{formResults.totalResult}
												</span>
												{state === "full" ? (
													<>
														<h2 className="font-bold text-md underline underline-offset-6">
															Ingresos mínimos para trabajar y vivir:
														</h2>
														<motion.div
															className="grid gap-y-2"
															initial={{ opacity: 0, filter: "blur(4px)" }}
															animate={{ opacity: 1, filter: "blur(0px)" }}
															exit={{ opacity: 0 }}
														>
															<div className="grid items-center">
																<header className="flex space-x-2">
																	<h2>Precio hora mínimo</h2>{" "}
																	<Badge className="font-bold">
																		Estando contratado
																	</Badge>
																</header>
																<span>
																	{intlConfig.symbol}
																	{formResults.minimumHourlyRateBeingContracted}
																</span>
															</div>
															<div className="grid items-center">
																<header className="flex space-x-2">
																	<h2>Precio hora mínimo</h2>{" "}
																	<Badge className="font-bold">
																		Siendo freelance
																	</Badge>
																</header>
																<span>
																	{intlConfig.symbol}
																	{formResults.minimumHourlyRateBeingFreelance}
																</span>
															</div>
														</motion.div>

														<h2 className="font-bold text-md underline underline-offset-6">
															Ingresos mínimos para trabajar y vivir + valor que
															aportas:
														</h2>
														<motion.div
															className="grid gap-y-2"
															initial={{ opacity: 0, filter: "blur(4px)" }}
															animate={{ opacity: 1, filter: "blur(0px)" }}
															exit={{ opacity: 0 }}
														>
															<div className="grid items-center">
																<header className="flex space-x-2">
																	<h2>Precio hora mínimo</h2>{" "}
																	<Badge className="font-bold">
																		Estando contratado
																	</Badge>
																</header>
																<span>
																	{intlConfig.symbol}
																	{
																		formResults.minimumHourlyRateBeingContractedWithValueContribution
																	}
																</span>
															</div>
															<div className="grid items-center">
																<header className="flex space-x-2">
																	<h2>Precio hora mínimo</h2>{" "}
																	<Badge className="font-bold">
																		Siendo freelance
																	</Badge>
																</header>
																<span>
																	{intlConfig.symbol}
																	{
																		formResults.minimumHourlyRateBeingFreelanceWithValueContribution
																	}
																</span>
															</div>
														</motion.div>
													</>
												) : null}
											</motion.div>

											<div className="hidden sm:block">
												<motion.div
													layoutId="progress"
													transition={{
														ease: "easeOut",
														duration: 0.09,
													}}
													className="grid place-content-center text-center"
												>
													<span className="font-bold text-lg">
														{formResults.completionProgress}%
													</span>
													<span>Completado</span>
												</motion.div>
											</div>
										</motion.div>
									) : null}
								</AnimatePresence>
							</motion.div>

							<footer className="inline-flex w-full items-center justify-between">
								{state === "collapsed" ? (
									<MotionButton
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="h-8"
										layoutId="primary-btn"
										onClick={() => setState("expanded")}
										aria-expanded="false"
										aria-controls="island-content"
									>
										Resumen
									</MotionButton>
								) : (
									<MotionButton
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										layoutId="primary-btn"
										className="h-8 w-[calc(1/2*96%)]"
										onClick={() => {
											setState((prev) =>
												prev === "expanded" ? "full" : "expanded",
											);
										}}
										aria-expanded={state === "full"}
										aria-controls="island-content"
									>
										{state === "expanded" ? "Ver todo" : "Ver menos"}
									</MotionButton>
								)}
								{state !== "collapsed" ? (
									<Button
										className="h-8 w-[calc(1/2*96%)]"
										onClick={() =>
											setState((prev) =>
												prev === "collapsed" ? "expanded" : "collapsed",
											)
										}
										aria-label="Cerrar resumen"
									>
										Cerrar
									</Button>
								) : (
									<motion.div
										layoutId="progress"
										transition={{ type: "spring", duration: 0.5, bounce: 0 }}
										className="flex flex-col items-center text-xs"
									>
										<span className="font-bold">
											{formResults.completionProgress}%
										</span>
										<span>Completado</span>
									</motion.div>
								)}
							</footer>
						</div>
					</div>
				</motion.section>
			) : null}
		</AnimatePresence>
	);
}
