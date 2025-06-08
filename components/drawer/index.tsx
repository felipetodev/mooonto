"use client";

import { DrawerFooter } from "@/components/drawer/footer";
import { DrawerHeader } from "@/components/drawer/header";
import { PricingCategory } from "@/components/drawer/pricing-category";
import { Drawer } from "vaul";

interface ResultDrawerProps {
	open: boolean;
	onSaveToDatabase: () => void;
	handleOpenDrawer: (open: boolean) => void;
}

export function ResultDrawer({
	open,
	onSaveToDatabase,
	handleOpenDrawer,
}: ResultDrawerProps) {
	return (
		<Drawer.Root open={open} onOpenChange={handleOpenDrawer}>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content className="fixed right-0 bottom-0 left-0 mt-24 flex h-full max-h-[96%] flex-col rounded-t-[10px] bg-gray-100 lg:h-fit">
					<div className="flex-1 rounded-t-[10px] bg-[#f7f4f0] p-4 pb-20">
						<DrawerHeader onSaveToDatabase={onSaveToDatabase} />
						<div className="mx-auto max-w-4xl">
							<div className="mt-8 grid gap-y-20 md:mt-13">
								<PricingCategory
									title="Ingresos mínimos para trabajar y vivir:"
									amount="$156"
									type="contractor"
								/>
								<PricingCategory
									title="Ingresos mínimos para trabajar y vivir + valor que aportas:"
									amount="$156"
									type="contractor"
									isValueContributor
								/>
							</div>
							<DrawerFooter />
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
