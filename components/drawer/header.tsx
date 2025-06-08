import { Badge } from "@/components/ui/badge";
import { SaveIcon } from "lucide-react";
import { Drawer } from "vaul";
import { Button } from "../ui/button";

type DrawerHeaderProps = {
	onSaveToDatabase: () => void;
};

export function DrawerHeader({ onSaveToDatabase }: DrawerHeaderProps) {
	return (
		<>
			<div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-secondary" />
			<div className="mx-auto max-w-4xl">
				<div className="mb-4 flex items-center justify-between">
					<Drawer.Title className="font-medium text-gray-900">
						<Badge
							variant="secondary"
							className="font-bold text-inherit md:text-lg"
						>
							¡Todo listo!
						</Badge>
					</Drawer.Title>
					{/* featureFlag */}
					{process.env.NODE_ENV === "development" && (
						<Button
							onClick={onSaveToDatabase}
							size="sm"
							className="bg-primary-soft text-xs sm:text-sm"
						>
							<SaveIcon className="size-4" />
							<span>
								Guardar <span className="hidden sm:inline-flex">mooonto</span>
							</span>
						</Button>
					)}
				</div>
				<h2 className="font-bold text-2xl md:text-4xl">
					Tus valores por hora son:
				</h2>
			</div>
		</>
	);
}
