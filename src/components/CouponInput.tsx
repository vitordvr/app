import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Ticket, X } from "lucide-react-native";
import { router } from "expo-router";
import { colors, ui } from "../constants/theme";
import { useStore } from "../store/useStore";
import { T } from "./ui";
export function CouponInput() {
  const [code, setCode] = useState("");
  const coupon = useStore((s) => s.coupon);
  const apply = useStore((s) => s.applyCoupon);
  return (
    <View style={{ gap: 12 }}>
      <View style={ui.between}>
        <View style={ui.row}>
          <Ticket size={19} color={colors.red} />
          <T weight="semibold">Tem um cupom?</T>
        </View>
        <Pressable onPress={() => router.push("/coupons")}>
          <T style={{ fontSize: 12, color: colors.red }}>Ver cupons</T>
        </Pressable>
      </View>
      {coupon ? (
        <View style={[ui.between, ui.card, { backgroundColor: "#F0F8F2" }]}>
          <T style={{ color: colors.green }}>
            {coupon} · aplicado ao atingir o mínimo
          </T>
          <Pressable
            accessibilityLabel="Remover cupom"
            onPress={() => useStore.setState({ coupon: "" })}
          >
            <X size={17} color={colors.green} />
          </Pressable>
        </View>
      ) : (
        <View style={ui.row}>
          <TextInput
            accessibilityLabel="Código do cupom"
            placeholder="Digite o código"
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            style={[ui.input, { flex: 1 }]}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => apply(code)}
            style={{ padding: 12 }}
          >
            <T weight="semibold" style={{ color: colors.red }}>
              Aplicar
            </T>
          </Pressable>
        </View>
      )}
    </View>
  );
}
