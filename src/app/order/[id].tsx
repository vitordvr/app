import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Bike,
  Check,
  CheckCircle2,
  ChefHat,
  MapPin,
  PartyPopper,
  ReceiptText,
} from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Button, Empty, Page, T } from "../../components/ui";
import { OrderSummary } from "../../components/OrderSummary";
import { Logo } from "../../components/RestaurantCard";
import { catalog } from "../../data/repository";
import { orderStatuses } from "../../data/mocks";
import { colors, money, ui } from "../../constants/theme";
import { useStore } from "../../store/useStore";

export default function OrderTracking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = useStore((s) => s.orders.find((o) => o.id === id));
  const advance = useStore((s) => s.advance);
  if (!order)
    return (
      <Page title="Pedido não encontrado" back>
        <Empty
          title="Não encontramos esse pedido"
          description="Consulte seu histórico para acompanhar uma compra."
        />
      </Page>
    );
  const r = catalog.restaurant(order.restaurantId)!;
  const icons = [ReceiptText, ChefHat, Bike, CheckCircle2];
  return (
    <Page
      back
      title={
        order.status === 3 ? "Bom apetite!" : "Deu certo. Agora é só esperar."
      }
      subtitle={`Pedido #${order.id.slice(-6)}`}
    >
      <Animated.View
        key={order.status}
        entering={FadeInDown.duration(300)}
        style={[
          ui.card,
          {
            backgroundColor: "#F0F8F2",
            alignItems: "center",
            paddingVertical: 28,
          },
        ]}
      >
        {order.status === 3 ? (
          <PartyPopper size={40} color={colors.green} />
        ) : (
          <Bike size={43} color={colors.green} />
        )}
        <T weight="bold" style={{ fontSize: 22, color: "#225B3B" }}>
          {orderStatuses[order.status]}
        </T>
        <T style={{ color: "#527B60" }}>
          {order.status === 3
            ? "Seu pedido foi entregue. Até a próxima!"
            : `Previsão de entrega: ${new Date(new Date(order.createdAt).getTime() + r.time * 60000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}–${new Date(new Date(order.createdAt).getTime() + (r.time + 10) * 60000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`}
        </T>
      </Animated.View>
      <View style={{ paddingHorizontal: 10 }}>
        {orderStatuses.map((s, i) => {
          const Icon = icons[i];
          return (
            <View key={s} style={{ flexDirection: "row", gap: 17 }}>
              <View style={{ alignItems: "center", width: 38 }}>
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 20,
                    backgroundColor:
                      i <= order.status ? colors.green : "#F1F1F1",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i < order.status ? (
                    <Check color="white" size={19} />
                  ) : (
                    <Icon
                      size={18}
                      color={i === order.status ? "white" : "#AAA"}
                    />
                  )}
                </View>
                {i < 3 && (
                  <View
                    style={{
                      width: 2,
                      height: 32,
                      backgroundColor: i < order.status ? colors.green : "#EEE",
                    }}
                  />
                )}
              </View>
              <View style={{ paddingTop: 7 }}>
                <T
                  weight={i === order.status ? "bold" : "regular"}
                  style={{ color: i <= order.status ? colors.text : "#AAA" }}
                >
                  {s}
                </T>
                {i === order.status && (
                  <T style={{ fontSize: 10, color: colors.green }}>
                    Etapa atual
                  </T>
                )}
              </View>
            </View>
          );
        })}
      </View>
      {order.status < 3 && (
        <View style={ui.card}>
          <T weight="semibold">Modo de demonstração</T>
          <T style={{ color: colors.muted, fontSize: 12 }}>
            Você controla o tempo. Avance para ver a próxima etapa do pedido.
          </T>
          <Button
            title="Avançar status da entrega"
            onPress={() => advance(id)}
          />
        </View>
      )}
      <View style={ui.row}>
        <Logo restaurant={r} />
        <View>
          <T weight="bold">{r.name}</T>
          <T style={{ fontSize: 12, color: colors.muted }}>
            Detalhes do pedido
          </T>
        </View>
      </View>
      {order.items.map((item, i) => (
        <View key={i}>
          <View style={ui.between}>
            <T style={{ flex: 1 }}>
              {item.quantity}× {item.name}
            </T>
            <T>{money(item.price * item.quantity)}</T>
          </View>
          {!!item.note && (
            <T style={{ color: colors.muted, fontSize: 11 }}>
              Obs.: {item.note}
            </T>
          )}
        </View>
      ))}
      <OrderSummary {...order} />
      <View style={ui.card}>
        <View style={ui.row}>
          <MapPin size={19} color={colors.red} />
          <T style={{ flex: 1 }}>{order.address}</T>
        </View>
        <T style={{ color: colors.muted, fontSize: 12 }}>{order.payment}</T>
        <T style={{ color: colors.muted, fontSize: 11 }}>
          Pedido de demonstração · nenhuma cobrança realizada
        </T>
      </View>
      <Button
        title="Ver histórico de pedidos"
        secondary
        onPress={() => router.replace("/orders")}
      />
      <Button
        title="Pedir nessa loja novamente"
        onPress={() => router.push(`/restaurant/${r.id}`)}
      />
    </Page>
  );
}
