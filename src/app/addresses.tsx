import { useState } from "react";
import { TextInput, View } from "react-native";
import { router } from "expo-router";
import { House, MapPin } from "lucide-react-native";
import { Button, Page, T } from "../components/ui";
import { useStore } from "../store/useStore";
import { colors, ui } from "../constants/theme";

export default function Addresses() {
  const state = useStore();
  const [address, setAddress] = useState(state.address);
  const [complement, setComplement] = useState(state.complement);
  const save = () => {
    if (address.trim().length < 5) {
      state.notify("Informe a rua e o número do endereço.", true);
      return;
    }
    state.setAddress(address, complement);
    state.notify("Endereço de entrega atualizado.");
    router.back();
  };
  return (
    <Page
      title="Onde vamos entregar?"
      subtitle="Seu endereço fica salvo para os próximos pedidos."
      back
    >
      <View style={[ui.card, { backgroundColor: "#FFF4F1" }]}>
        <House size={30} color={colors.red} />
        <T weight="bold">Casa</T>
        <T>{state.address}</T>
        <T style={{ color: colors.muted, fontSize: 12 }}>{state.complement}</T>
      </View>
      <T weight="semibold">Rua e número</T>
      <TextInput
        accessibilityLabel="Rua e número"
        value={address}
        onChangeText={setAddress}
        placeholder="Rua das Flores, 120"
        style={ui.input}
      />
      <T weight="semibold">Complemento, bairro e cidade</T>
      <TextInput
        accessibilityLabel="Complemento"
        value={complement}
        onChangeText={setComplement}
        placeholder="Apto, bairro e cidade"
        style={ui.input}
      />
      <View style={ui.row}>
        <MapPin color={colors.muted} size={18} />
        <T style={{ color: colors.muted, fontSize: 12, flex: 1 }}>
          Endereço simulado. Não usamos sua localização real.
        </T>
      </View>
      <Button title="Salvar endereço" onPress={save} />
    </Page>
  );
}
