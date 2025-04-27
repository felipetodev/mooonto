import {
	Dela_Gothic_One as DelaGothicOne,
	Inter as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const delaGothicOne = DelaGothicOne({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-dela-gothic",
});
