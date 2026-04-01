import {
  type PieChartData,
  calculatePieChartData,
  formatCurrency,
  generatePieSlicePath,
} from "@/lib/pdf-utils";
import type { IntlConfig } from "@/lib/types";
import { Path, Svg, Text, View } from "@react-pdf/renderer";
import { colors, styles } from "./styles";

type ReportChartProps = {
  workExpenses: number;
  livingExpenses: number;
  additionalCosts: number;
  intlConfig: IntlConfig;
  translations: {
    distributionTitle: string;
    workExpensesTitle: string;
    livingExpensesTitle: string;
    additionalCostsTitle: string;
  };
};

function PieChart({ data }: { data: PieChartData[] }) {
  const centerX = 60;
  const centerY = 60;
  const radius = 55;

  return (
    <Svg width={120} height={120} viewBox="0 0 120 120">
      {data.map((slice) => {
        if (slice.value === 0) return null;

        const hasOnlyOneSlice = data.filter((d) => d.value > 0).length === 1;

        if (hasOnlyOneSlice) {
          return (
            <Path
              key={`slice-${slice.label}`}
              d={`M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 1 1 ${centerX - 0.01} ${centerY - radius} Z`}
              fill={slice.color}
            />
          );
        }

        const path = generatePieSlicePath(
          centerX,
          centerY,
          radius,
          slice.startAngle,
          slice.endAngle,
        );

        return (
          <Path key={`slice-${slice.label}`} d={path} fill={slice.color} />
        );
      })}
    </Svg>
  );
}

function LegendItem({
  color,
  label,
  value,
  percentage,
  intlConfig,
}: {
  color: string;
  label: string;
  value: number;
  percentage: number;
  intlConfig: IntlConfig;
}) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendColor, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
      <Text style={styles.legendValue}>
        {formatCurrency(value, intlConfig)} ({percentage.toFixed(1)}%)
      </Text>
    </View>
  );
}

export function ReportChart({
  workExpenses,
  livingExpenses,
  additionalCosts,
  intlConfig,
  translations,
}: ReportChartProps) {
  const chartData = calculatePieChartData([
    {
      label: translations.workExpensesTitle,
      value: workExpenses,
      color: colors.chart.work,
    },
    {
      label: translations.livingExpensesTitle,
      value: livingExpenses,
      color: colors.chart.living,
    },
    {
      label: translations.additionalCostsTitle,
      value: additionalCosts,
      color: colors.chart.additional,
    },
  ]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{translations.distributionTitle}</Text>
      <View style={styles.chartContainer}>
        <PieChart data={chartData} />
        <View style={styles.chartLegend}>
          {chartData.map((item) => (
            <LegendItem
              key={`legend-${item.label}`}
              color={item.color}
              label={item.label}
              value={item.value}
              percentage={item.percentage}
              intlConfig={intlConfig}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
