import { router } from "expo-router";
import { Empty, Page } from "../components/ui";
export default function NotFound() {
  return (
    <Page title="Ops, caminho não encontrado">
      <Empty
        title="Vamos voltar ao início?"
        description="Essa página não está no nosso cardápio."
        action={() => router.replace("/")}
      />
    </Page>
  );
}
