import { View } from "react-native";
import { router } from "expo-router";
import {
  Bell,
  CreditCard,
  Heart,
  MapPin,
  Settings,
  Ticket,
} from "lucide-react-native";
import { Page, RowLink, T } from "../../components/ui";
import { colors, ui } from "../../constants/theme";
import { user } from "../../data/mocks";
import { useStore } from "../../store/useStore";

export default function Profile() {
  const count = useStore((s) => s.favorites.length);
  return (
    <Page title="Seu cantinho">
      <View style={[ui.row, { paddingVertical: 20, gap: 18 }]}>
        <View
          style={{
            width: 76,
            height: 76,
            borderRadius: 27,
            backgroundColor: "#FCE7E3",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <T
            weight="bold"
            style={{ fontSize: 26, lineHeight: 34, color: colors.darkRed }}
          >
            {user.initials}
          </T>
        </View>
        <View>
          <T weight="bold" style={{ fontSize: 23 }}>
            {user.name}
          </T>
          <T style={{ color: colors.muted, fontSize: 12 }}>{user.email}</T>
          <T style={{ color: colors.red, fontSize: 11, marginTop: 4 }}>
            Bom ter você por aqui.
          </T>
        </View>
      </View>
      <View>
        <RowLink
          title="Meus endereços"
          subtitle="Onde seus favoritos chegam"
          icon={<MapPin color={colors.red} />}
          onPress={() => router.push("/addresses")}
        />
        <RowLink
          title="Meus cupons"
          subtitle="Economia que dá gosto"
          icon={<Ticket color={colors.red} />}
          onPress={() => router.push("/coupons")}
        />
        <RowLink
          title="Favoritos"
          subtitle={`${count} lojas salvas para depois`}
          icon={<Heart color={colors.red} />}
          onPress={() => router.push("/favorites")}
        />
        <RowLink
          title="Formas de pagamento"
          subtitle="Métodos de demonstração"
          icon={<CreditCard color={colors.red} />}
          onPress={() => router.push("/payments")}
        />
        <RowLink
          title="Notificações"
          subtitle="Novidades e bons momentos"
          icon={<Bell color={colors.red} />}
          onPress={() => router.push("/notifications")}
        />
        <RowLink
          title="Configurações"
          subtitle="Deixe o FoodGo do seu jeito"
          icon={<Settings color={colors.red} />}
          onPress={() => router.push("/settings")}
        />
      </View>
      <View style={[ui.card, { backgroundColor: "#FFF5F0" }]}>
        <T weight="bold" style={{ fontSize: 22 }}>
          Sua fome de coisa boa.
        </T>
        <T style={{ color: colors.muted }}>Nosso motivo para ir mais longe.</T>
        <T
          weight="black"
          style={{ color: colors.red, fontSize: 24, marginTop: 10 }}
        >
          foodgo.
        </T>
      </View>
      <T style={{ textAlign: "center", fontSize: 11, color: "#AAA" }}>
        FoodGo 1.0 · Feito com carinho · Versão demonstrativa
      </T>
    </Page>
  );
}
