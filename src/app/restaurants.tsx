import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Page, Chip, Empty, T, CartBar } from "../components/ui";
import { RestaurantCard } from "../components/RestaurantCard";
import { categories, restaurants } from "../data/mocks";

export default function Restaurants() {
  const params = useLocalSearchParams<{
    category?: string;
    filter?: string;
    title?: string;
  }>();
  const [filter, setFilter] = useState(params.filter || "");
  const [cuisine, setCuisine] = useState("");
  const list = restaurants
    .filter(
      (r) =>
        (!params.category || r.category === params.category) &&
        (!cuisine || r.cuisine === cuisine) &&
        (filter !== "Entrega grátis" || !r.delivery) &&
        (filter !== "Promoções" || r.promo) &&
        (!["Cafeteria", "Doces", "Pizzas"].includes(filter) ||
          r.cuisine === filter),
    )
    .sort((a, b) =>
      filter === "Melhor avaliação"
        ? b.rating - a.rating
        : filter === "Menor tempo"
          ? a.time - b.time
          : 0,
    );
  const cuisines = [
    ...new Set(
      restaurants
        .filter((r) => !params.category || r.category === params.category)
        .map((r) => r.cuisine),
    ),
  ];
  return (
    <Page
      back
      title={
        params.title ||
        categories.find((c) => c.id === params.category)?.name ||
        "Lojas perto de você"
      }
      subtitle="Bons sabores. Boas descobertas."
      footer={<CartBar />}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {["Entrega grátis", "Melhor avaliação", "Menor tempo", "Promoções"].map(
          (f) => (
            <Chip
              key={f}
              title={f}
              active={filter === f}
              onPress={() => setFilter(filter === f ? "" : f)}
            />
          ),
        )}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        <Chip
          title="Todos os tipos"
          active={!cuisine}
          onPress={() => setCuisine("")}
        />
        {cuisines.map((c) => (
          <Chip
            key={c}
            title={c}
            active={cuisine === c}
            onPress={() => setCuisine(cuisine === c ? "" : c)}
          />
        ))}
      </ScrollView>
      <T style={{ color: "#888", fontSize: 12 }}>
        {list.length} lojas encontradas · abertas agora
      </T>
      <View style={{ gap: 18 }}>
        {list.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} wide />
        ))}
      </View>
      {!list.length && (
        <Empty
          title="Vamos tentar outro filtro?"
          description="Nenhuma loja corresponde a essa combinação."
        />
      )}
    </Page>
  );
}
