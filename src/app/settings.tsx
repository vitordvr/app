import { Switch, View } from "react-native";
import { Page, T, Button } from "../components/ui";
import { colors, ui } from "../constants/theme";
import { useStore } from "../store/useStore";
export default function Settings() {
  const notifications = useStore((s) => s.notifications);
  const notify = useStore((s) => s.notify);
  return (
    <Page title="Do seu jeito" back>
      <View style={[ui.between, ui.card]}>
        <View style={{ flex: 1 }}>
          <T weight="semibold">Novidades e ofertas</T>
          <T style={{ fontSize: 12, color: colors.muted }}>
            Preferência salva neste dispositivo
          </T>
        </View>
        <Switch
          accessibilityLabel="Receber novidades e ofertas"
          value={notifications}
          onValueChange={(value) => {
            useStore.setState({ notifications: value });
            notify(value ? "Preferência ativada." : "Preferência desativada.");
          }}
          trackColor={{ true: colors.red, false: "#DDD" }}
        />
      </View>
      <View style={ui.card}>
        <T weight="bold">Seus dados ficam com você</T>
        <T style={{ color: colors.muted }}>
          Sacola, favoritos, pedidos e buscas são armazenados localmente neste
          dispositivo. Este aplicativo não possui servidor nem realiza
          pagamentos.
        </T>
      </View>
      <Button
        secondary
        title="Limpar histórico de buscas"
        onPress={() => {
          useStore.setState({ history: [] });
          notify("Histórico de buscas limpo.");
        }}
      />
      <View style={ui.card}>
        <T weight="bold">Sobre o FoodGo</T>
        <T>Versão 1.0.0 · Expo + React Native</T>
        <T style={{ color: colors.muted }}>
          Uma experiência de delivery feita para demonstrar bons sabores e boas
          ideias.
        </T>
      </View>
    </Page>
  );
}
