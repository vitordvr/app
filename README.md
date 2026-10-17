# FoodGo

Aplicativo de delivery **React Native + Expo SDK 57 + TypeScript**, com identidade própria, inspirado na organização visual das referências fornecidas. Android, iOS e uma versão web para demonstração.

## Iniciar

Requer Node.js **22.13 ou superior** e npm.

```bash
npm install
npm start
```

Abra o QR code em um cliente Expo compatível com o SDK 57. O terminal permite abrir um emulador Android (`a`) ou simulador iOS (`i`, em macOS). Para uma development build local:

```bash
npx expo run:android
# Em macOS com Xcode:
npx expo run:ios
```

Para visualizar no navegador:

```bash
npm run web
```

## Experimentar o fluxo completo

1. Início → Restaurantes → **Brasa Burger**.
2. Abra **Brasa clássico**, selecione **2 unidades** e escreva uma observação.
3. Adicione à sacola e use **BEMVINDO20** (R$ 20 de desconto a partir de R$ 50).
4. Total esperado: **R$ 44,79**, incluindo R$ 4,99 de entrega.
5. Continue, edite o endereço ou escolha cartão/Pix fictício e faça o pedido.
6. Na confirmação, use **Avançar status da entrega** até a etapa de entrega.
7. Consulte o pedido na aba **Pedidos**. Reabrir o app preserva seus dados.

Nenhum pagamento, cadastro externo ou backend é necessário.

## Funcionalidades

- Home com seis categorias ilustradas em SVG original com gradientes e volume, oito banners paginados, carrosséis de lojas e filtros.
- 15 restaurantes e seis outras lojas; **126 produtos**, dez cupons, cinco pedidos de exemplo e uma usuária fictícia.
- Busca por loja e produto, ignorando acentos, sugestões imediatas, histórico e filtros de categoria.
- Filtros por entrega grátis, nota, tempo, promoções e culinária.
- Cardápio, detalhes de produto em modal, quantidade e observações.
- Sacola de uma loja por vez, com confirmação explícita para substituir itens de outra loja.
- Cupons com validação de valor mínimo, descontos limitados ao subtotal e cálculo monetário arredondado.
- Checkout, confirmação, timeline e avanço manual das quatro etapas.
- Favoritos, endereço editável, pagamentos simulados, cupons e configurações.
- Zustand + AsyncStorage preservam sacola, pedidos, favoritos, buscas, endereço e preferências. No navegador, a persistência usa armazenamento local.
- Inter incluída no bundle, Lucide, safe areas, transições nativas, feedback animado com Reanimated e carregamento simulado no checkout.
- Fotografias remotas do Unsplash com fallback ilustrado em caso de falha. As ilustrações de categorias são locais e funcionam offline.

## Estrutura

```text
src/
  app/                  # Expo Router: abas e rotas de detalhes/checkout
  components/           # UI, Home, cards, ilustrações e resumos
  constants/theme.ts    # Cores, fontes, estilos compartilhados e moeda
  data/mocks.ts         # Catálogo, cupons, banners, usuário e pedidos
  data/repository.ts    # Adaptador de acesso e busca do catálogo
  hooks/                # Debounce de busca
  store/useStore.ts     # Estado persistente e regras de compra
  types/                # Contratos de dados
assets/                 # Identidade e captura da Home
tests/                  # Testes de ponta a ponta web
```

Para integrar uma API, comece pelos contratos em `types/` e pelo adaptador `data/repository.ts`. As operações de compra estão centralizadas no store; numa integração real, migre preços, cupons e criação de pedidos para validação no servidor. Dados pessoais e pagamentos atuais são fictícios.

## Verificação

```bash
npm run typecheck
npm run lint
npx expo-doctor
npx playwright install chromium
npx playwright test
npx expo export --platform all
```

O Playwright inicia o Expo web automaticamente (ou usa a instância na porta 8081). Testa compra, cupom inválido/válido, persistência, timeline, busca, categorias e favoritos. A captura mobile fica em `assets/home-review.png`.

As validações de execução foram feitas no **Chromium com viewport mobile**; os bundles Android, iOS e web foram exportados. A validação em aparelhos físicos ainda deve ser feita antes de uma publicação.

## Recursos visuais

Fotos: Unsplash, utilizadas como imagens demonstrativas de catálogo. Ícones: Lucide (ISC). Fonte: Inter (SIL Open Font License). Ilustrações das categorias e ícone FoodGo criados neste projeto. A identidade não utiliza logotipos do iFood.
