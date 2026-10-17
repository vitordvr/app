import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { CreditCard, MapPin, ShieldCheck } from "lucide-react-native";
import { Button, Empty, Page, RowLink, T } from "../components/ui";
import { OrderSummary } from "../components/OrderSummary";
import { CouponInput } from "../components/CouponInput";
import { colors, ui } from "../constants/theme";
import { totals, useStore } from "../store/useStore";
import { catalog } from "../data/repository";

export default function Checkout() {
  const state = useStore();
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (busy) return;
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const id = useStore.getState().placeOrder();
    if (id) router.replace(`/order/${id}`);
    else {
      state.notify("Adicione itens antes de finalizar.", true);
      setBusy(false);
    }
  };
  return (
    <Page
      title="Quase na sua porta"
      subtitle="Confira os detalhes do seu pedido"
      back
      footer={
        state.cart.length ? (
          <Button
            title="Fazer pedido fictício"
            onPress={submit}
            loading={busy}
          />
        ) : undefined
      }
    >
      {!state.cart.length ? (
        <Empty
          title="Sua sacola está vazia"
          description="Escolha um sabor antes de finalizar."
          action={() => router.replace("/restaurants")}
        />
      ) : (
        <>
          <View style={ui.card}>
            <T weight="bold">Entrega</T>
            <RowLink
              icon={<MapPin color={colors.red} />}
              title={state.address}
              subtitle={state.complement}
              onPress={() => router.push("/addresses")}
            />
            <T style={{ color: colors.green, fontSize: 12 }}>
              Previsão:{" "}
              {
                catalog.restaurant(
                  catalog.product(state.cart[0].productId)!.restaurantId,
                )!.time
              }
              –
              {catalog.restaurant(
                catalog.product(state.cart[0].productId)!.restaurantId,
              )!.time + 10}{" "}
              minutos
            </T>
          </View>
          <RowLink
            icon={<CreditCard color={colors.red} />}
            title="Forma de pagamento"
            subtitle={state.payment}
            onPress={() => router.push("/payments")}
          />
          <CouponInput />
          <T weight="bold" style={{ fontSize: 20 }}>
            Resumo do pedido
          </T>
          {state.cart.map((item) => (
            <View key={item.key} style={ui.between}>
              <T>
                {item.quantity}× {catalog.product(item.productId)?.name}
              </T>
            </View>
          ))}
          <OrderSummary {...totals(state.cart, state.coupon)} />
          <View
            style={[
              ui.row,
              { backgroundColor: "#F1F8F3", borderRadius: 14, padding: 16 },
            ]}
          >
            <ShieldCheck size={23} color={colors.green} />
            <T style={{ flex: 1, fontSize: 12, color: "#54735F" }}>
              Esta é uma compra simulada. Nenhum valor será cobrado.
            </T>
          </View>
        </>
      )}
    </Page>
  );
}
