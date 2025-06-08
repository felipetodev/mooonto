"use client";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

export function NavUser() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					asChild
				>
					<SignedIn>
						<UserButton showName />
					</SignedIn>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
