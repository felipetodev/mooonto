"use client";

import { ReportDocument, type ReportTranslations } from "@/components/pdf";
import type { FormCompletionProgressResult } from "@/hooks/use-form-completions";
import { generatePdfFilename } from "@/lib/pdf-utils";
import type { IntlConfig } from "@/lib/types";
import type { FormValues } from "@/schemas/form";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

type ReportDownloadButtonProps = {
  formValues: FormValues;
  formResults: FormCompletionProgressResult;
  intlConfig: IntlConfig;
  anchorRef: React.Ref<HTMLAnchorElement>;
};

function ReportDownloadButtonInner({
  formValues,
  formResults,
  intlConfig,
  anchorRef,
}: ReportDownloadButtonProps) {
  const t = useTranslations("report");
  const tWork = useTranslations("workExpenses");
  const tLiving = useTranslations("livingExpenses");
  const tAdditional = useTranslations("aditionalCosts");

  const translations: ReportTranslations = {
    title: t("title"),
    subtitle: t("subtitle"),
    currency: t("currency"),
    generatedAt: t("generatedAt"),
    workExpensesTitle: t("workExpensesTitle"),
    livingExpensesTitle: t("livingExpensesTitle"),
    additionalCostsTitle: t("additionalCostsTitle"),
    totalTitle: t("totalTitle"),
    category: t("category"),
    amount: t("amount"),
    distributionTitle: t("distributionTitle"),
    ratesTitle: t("ratesTitle"),
    ratesTitleWithValue: t("ratesTitleWithValue"),
    contractedRate: t("contractedRate"),
    freelanceRate: t("freelanceRate"),
    perHour: t("perHour"),
    disclaimer: t("disclaimer"),
    poweredBy: t("poweredBy"),
    fields: {
      // Work expenses
      selfEmployed: tWork("selfEmployed.label"),
      consultancy: tWork("consultancy.label"),
      lifecycleEquipment: tWork("lifecycleEquipment.label"),
      subscriptions: tWork("subscriptions.label"),
      officeRent: tWork("officeRent.label"),
      officeInsurance: tWork("officeInsurance.label"),
      officeBills: tWork("officeBills.label"),
      officeInternet: tWork("officeInternet.label"),
      gasoline: tWork("gasoline.label"),
      coffee: tWork("coffee.label"),
      water: tWork("water.label"),
      // Living expenses
      livingExpenses: tLiving("livingExpenses.label"),
      commonExpenses: tLiving("commonExpenses.label"),
      food: tLiving("food.label"),
      gym: tLiving("gym.label"),
      entertainment: tLiving("entertainment.label"),
      clothes: tLiving("clothes.label"),
      carFee: tLiving("carFee.label"),
      livingExpensesTwo: tLiving("livingExpensesTwo.label"),
      internet: tLiving("internet.label"),
      personalPhone: tLiving("personalPhone.label"),
      healthPlan: tLiving("healthPlan.label"),
      retirementFund: tLiving("retirementFund.label"),
      otherExpenses: tLiving("otherExpenses.label"),
      childrensExpenses: tLiving("childrensExpenses.label"),
      livingExpensesTwoTwo: tLiving("livingExpensesTwoTwo.label"),
      carInsurance: tLiving("carInsurance.label"),
      taxes: tLiving("taxes.label"),
      // Additional costs
      unExpectedExpenses: tAdditional("unExpectedExpenses.label"),
      valueContribution: tAdditional("valueContribution.label"),
      incomeTaxRetention: tAdditional("incomeTaxRetention.label"),
    },
  };

  const filename = generatePdfFilename(intlConfig.locale);

  return (
    <PDFDownloadLink
      // @ts-expect-error - PDFDownloadLink types are incorrect, ref actually accepts HTMLAnchorElement
      ref={anchorRef}
      hidden
      aria-hidden
      document={
        <ReportDocument
          formValues={formValues}
          formResults={formResults}
          intlConfig={intlConfig}
          translations={translations}
        />
      }
      fileName={filename}
    />
  );
}

// Dynamic import to avoid SSR issues with @react-pdf/renderer
export const ReportDownloadButton = dynamic(
  () => Promise.resolve(ReportDownloadButtonInner),
  {
    ssr: false,
    loading: () => <></>,
  },
);
