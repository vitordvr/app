import { View } from "react-native";
import { Ticket } from "lucide-react-native";
import { router } from "expo-router";
import { coupons } from "../data/mocks";
import { Button, Page, T } from "../components/ui";
import { colors, money, ui } from "../constants/theme";
import { useStore } from "../store/useStore";

export default function Coupons() {
  const apply = useStore((s) => s.applyCoupon);
  const cart = useStore((s) => s.cart);
  const notify = useStore((s) => s.notify);
  return (
    <Page
      title="Descontos que dão gosto"
      subtitle="Escolha um cupom para deixar seu pedido ainda melhor."
      back
    >
      {coupons.map((c) => (
        <View
          key={c.code}
          style={[
            ui.card,
            {
              backgroundColor: "#FFF8F5",
              borderColor: "#F6E1DA",
              borderWidth: 1,
            },
          ]}
        >
          <View style={ui.row}>
            <Ticket size={32} color={colors.red} />
            <View style={{ flex: 1 }}>
              <T weight="bold" style={{ fontSize: 24, lineHeight: 31 }}>
                {money(c.discount)} OFF
              </T>
              <T style={{ color: colors.muted, fontSize: 12 }}>{c.title}</T>
            </View>
          </View>
          <T style={{ fontSize: 12 }}>
            Em pedidos a partir de {money(c.minimum)}. Válido nesta
            demonstração.
          </T>
          <T weight="bold" style={{ color: colors.red, letterSpacing: 2 }}>
            {c.code}
          </T>
          <Button
            secondary
            title="Usar este cupom"
            onPress={() => {
              if (!cart.length) {
                notify("Adicione itens à sacola para aplicar o cupom.");
                router.push("/restaurants");
              } else if (apply(c.code)) router.back();
            }}
          />
        </View>
      ))}
    </Page>
  );
}
