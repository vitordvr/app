import { Banner, Category, Coupon, Order, Product, Restaurant } from "../types";

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=85`;
export const images = {
  burger: photo("photo-1568901346375-23c9450c58cd"),
  pizza: photo("photo-1513104890138-7c749659a591"),
  bowl: photo("photo-1546069901-ba9599a7e63c"),
  sushi: photo("photo-1579871494447-9811cf80d66c"),
  pasta: photo("photo-1473093295043-cdd812d0e601"),
  dessert: photo("photo-1578985545062-69928b1d9587"),
  coffee: photo("photo-1509042239860-f550ce710b93"),
  market: photo("photo-1542838132-92c53300491e"),
  drinks: photo("photo-1513558161293-cdaf765edfd7"),
  pharmacy: photo("photo-1584308666744-24d5c474f2ae"),
  shopping: photo("photo-1544816155-12df9643f363"),
  pets: photo("photo-1583337130417-3346a1be7dee"),
};
export const categories: Category[] = [
  {
    id: "restaurants",
    name: "Restaurantes",
    subtitle: "Seu próximo favorito",
    color: "#FFF0E8",
  },
  {
    id: "market",
    name: "Mercados",
    subtitle: "Tudo para o seu dia",
    color: "#EDF4E8",
  },
  {
    id: "pharmacy",
    name: "Farmácias",
    subtitle: "Cuidado por perto",
    color: "#FFF0F0",
  },
  {
    id: "drinks",
    name: "Bebidas",
    subtitle: "Um brinde ao agora",
    color: "#FFF3DB",
  },
  {
    id: "shopping",
    name: "Shopping",
    subtitle: "Encontre o seu mimo",
    color: "#F2ECFF",
  },
  {
    id: "pets",
    name: "Pet Shops",
    subtitle: "Para seu melhor amigo",
    color: "#FFF1DE",
  },
];
const seeds: [
  string,
  Category["id"],
  string,
  keyof typeof images,
  string,
  string,
][] = [
  ["Brasa Burger", "restaurants", "Hambúrgueres", "burger", "#28231F", "bb"],
  ["Nonna Mia", "restaurants", "Italiana", "pizza", "#28664B", "nm"],
  ["Verde & Grão", "restaurants", "Saudável", "bowl", "#80965C", "vg"],
  ["Sakura Sushi", "restaurants", "Japonesa", "sushi", "#C66C72", "桜"],
  ["Casa da Vó", "restaurants", "Brasileira", "pasta", "#C77D48", "vó"],
  ["Forno & Farinha", "restaurants", "Pizzas", "pizza", "#AD4239", "ff"],
  ["Bowl da Terra", "restaurants", "Saudável", "bowl", "#62806B", "bt"],
  ["Doce Capricho", "restaurants", "Doces", "dessert", "#C78C9B", "dc"],
  ["Café da Esquina", "restaurants", "Cafeteria", "coffee", "#725445", "ce"],
  ["Pasta & Basta", "restaurants", "Italiana", "pasta", "#BE543A", "pb"],
  ["Quintal Brasileiro", "restaurants", "Brasileira", "bowl", "#D3A442", "qb"],
  ["Smash Club", "restaurants", "Hambúrgueres", "burger", "#292929", "sc"],
  ["Nori House", "restaurants", "Japonesa", "sushi", "#395665", "nh"],
  ["Padoca do Bairro", "restaurants", "Padaria", "coffee", "#B88D61", "pd"],
  [
    "Açaí Tropical",
    "restaurants",
    "Açaí e sorvetes",
    "dessert",
    "#745185",
    "at",
  ],
  ["Mercado Fresquinho", "market", "Mercearia", "market", "#56905F", "mf"],
  ["Horta em Casa", "market", "Hortifruti", "market", "#7B994C", "hc"],
  [
    "Farmácia Bem Viver",
    "pharmacy",
    "Cuidados pessoais",
    "pharmacy",
    "#4A9C9D",
    "bv",
  ],
  ["Adega do Sol", "drinks", "Bebidas", "drinks", "#D59131", "as"],
  ["Casa & Afeto", "shopping", "Presentes", "shopping", "#9C7EBC", "ca"],
  ["Mundo Pet", "pets", "Pet shop", "pets", "#D89E50", "mp"],
];
export const restaurants: Restaurant[] = seeds.map(
  ([name, category, cuisine, image, color, initials], i) => ({
    id: `r${i + 1}`,
    name,
    category,
    cuisine,
    image: images[image],
    color,
    initials,
    rating: [4.9, 4.8, 4.7, 4.9, 4.6][i % 5],
    time: 20 + (i % 5) * 5,
    delivery: i % 3 === 0 ? 4.99 : 0,
    distance: `${(0.8 + i * 0.2).toFixed(1).replace(".", ",")} km`,
    promo: i % 2 === 0,
  }),
);
const menus: Record<string, [string, string, number][]> = {
  Hambúrgueres: [
    [
      "Brasa clássico",
      "Pão brioche, burger de 160 g, queijo cheddar e maionese da casa.",
      29.9,
    ],
    [
      "Duplo smash",
      "Dois burgers na chapa, queijo derretido, picles e molho especial.",
      35.9,
    ],
    [
      "Bacon crocante",
      "Carne suculenta, bacon artesanal, cheddar e cebola caramelizada.",
      38.9,
    ],
    [
      "Veggie da casa",
      "Burger de grão-de-bico, folhas frescas e maionese de ervas.",
      31.9,
    ],
    [
      "Combo da felicidade",
      "Burger clássico com batata crocante e refrigerante de 350 ml.",
      44.9,
    ],
    [
      "Batata rústica",
      "Batatas douradas com alecrim e molho da casa. Porção de 300 g.",
      19.9,
    ],
  ],
  Italiana: [
    [
      "Penne ao pesto",
      "Massa al dente, pesto de manjericão fresco e parmesão.",
      34.9,
    ],
    [
      "Lasanha da nonna",
      "Camadas de massa fresca, ragu bovino e bechamel.",
      39.9,
    ],
    [
      "Fettuccine cremoso",
      "Massa artesanal, creme de queijo e cogumelos salteados.",
      42.9,
    ],
    [
      "Nhoque de batata",
      "Nhoque leve ao sugo com tomates italianos e manjericão.",
      36.9,
    ],
    [
      "Risoto de cogumelos",
      "Arroz arbóreo, mix de cogumelos e parmesão curado.",
      45.9,
    ],
    [
      "Tiramisù artesanal",
      "Creme de mascarpone, café e cacau. Porção individual.",
      21.9,
    ],
  ],
  Saudável: [
    [
      "Bowl mediterrâneo",
      "Quinoa, grão-de-bico, tomate, pepino e molho de limão.",
      32.9,
    ],
    [
      "Salada da estação",
      "Folhas selecionadas, frutas da estação e castanhas.",
      27.9,
    ],
    [
      "Bowl de frango",
      "Frango grelhado, arroz integral, abacate e legumes.",
      36.9,
    ],
    [
      "Wrap de vegetais",
      "Tortilha integral recheada com legumes e homus.",
      25.9,
    ],
    ["Suco verde", "Couve, maçã, abacaxi e gengibre. Garrafa de 400 ml.", 12.9],
    [
      "Salada de frutas",
      "Frutas frescas cortadas no dia, sem adição de açúcar.",
      14.9,
    ],
  ],
  Japonesa: [
    [
      "Combinado Sakura",
      "20 peças: sashimis, niguiris e uramakis feitos na hora.",
      64.9,
    ],
    [
      "Poke de salmão",
      "Salmão fresco, arroz japonês, manga, pepino e gergelim.",
      39.9,
    ],
    [
      "Hot roll",
      "10 unidades crocantes com salmão, cream cheese e tarê.",
      29.9,
    ],
    [
      "Temaki especial",
      "Cone de alga com salmão, cebolinha e cream cheese.",
      26.9,
    ],
    [
      "Yakisoba de legumes",
      "Macarrão oriental com legumes salteados no wok.",
      32.9,
    ],
    [
      "Guioza grelhado",
      "Seis pasteizinhos japoneses recheados com legumes.",
      22.9,
    ],
  ],
  Brasileira: [
    [
      "Prato do dia",
      "Arroz, feijão, frango grelhado, salada e farofa da casa.",
      26.9,
    ],
    [
      "Feijoada do quintal",
      "Feijoada completa com arroz, couve, farofa e laranja.",
      39.9,
    ],
    [
      "Bife acebolado",
      "Bife na chapa com cebola, arroz, feijão e fritas.",
      34.9,
    ],
    ["Frango da vó", "Frango assado com batatas e arroz soltinho.", 32.9],
    [
      "Escondidinho",
      "Purê de mandioca, carne desfiada e queijo gratinado.",
      35.9,
    ],
    [
      "Pudim de leite",
      "Pudim artesanal com calda de caramelo. Fatia generosa.",
      13.9,
    ],
  ],
  Pizzas: [
    [
      "Margherita",
      "Molho de tomate, mozzarella, manjericão e azeite. 8 fatias.",
      49.9,
    ],
    [
      "Calabresa artesanal",
      "Calabresa defumada, cebola roxa e azeitonas. 8 fatias.",
      54.9,
    ],
    [
      "Quatro queijos",
      "Mozzarella, gorgonzola, parmesão e requeijão. 8 fatias.",
      59.9,
    ],
    [
      "Pepperoni",
      "Mozzarella e generosas fatias de pepperoni. 8 fatias.",
      57.9,
    ],
    [
      "Pizza de cogumelos",
      "Mix de cogumelos e queijo sobre massa de longa fermentação.",
      62.9,
    ],
    [
      "Brotinho de chocolate",
      "Chocolate cremoso e morangos frescos. 4 fatias.",
      29.9,
    ],
  ],
  Doces: [
    [
      "Bolo de chocolate",
      "Fatia de bolo úmido com ganache de chocolate belga.",
      18.9,
    ],
    [
      "Brownie da casa",
      "Brownie de chocolate com casquinha crocante e nozes.",
      14.9,
    ],
    [
      "Cookie recheado",
      "Cookie amanteigado com gotas e recheio de chocolate.",
      12.9,
    ],
    [
      "Cheesecake de frutas",
      "Creme de queijo com calda artesanal de frutas vermelhas.",
      22.9,
    ],
    [
      "Brigadeiros especiais",
      "Caixa com seis brigadeiros de chocolate e pistache.",
      24.9,
    ],
    ["Torta de limão", "Base crocante, creme de limão e merengue.", 16.9],
  ],
  Cafeteria: [
    ["Cappuccino", "Espresso, leite vaporizado e cacau. Copo de 250 ml.", 12.9],
    [
      "Café coado especial",
      "Grãos selecionados, torra média, preparado na hora.",
      8.9,
    ],
    [
      "Croissant de queijo",
      "Massa folhada amanteigada recheada com queijo.",
      15.9,
    ],
    [
      "Pão de queijo",
      "Porção com seis pães de queijo mineiros quentinhos.",
      12.9,
    ],
    ["Sanduíche da manhã", "Pão artesanal, ovo mexido, queijo e tomate.", 21.9],
    ["Chocolate quente", "Chocolate cremoso com leite. Copo de 250 ml.", 14.9],
  ],
  Mercearia: [
    [
      "Cesta da semana",
      "Bananas, maçãs, laranjas e vegetais frescos selecionados.",
      39.9,
    ],
    [
      "Arroz branco 1 kg",
      "Arroz tipo 1, grãos selecionados para o dia a dia.",
      7.9,
    ],
    [
      "Feijão carioca 1 kg",
      "Feijão carioca selecionado, embalagem de 1 kg.",
      9.9,
    ],
    [
      "Leite integral 1 L",
      "Leite integral longa vida, embalagem de 1 litro.",
      5.9,
    ],
    ["Ovos caipiras", "Bandeja com dez ovos caipiras frescos.", 14.9],
    [
      "Banana prata 1 kg",
      "Bananas frescas selecionadas, aproximadamente 1 kg.",
      8.9,
    ],
  ],
  "Cuidados pessoais": [
    [
      "Protetor solar FPS 50",
      "Proteção UVA e UVB, textura leve, frasco de 120 ml.",
      49.9,
    ],
    ["Sabonete suave", "Sabonete de limpeza suave para uso diário, 90 g.", 5.9],
    [
      "Shampoo hidratante",
      "Limpeza e hidratação para todos os cabelos, 300 ml.",
      22.9,
    ],
    [
      "Kit primeiros cuidados",
      "Curativos adesivos e gaze para sua casa.",
      19.9,
    ],
    ["Creme para as mãos", "Hidratante com manteiga de karité, 60 g.", 18.9],
    ["Álcool em gel", "Gel antisséptico para as mãos, frasco de 500 ml.", 12.9],
  ],
  Bebidas: [
    [
      "Suco de laranja 1 L",
      "Suco de laranja integral, sem açúcar adicionado.",
      16.9,
    ],
    ["Água mineral 1,5 L", "Água mineral natural sem gás.", 4.9],
    ["Água com gás", "Pack com seis garrafas de 500 ml.", 18.9],
    [
      "Refrigerante cola 2 L",
      "Refrigerante sabor cola, garrafa de 2 litros.",
      11.9,
    ],
    [
      "Chá gelado de pêssego",
      "Chá preto com pêssego, garrafa de 1 litro.",
      9.9,
    ],
    ["Limonada artesanal", "Limão fresco e hortelã, garrafa de 500 ml.", 12.9],
  ],
  Presentes: [
    [
      "Ecobag natural",
      "Sacola reutilizável de algodão cru com estampa exclusiva.",
      29.9,
    ],
    [
      "Caneca de cerâmica",
      "Caneca artesanal esmaltada, capacidade de 300 ml.",
      39.9,
    ],
    ["Vela perfumada", "Vela vegetal com aroma de baunilha, 150 g.", 34.9],
    [
      "Caderno criativo",
      "Caderno pontilhado A5 com capa dura, 80 folhas.",
      24.9,
    ],
    ["Vaso de cerâmica", "Pequeno vaso decorativo artesanal, 12 cm.", 32.9],
    [
      "Kit presente afeto",
      "Caneca, vela e cartão em embalagem para presente.",
      79.9,
    ],
  ],
  "Pet shop": [
    [
      "Ração para cães 1 kg",
      "Alimento completo para cães adultos, sabor frango.",
      29.9,
    ],
    ["Petisco natural", "Biscoitos assados para cães, pacote de 200 g.", 15.9],
    ["Bolinha divertida", "Brinquedo de borracha resistente para cães.", 12.9],
    [
      "Ração para gatos 1 kg",
      "Alimento completo para gatos adultos, sabor salmão.",
      34.9,
    ],
    ["Areia sanitária 4 kg", "Granulado higiênico com controle de odor.", 24.9],
    [
      "Comedouro colorido",
      "Comedouro fácil de limpar, capacidade de 500 ml.",
      19.9,
    ],
  ],
};
export const products: Product[] = restaurants.flatMap((r) =>
  (
    menus[r.cuisine] ||
    menus[
      r.cuisine === "Hortifruti"
        ? "Mercearia"
        : r.cuisine === "Padaria"
          ? "Cafeteria"
          : "Doces"
    ]
  ).map(([name, description, price], j) => ({
    id: `${r.id}-p${j + 1}`,
    restaurantId: r.id,
    name,
    description,
    price,
    originalPrice:
      j === 0 && r.promo ? Math.round(price * 1.35 * 100) / 100 : undefined,
    image: r.image,
    section: j < 4 ? "Favoritos da casa" : "Para completar",
  })),
);
export const banners: Banner[] = [
  {
    id: "b1",
    eyebrow: "A FOME CHEGOU? A GENTE TAMBÉM.",
    title: "Seu almoço\ncom mais sabor.",
    highlight: "Até 35% OFF",
    subtitle: "Bom de verdade. Melhor ainda no preço.",
    color: "#EA1D2C",
    image: images.pasta,
    filter: "Promoções",
  },
  {
    id: "b2",
    eyebrow: "PEQUENOS PREÇOS, GRANDES SABORES",
    title: "100 dias\nde ofertas.",
    highlight: "A partir de R$ 0,90",
    subtitle: "Um motivo novo para pedir todo dia.",
    color: "#EF8B33",
    image: images.burger,
    filter: "Promoções",
  },
  {
    id: "b3",
    eyebrow: "SEU FAVORITO, MAIS PERTO",
    title: "Sabor que chega\nsem taxa.",
    highlight: "Entrega grátis",
    subtitle: "Nas melhores lojas do seu bairro.",
    color: "#27775B",
    image: images.bowl,
    filter: "Entrega grátis",
  },
  {
    id: "b4",
    eyebrow: "TEM PRESENTE NA SUA SACOLA",
    title: "Hoje é dia\nde economizar.",
    highlight: "Cupons de até R$ 20",
    subtitle: "Escolha o seu e aproveite.",
    color: "#7757A6",
    image: images.pizza,
    filter: "cupons",
  },
  {
    id: "b5",
    eyebrow: "UMA PAUSA BEM MERECIDA",
    title: "Café quentinho.\nDia mais leve.",
    highlight: "Seu momento favorito",
    subtitle: "Peça um carinho em forma de café.",
    color: "#986A45",
    image: images.coffee,
    filter: "Cafeteria",
  },
  {
    id: "b6",
    eyebrow: "FRESQUINHO NA SUA PORTA",
    title: "Sua feira,\nsem sair de casa.",
    highlight: "A partir de R$ 8,90",
    subtitle: "Frutas e verduras escolhidas com carinho.",
    color: "#62864B",
    image: images.market,
    filter: "market",
  },
  {
    id: "b7",
    eyebrow: "O FINAL FELIZ DO SEU DIA",
    title: "Sempre cabe\num docinho.",
    highlight: "Doces a partir de R$ 12,90",
    subtitle: "Feitos para deixar seu dia melhor.",
    color: "#BC6682",
    image: images.dessert,
    filter: "Doces",
  },
  {
    id: "b8",
    eyebrow: "COMPARTILHE BONS MOMENTOS",
    title: "A noite pede\numa boa pizza.",
    highlight: "Sabor em cada fatia",
    subtitle: "Massa artesanal, felicidade de verdade.",
    color: "#CC5837",
    image: images.pizza,
    filter: "Pizzas",
  },
];
export const coupons: Coupon[] = Array.from({ length: 10 }, (_, i) => ({
  code: [
    "BEMVINDO20",
    "FOODGO10",
    "ALMOCO15",
    "GO5",
    "SABOR12",
    "NOITE10",
    "MIMO8",
    "VOLTE15",
    "FOME7",
    "DELIVERY20",
  ][i],
  discount: [20, 10, 15, 5, 12, 10, 8, 15, 7, 20][i],
  minimum: [50, 30, 45, 20, 40, 35, 25, 50, 25, 65][i],
  title:
    i === 0
      ? "Seu primeiro pedido merece um presente"
      : "Mais sabor, menos no total",
}));
export const user = {
  name: "Marina Costa",
  email: "marina.costa@email.com",
  initials: "MC",
  address: "Rua das Flores, 120",
  complement: "Apto 42 · Jardins, São Paulo",
};
export const orderStatuses = [
  "Pedido confirmado",
  "Restaurante preparando",
  "Pedido saiu para entrega",
  "Pedido entregue",
];
export const exampleOrders: Order[] = restaurants.slice(0, 5).map((r, i) => {
  const p = products.find((product) => product.restaurantId === r.id)!;
  return {
    id: `FG${1040 + i}`,
    restaurantId: r.id,
    items: [{ name: p.name, price: p.price, quantity: 1, note: "" }],
    subtotal: p.price,
    delivery: r.delivery,
    discount: 0,
    total: Math.round((p.price + r.delivery) * 100) / 100,
    status: 3,
    createdAt: new Date(2026, 9, 10 - i).toISOString(),
    address: user.address,
    payment: "Cartão de demonstração •••• 4242",
  };
});
