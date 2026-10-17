import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { Clock3, Search, X } from "lucide-react-native";
import { Page, T, Chip, Empty, CartBar } from "../../components/ui";
import { RestaurantCard } from "../../components/RestaurantCard";
import { ProductRow } from "../../components/ProductRow";
import { colors, ui } from "../../constants/theme";
import { categories, restaurants } from "../../data/mocks";
import { catalog } from "../../data/repository";
import { useStore } from "../../store/useStore";
import { useDebounced } from "../../hooks/useDebounced";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const debounced = useDebounced(query);
  const history = useStore((s) => s.history);
  const save = useStore((s) => s.search);
  const results = useMemo(
    () => catalog.search(debounced, category),
    [debounced, category],
  );
  const choose = (value: string) => {
    setQuery(value);
    save(value);
  };
  return (
    <Page
      title="Encontre seu próximo favorito"
      subtitle="O que deu vontade de pedir?"
      footer={<CartBar />}
    >
      <View style={[ui.row, ui.input]}>
        <Search size={20} color={colors.red} />
        <TextInput
          accessibilityLabel="Buscar lojas ou itens"
          placeholder="Buscar lojas ou itens"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => save(query)}
          onBlur={() => save(query)}
          returnKeyType="search"
          style={{ flex: 1, fontSize: 14, outlineWidth: 0 }}
        />
        {query ? (
          <Pressable
            accessibilityLabel="Limpar busca"
            onPress={() => setQuery("")}
          >
            <X size={19} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        <Chip title="Tudo" active={!category} onPress={() => setCategory("")} />
        {categories.map((c) => (
          <Chip
            key={c.id}
            title={c.name}
            active={category === c.id}
            onPress={() => setCategory(c.id)}
          />
        ))}
      </ScrollView>
      {!query && (
        <>
          <View style={ui.between}>
            <T weight="bold">Buscas recentes</T>
            <Pressable onPress={() => useStore.setState({ history: [] })}>
              <T style={{ color: colors.red, fontSize: 12 }}>Limpar</T>
            </Pressable>
          </View>
          {history.length ? (
            history.map((h) => (
              <Pressable key={h} onPress={() => choose(h)} style={ui.row}>
                <Clock3 size={17} color="#999" />
                <T>{h}</T>
              </Pressable>
            ))
          ) : (
            <T style={{ color: colors.muted }}>
              Suas próximas buscas vão aparecer aqui.
            </T>
          )}
          <T weight="bold">Tá todo mundo pedindo</T>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {["Hambúrguer", "Pizza", "Sushi", "Bowl", "Café"].map((q) => (
              <Chip key={q} title={q} onPress={() => choose(q)} />
            ))}
          </View>
        </>
      )}
      {query !== debounced ? (
        <ActivityIndicator color={colors.red} />
      ) : (
        <>
          <T weight="bold" style={{ fontSize: 19 }}>
            {query ? `Resultados para “${debounced}”` : "Lojas para descobrir"}
          </T>
          {!results.restaurants.length && !results.products.length && (
            <Empty
              title="Ainda não encontramos"
              description="Tente outro nome ou escolha uma categoria diferente."
            />
          )}
          {results.restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} wide />
          ))}
          {query && results.products.length > 0 && (
            <View>
              <T weight="bold" style={{ fontSize: 20 }}>
                Itens do cardápio
              </T>
              {results.products.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  shop={restaurants.find((r) => r.id === p.restaurantId)?.name}
                />
              ))}
            </View>
          )}
        </>
      )}
    </Page>
  );
}
