import { View } from "react-native";
import { money, ui, colors } from "../constants/theme";
import { T } from "./ui";
export function OrderSummary({
  subtotal,
  delivery,
  discount,
  total,
}: {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
}) {
  return (
    <View style={{ gap: 12 }}>
      {[
        ["Subtotal", money(subtotal)],
        ["Taxa de entrega", delivery ? money(delivery) : "Grátis"],
        ...(discount ? [["Desconto", `− ${money(discount)}`]] : []),
      ].map(([label, value]) => (
        <View key={label} style={ui.between}>
          <T style={{ color: colors.muted }}>{label}</T>
          <T
            style={{
              color:
                label === "Desconto" || value === "Grátis"
                  ? colors.green
                  : colors.text,
            }}
          >
            {value}
          </T>
        </View>
      ))}
      <View
        style={{ height: 1, backgroundColor: colors.line, marginVertical: 4 }}
      />
      <View style={ui.between}>
        <T weight="bold" style={{ fontSize: 18 }}>
          Total
        </T>
        <T weight="bold" style={{ fontSize: 23 }}>
          {money(total)}
        </T>
      </View>
    </View>
  );
}
