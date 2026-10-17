import { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { ChevronRight, CheckCircle2, Clock3 } from "lucide-react-native";
import { Page, T, Chip, Empty } from "../../components/ui";
import { Logo } from "../../components/RestaurantCard";
import { useStore } from "../../store/useStore";
import { catalog } from "../../data/repository";
import { orderStatuses } from "../../data/mocks";
import { colors, money, ui } from "../../constants/theme";

export default function Orders() {
  const orders = useStore((s) => s.orders);
  const [active, setActive] = useState(false);
  const list = orders.filter((o) => !active || o.status < 3);
  return (
    <Page title="Seus pedidos" subtitle="Cada pedido, um bom momento.">
      <View style={ui.row}>
        <Chip
          title="Todos os pedidos"
          active={!active}
          onPress={() => setActive(false)}
        />
        <Chip
          title="Em andamento"
          active={active}
          onPress={() => setActive(true)}
        />
      </View>
      {!list.length && (
        <Empty
          title="Tudo em dia por aqui"
          description="Seus pedidos em andamento aparecerão aqui."
          action={() => router.push("/restaurants")}
        />
      )}
      {list.map((o) => {
        const r = catalog.restaurant(o.restaurantId)!;
        return (
          <Pressable
            key={o.id}
            onPress={() => router.push(`/order/${o.id}`)}
            style={[
              ui.card,
              {
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: colors.line,
              },
            ]}
          >
            <View style={ui.between}>
              <T style={{ fontSize: 11, color: colors.muted }}>
                {new Date(o.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                })}
              </T>
              <T style={{ fontSize: 10, color: colors.muted }}>
                #{o.id.slice(-6)}
              </T>
            </View>
            <View style={ui.row}>
              <Logo restaurant={r} />
              <View style={{ flex: 1 }}>
                <T weight="bold">{r.name}</T>
                <T style={{ fontSize: 12, color: colors.muted }}>
                  {o.items.reduce((s, i) => s + i.quantity, 0)} itens ·{" "}
                  {money(o.total)}
                </T>
              </View>
              <ChevronRight size={19} color={colors.muted} />
            </View>
            <View style={ui.row}>
              {o.status === 3 ? (
                <CheckCircle2 size={16} color={colors.green} />
              ) : (
                <Clock3 size={16} color={colors.red} />
              )}
              <T
                weight="medium"
                style={{
                  fontSize: 12,
                  color: o.status === 3 ? colors.green : colors.red,
                }}
              >
                {orderStatuses[o.status]}
              </T>
            </View>
          </Pressable>
        );
      })}
    </Page>
  );
}
