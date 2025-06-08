"use client";

import { FileSpreadsheetIcon, Frame, Heart } from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/app/(dashboard)/components/nav-main";
import { NavProjects } from "@/app/(dashboard)/components/nav-projects";
import { NavUser } from "@/app/(dashboard)/components/nav-user";
import { TeamLogo } from "@/app/(dashboard)/components/team-logo";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{
			title: "Tus montos",
			url: "/dashboard",
			icon: Frame,
			items: [
				{
					title: "📊 Todos",
					url: "/dashboard",
					icon: Frame,
				},
				{
					title: "⭐ Favoritos",
					url: "/dashboard/favorites",
					icon: Heart,
				},
			],
		},
	],
	extensions: [
		{
			name: "Google Sheets",
			url: "#",
			icon: FileSpreadsheetIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamLogo />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects extensions={data.extensions} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
