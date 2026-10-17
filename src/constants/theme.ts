import { StyleSheet } from "react-native";

export const colors = {
  red: "#EA1D2C",
  darkRed: "#C8102E",
  text: "#1A1A1A",
  muted: "#777777",
  background: "#F7F7F7",
  card: "#F4F4F4",
  line: "#EEEEEE",
  green: "#22A06B",
  white: "#FFFFFF",
};
export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  black: "Inter_800ExtraBold",
};
export const ui = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 18,
    gap: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
    minHeight: 52,
  },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 16 },
});
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
