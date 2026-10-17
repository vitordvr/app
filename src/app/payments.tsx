import { Pressable, View } from "react-native";
import { CheckCircle2, CreditCard, QrCode } from "lucide-react-native";
import { Page, T } from "../components/ui";
import { colors, ui } from "../constants/theme";
import { useStore } from "../store/useStore";
export default function Payments() {
  const payment = useStore((s) => s.payment);
  const notify = useStore((s) => s.notify);
  return (
    <Page
      title="Formas de pagamento"
      subtitle="Escolha como simular seu pagamento."
      back
    >
      {["Cartão de demonstração •••• 4242", "Pix de demonstração"].map(
        (p, i) => (
          <Pressable
            key={p}
            onPress={() => {
              useStore.setState({ payment: p });
              notify("Forma de pagamento selecionada.");
            }}
            style={[
              ui.row,
              ui.card,
              {
                borderWidth: 1,
                borderColor: p === payment ? colors.red : colors.line,
              },
            ]}
          >
            {i ? (
              <QrCode color={colors.red} />
            ) : (
              <CreditCard color={colors.red} />
            )}
            <View style={{ flex: 1 }}>
              <T weight="semibold">{p}</T>
              <T style={{ color: colors.muted, fontSize: 11 }}>
                Nenhuma cobrança será feita
              </T>
            </View>
            {p === payment && <CheckCircle2 size={20} color={colors.red} />}
          </Pressable>
        ),
      )}
      <View style={[ui.card, { backgroundColor: "#FFF5EF" }]}>
        <T weight="bold">Tudo aqui é uma demonstração</T>
        <T style={{ color: colors.muted }}>
          Não é necessário informar dados bancários. Ambos os métodos apenas
          confirmam um pedido fictício.
        </T>
      </View>
    </Page>
  );
}
