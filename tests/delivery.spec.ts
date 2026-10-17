import { test, expect } from "@playwright/test";

test("home, purchase, coupon, persistence and tracking", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByText("O que vai ser hoje?")).toBeVisible();
  await expect(page.getByRole("tab")).toHaveCount(5);
  await page.screenshot({ path: "assets/home-review.png" });
  await page.getByRole("button", { name: "Explorar Restaurantes" }).click();
  await page.getByRole("button", { name: "Abrir Brasa Burger" }).click();
  await page.getByRole("button", { name: "Ver Brasa clássico" }).click();
  await page.getByLabel("Aumentar quantidade").click();
  await page.getByLabel("Observações do produto").fill("Sem cebola, por favor");
  await page.getByRole("button", { name: /Adicionar ·/ }).click();
  await page.getByRole("button", { name: "Ver sacola", exact: true }).click();
  await expect(
    page.getByText("R$ 59,80", { exact: true }).first(),
  ).toBeVisible();
  await page.getByLabel("Código do cupom").fill("INVALIDO");
  await page.getByRole("button", { name: "Aplicar", exact: true }).click();
  await expect(page.getByText("Esse cupom não foi encontrado.")).toBeVisible();
  await page.getByLabel("Código do cupom").fill("BEMVINDO20");
  await page.getByRole("button", { name: "Aplicar", exact: true }).click();
  await expect(page.getByText("− R$ 20,00", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText("Obs.: Sem cebola, por favor")).toBeVisible();
  await expect(page.getByText("R$ 44,79", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Continuar ·/ }).click();
  await page.getByRole("button", { name: "Fazer pedido fictício" }).click();
  await expect(page.getByText("Deu certo. Agora é só esperar.")).toBeVisible();
  await expect(page.getByText("R$ 44,79", { exact: true })).toBeVisible();
  for (let i = 0; i < 3; i++)
    await page
      .getByRole("button", { name: "Avançar status da entrega" })
      .click();
  await expect(page.getByText("Bom apetite!")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Bom apetite!")).toBeVisible();
  await page.getByRole("button", { name: "Ver histórico de pedidos" }).click();
  await expect(page.getByText("Seus pedidos", { exact: true })).toBeVisible();
  await expect(page.getByText("2 itens · R$ 44,79")).toBeVisible();
  expect(errors).toEqual([]);
});

test("search, empty state, favorites and categories", async ({ page }) => {
  await page.goto("/search");
  const search = page.getByLabel("Buscar lojas ou itens");
  await search.fill("zzzzsemresultado");
  await expect(page.getByText("Ainda não encontramos")).toBeVisible();
  await search.fill("Brasa");
  await expect(
    page.getByRole("button", { name: "Abrir Brasa Burger" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ver Brasa clássico" }).first(),
  ).toBeVisible();
  await page.getByLabel("Adicionar aos favoritos").click();
  await page.goto("/favorites");
  await expect(
    page.getByRole("button", { name: "Abrir Brasa Burger" }),
  ).toBeVisible();
  await page.goto("/categories");
  await page.getByText("Farmácias", { exact: true }).first().click();
  await expect(
    page.getByRole("button", { name: "Abrir Farmácia Bem Viver" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Abrir Farmácia Bem Viver" }).click();
  await expect(
    page.getByRole("button", { name: "Ver Protetor solar FPS 50" }),
  ).toBeVisible();
});

test("store replacement, coupon minimum and removal", async ({ page }) => {
  await page.goto('/restaurant/r1');
  await page.getByRole('button', { name: 'Ver Brasa clássico' }).click();
  await page.getByRole('button', { name: /Adicionar ·/ }).click();
  await page.getByRole('button', { name: 'Ver sacola', exact: true }).click();
  await page.getByLabel('Código do cupom').fill('BEMVINDO20');
  await page.getByRole('button', { name: 'Aplicar', exact: true }).click();
  await expect(page.getByText('Pedido mínimo de R$ 50,00 para este cupom.')).toBeVisible();
  await page.goto('/restaurant/r2');
  await page.getByRole('button', { name: 'Ver Penne ao pesto' }).click();
  await page.getByRole('button', { name: /Adicionar ·/ }).click();
  await expect(page.getByText('Começar uma nova sacola?')).toBeVisible();
  await page.getByRole('button', { name: 'Manter sacola atual' }).click();
  await page.getByRole('button', { name: /Adicionar ·/ }).click();
  await page.getByRole('button', { name: 'Substituir sacola e adicionar' }).click();
  await page.getByRole('button', { name: 'Ver sacola', exact: true }).click();
  await expect(page.getByText('Penne ao pesto', { exact: true }).filter({ visible: true })).toBeVisible();
  await page.getByLabel('Remover Penne ao pesto').click();
  await expect(page.getByText('Sua sacola está esperando')).toBeVisible();
});

test('address, payment and settings persist', async ({ page }) => {
  await page.goto('/profile');
  await page.getByRole('button', { name: /Meus endereços/ }).click();
  await page.getByLabel('Rua e número').fill('Rua do Sol, 42');
  await page.getByLabel('Complemento', { exact: true }).fill('Casa · Vila Mariana');
  await page.getByRole('button', { name: 'Salvar endereço' }).click();
  await page.goto('/');
  await expect(page.getByText('Rua do Sol, 42')).toBeVisible();
  await page.goto('/payments');
  await page.getByText('Pix de demonstração', { exact: true }).click();
  await page.reload();
  await expect(page.getByText('Pix de demonstração', { exact: true })).toBeVisible();
  await page.goto('/settings');
  await page.getByRole('switch').uncheck();
  await page.reload();
  await expect(page.getByRole('switch')).not.toBeChecked();
});
