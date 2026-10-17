import { useState } from "react";
import { TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { catalog } from "../../data/repository";
import { Button, Empty, Page, Photo, Stepper, T } from "../../components/ui";
import { colors, money, ui } from "../../constants/theme";
import { useStore } from "../../store/useStore";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = catalog.product(id);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [conflict, setConflict] = useState(false);
  const add = useStore((s) => s.add);
  if (!p)
    return (
      <Page title="Produto não encontrado" back>
        <Empty
          title="Esse item não está disponível"
          description="Explore o cardápio para escolher outro sabor."
        />
      </Page>
    );
  const submit = (replace = false) => {
    if (add(p.id, quantity, note, replace)) {
      router.back();
    } else setConflict(true);
  };
  return (
    <Page
      title="Uma boa escolha"
      back
      footer={
        <View style={ui.between}>
          <Stepper
            value={quantity}
            onChange={(q) => setQuantity(Math.max(1, q))}
          />
          <View style={{ flex: 1 }}>
            <Button
              title={`Adicionar · ${money(p.price * quantity)}`}
              onPress={() => submit()}
            />
          </View>
        </View>
      }
    >
      <Photo
        uri={p.image}
        style={{ height: 280, width: "100%", borderRadius: 20 }}
      />
      <T style={{ color: colors.red, fontSize: 12 }}>
        {catalog.restaurant(p.restaurantId)?.name} · {p.section}
      </T>
      <T weight="bold" style={{ fontSize: 28, lineHeight: 35 }}>
        {p.name}
      </T>
      <T style={{ color: colors.muted, lineHeight: 24 }}>{p.description}</T>
      <View style={ui.row}>
        <T weight="bold" style={{ fontSize: 24, color: colors.green }}>
          {money(p.price)}
        </T>
        {p.originalPrice && (
          <T style={{ textDecorationLine: "line-through", color: "#999" }}>
            {money(p.originalPrice)}
          </T>
        )}
      </View>
      <View style={ui.card}>
        <T weight="semibold">Alguma observação?</T>
        <T style={{ fontSize: 12, color: colors.muted }}>
          Conte como você gosta. A loja fará o possível para atender.
        </T>
        <TextInput
          accessibilityLabel="Observações do produto"
          placeholder="Ex.: sem cebola, por favor"
          multiline
          maxLength={250}
          value={note}
          onChangeText={setNote}
          style={[
            ui.input,
            {
              backgroundColor: "white",
              minHeight: 90,
              textAlignVertical: "top",
            },
          ]}
        />
        <T style={{ fontSize: 10, color: "#999", textAlign: "right" }}>
          {note.length}/250
        </T>
      </View>
      {conflict && (
        <Animated.View
          entering={FadeInDown}
          style={[ui.card, { backgroundColor: "#FFF0F1" }]}
        >
          <T weight="bold">Começar uma nova sacola?</T>
          <T>
            Você tem itens de outra loja. Para pedir aqui, precisamos substituir
            a sacola atual.
          </T>
          <Button
            title="Substituir sacola e adicionar"
            onPress={() => submit(true)}
          />
          <Button
            title="Manter sacola atual"
            secondary
            onPress={() => setConflict(false)}
          />
        </Animated.View>
      )}
    </Page>
  );
}
