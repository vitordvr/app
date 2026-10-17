import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { Button, Empty, Page, Photo, Stepper, T } from "../components/ui";
import { OrderSummary } from "../components/OrderSummary";
import { CouponInput } from "../components/CouponInput";
import { catalog } from "../data/repository";
import { colors, money, ui } from "../constants/theme";
import { totals, useStore } from "../store/useStore";

export default function Cart() {
  const cart = useStore((s) => s.cart);
  const coupon = useStore((s) => s.coupon);
  const quantity = useStore((s) => s.quantity);
  const shop = catalog.restaurant(
    catalog.product(cart[0]?.productId)?.restaurantId || "",
  );
  return (
    <Page
      title="Sua sacola"
      subtitle={shop?.name}
      back
      footer={
        cart.length ? (
          <Button
            title={`Continuar · ${money(totals(cart, coupon).total)}`}
            onPress={() => router.push("/checkout")}
          />
        ) : undefined
      }
    >
      {!cart.length ? (
        <Empty
          title="Sua sacola está esperando"
          description="Que tal encontrar algo gostoso para começar?"
          action={() => router.replace("/restaurants")}
        />
      ) : (
        <>
          <View>
            {cart.map((item) => {
              const p = catalog.product(item.productId)!;
              return (
                <View
                  key={item.key}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.line,
                    paddingVertical: 17,
                    gap: 12,
                  }}
                >
                  <View style={ui.row}>
                    <Photo
                      uri={p.image}
                      style={{ width: 72, height: 72, borderRadius: 13 }}
                    />
                    <View style={{ flex: 1 }}>
                      <T weight="semibold">{p.name}</T>
                      <T style={{ color: colors.muted, fontSize: 12 }}>
                        {money(p.price)} por unidade
                      </T>
                      {!!item.note && (
                        <T style={{ fontSize: 11, color: "#888" }}>
                          Obs.: {item.note}
                        </T>
                      )}
                    </View>
                    <Pressable
                      accessibilityLabel={`Remover ${p.name}`}
                      onPress={() => quantity(item.key, 0)}
                      style={{ padding: 10 }}
                    >
                      <Trash2 size={18} color={colors.red} />
                    </Pressable>
                  </View>
                  <View style={ui.between}>
                    <Stepper
                      value={item.quantity}
                      onChange={(q) => quantity(item.key, q)}
                    />
                    <T weight="bold">{money(p.price * item.quantity)}</T>
                  </View>
                </View>
              );
            })}
          </View>
          <Button
            title="Adicionar mais itens"
            secondary
            onPress={() => router.push(`/restaurant/${shop!.id}`)}
          />
          <CouponInput />
          <OrderSummary {...totals(cart, coupon)} />
        </>
      )}
    </Page>
  );
}
