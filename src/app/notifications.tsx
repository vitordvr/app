import { Pressable, View } from "react-native";
import { Ticket, Sparkles, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import { Page, T } from "../components/ui";
import { colors, ui } from "../constants/theme";
export default function Notifications() {
  return (
    <Page title="Novidades para você" subtitle="Tem coisa boa chegando." back>
      <Pressable
        onPress={() => router.push("/coupons")}
        style={[ui.row, ui.card]}
      >
        <Ticket color={colors.red} />
        <View style={{ flex: 1 }}>
          <T weight="bold">Seu presente de boas-vindas chegou</T>
          <T style={{ color: colors.muted, fontSize: 12 }}>
            R$ 20 OFF com BEMVINDO20 em pedidos de R$ 50.
          </T>
        </View>
        <ChevronRight size={18} />
      </Pressable>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/restaurants",
            params: { filter: "Entrega grátis" },
          })
        }
        style={[ui.row, ui.card]}
      >
        <Sparkles color={colors.red} />
        <View style={{ flex: 1 }}>
          <T weight="bold">Peça sem taxa de entrega</T>
          <T style={{ color: colors.muted, fontSize: 12 }}>
            Descubra as lojas com entrega grátis do seu bairro.
          </T>
        </View>
        <ChevronRight size={18} />
      </Pressable>
      <T style={{ color: "#999", fontSize: 11 }}>
        Notificações locais de demonstração.
      </T>
    </Page>
  );
}
