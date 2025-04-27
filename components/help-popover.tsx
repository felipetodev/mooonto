import { buttonVariants } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { DiscordIcon } from "./ui/icons";

function HelpPopover({ children }: { children: React.ReactNode }) {
	return (
		<Popover>
			<PopoverTrigger className="flex h-7 items-center font-semibold text-[#F7F4F0] text-md hover:underline">
				<HelpCircle className="mr-1.5 h-4 w-4" />
				{children}
			</PopoverTrigger>
			<PopoverContent side="bottom" align="end" className="relative p-2">
				<h5 className="font-semibold">¿Necesitas ayuda con el formulario?</h5>
				<p className="my-2 text-xs">
					Únete a nuestro servidor de Discord y te ayudaremos a resolver tus
					dudas.
				</p>
				<div className="relative h-20 overflow-hidden rounded bg-[#404eed]">
					<a
						className={cn(
							buttonVariants({ variant: "outline", size: "sm" }),
							"absolute top-2 left-2 z-10 cursor-pointer text-xs",
						)}
						href="/discord"
						target="_blank"
						rel="noreferrer"
					>
						<DiscordIcon className="mr-1 h-5 w-5" /> Ingresa a nuestro servidor
					</a>
					<img
						className="-right-10 absolute top-0 z-10 block h-full object-contain"
						src="https://www.colab-ai.com/discord-pj.svg"
						alt=""
					/>
					<img
						className="absolute inset-0 block h-full object-cover"
						src="https://www.colab-ai.com/discord-bg.svg"
						alt=""
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default HelpPopover;
