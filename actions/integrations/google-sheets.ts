"use server";
import { WORK_EXPENSES_FIELDS } from "@/lib/constants";
import type { FormValues } from "@/schemas/form";
import { OAuth2Client, type TokenInfo } from "google-auth-library";
import { google } from "googleapis";
import { cookies } from "next/headers";

const SCOPES = [
	"https://www.googleapis.com/auth/spreadsheets",
	// "https://www.googleapis.com/auth/drive.file",
];

const auth = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

export const checkGoogleSheetsPermissions = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("g_access_token")?.value;
	const refreshToken = cookieStore.get("g_refresh_token")?.value;

	if (!accessToken || !refreshToken) {
		return { status: 401, success: false };
	}

	auth.setCredentials({
		access_token: accessToken,
		refresh_token: refreshToken,
	});

	const tokenInfo = (await auth.getTokenInfo(accessToken)) as TokenInfo & {
		exp?: string;
	};

	// const REFRESH_BUFFER = 60;
	const exp = Number(tokenInfo.expiry_date);
	const now = Date.now();
	const isExpired = exp < now;

	console.log(`\
This token will expire in ${Math.floor((exp - now) / 1000 / 60)} minutes
${isExpired ? "Token is expired" : "Token is valid"}`);

	return tokenInfo.aud === process.env.GOOGLE_CLIENT_ID && !isExpired
		? { status: 200, success: true }
		: { status: 401, success: false };
};

export const exportToGoogleSheets = async (
	data: FormValues | null,
): Promise<{ status: 401; url: string } | { status: 200; url: null }> => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("g_access_token")?.value;
	const refreshToken = cookieStore.get("g_refresh_token")?.value;

	if (!accessToken || !refreshToken) {
		const authorizeUrl = auth.generateAuthUrl({
			access_type: "offline",
			scope: SCOPES,
			prompt: "consent",
		});

		return { status: 401, url: authorizeUrl };
	}

	auth.setCredentials({
		access_token: accessToken,
		refresh_token: refreshToken,
	});

	const service = google.sheets({ version: "v4", auth });

	try {
		const spreadsheet = await service.spreadsheets.create({
			requestBody: {
				properties: {
					title: "Mooonto - Exported Data",
				},
			},
			fields: "spreadsheetId",
		});

		console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);

		if (!data || Object.keys(data).length === 0) {
			throw new Error("No data provided to export");
		}

		const firstFormValues = Object.entries(data).filter(
			([formKey, value]) =>
				Boolean(value) &&
				WORK_EXPENSES_FIELDS.includes(formKey as keyof FormValues) &&
				typeof value !== "boolean", // exclude conditional fields selectors
		);

		const ROW_START = 3; // start from index 0

		const values = firstFormValues.map(([key, value], index) => {
			if (key === "lifecycleEquipment" || key === "officeInsurance") {
				return [key, value, `=B${index + ROW_START}/12`];
			}
			return [key, value];
		});

		if (!spreadsheet.data.spreadsheetId) {
			throw new Error("Spreadsheet ID is not defined");
		}

		// set header for the first section
		await service.spreadsheets.batchUpdate({
			spreadsheetId: spreadsheet.data.spreadsheetId,
			requestBody: {
				requests: [
					{
						updateCells: {
							start: { sheetId: 0, rowIndex: 0, columnIndex: 0 }, // A1
							rows: [
								{
									values: [
										{
											userEnteredValue: {
												stringValue:
													"GASTOS MÍNIMOS MENSUALES PARA PODER TRABAJAR",
											},
											userEnteredFormat: {
												textFormat: {
													bold: true,
													fontSize: 12,
													foregroundColor: {
														red: 0.2,
														green: 0.2,
														blue: 0.2,
													},
												},
												backgroundColor: {
													red: 255,
													green: 59,
													blue: 21,
												},
												horizontalAlignment: "CENTER",
												verticalAlignment: "MIDDLE",
											},
										},
									],
								},
							],
							fields: "userEnteredValue,userEnteredFormat",
						},
					},
					// Merge cells from A1 to F2
					{
						mergeCells: {
							range: {
								sheetId: 0,
								startRowIndex: 0, // Row 1 (0-indexed)
								endRowIndex: 2, // Row 2 (exclusive, so this means up to row 2)
								startColumnIndex: 0, // Column A
								endColumnIndex: 6, // Column F (exclusive, so this means up to column F)
							},
							mergeType: "MERGE_ALL",
						},
					},
				],
			},
		});

		console.log(`A${ROW_START}:B${ROW_START + values.length}`);

		const result = await service.spreadsheets.values.append({
			spreadsheetId: spreadsheet.data.spreadsheetId,
			range: `A${ROW_START}:B${ROW_START + values.length}`,
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values,
			},
		});

		console.log(`${result.data.updates?.updatedCells} cells appended.`);

		// update currency format for the second column
		await service.spreadsheets.batchUpdate({
			spreadsheetId: spreadsheet.data.spreadsheetId,
			requestBody: {
				requests: [
					{
						repeatCell: {
							range: {
								sheetId: 0,
								startRowIndex: ROW_START - 1,
								endRowIndex: ROW_START + values.length,
								startColumnIndex: 1,
								endColumnIndex: 2,
							},
							cell: {
								userEnteredFormat: {
									numberFormat: {
										type: "CURRENCY",
										pattern: '#,##0.00 "EUR"',
									},
								},
							},
							fields: "userEnteredFormat.numberFormat",
						},
					},
				],
			},
		});

		const url = `https://docs.google.com/spreadsheets/d/${spreadsheet.data.spreadsheetId}/edit`;
		console.log(`Spreadsheet URL: ${url}`);
	} catch (err) {
		console.log(err);
	}

	return { status: 200, url: null };
};
