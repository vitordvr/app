import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Clock3, Heart, Info, MapPin, Star, Bike } from "lucide-react-native";
import { catalog } from "../../data/repository";
import {
  Page,
  Photo,
  T,
  Chip,
  Empty,
  CartBar,
  IconButton,
} from "../../components/ui";
import { Logo } from "../../components/RestaurantCard";
import { ProductRow } from "../../components/ProductRow";
import { colors, money, ui } from "../../constants/theme";
import { useStore } from "../../store/useStore";

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const r = catalog.restaurant(id);
  const [section, setSection] = useState("Todos");
  const [info, setInfo] = useState(false);
  const favorites = useStore((s) => s.favorites);
  const toggle = useStore((s) => s.toggleFavorite);
  if (!r)
    return (
      <Page back title="Loja não encontrada">
        <Empty
          title="Essa loja não está disponível"
          description="Volte para explorar outras opções."
        />
      </Page>
    );
  const menu = catalog.menu(id);
  return (
    <Page back title={r.name} footer={<CartBar />}>
      <View>
        <Photo
          uri={r.image}
          style={{ height: 220, width: "100%", borderRadius: 20 }}
        />
        <View style={{ position: "absolute", bottom: -22, left: 18 }}>
          <Logo restaurant={r} size={75} />
        </View>
      </View>
      <View style={[ui.between, { paddingTop: 16 }]}>
        <View style={{ flex: 1 }}>
          <T weight="bold" style={{ fontSize: 27, lineHeight: 35 }}>
            {r.name}
          </T>
          <T style={{ color: colors.muted }}>
            {r.cuisine} · {r.distance}
          </T>
        </View>
        <IconButton label="Favoritar loja" onPress={() => toggle(id)}>
          <Heart
            size={22}
            color={colors.red}
            fill={favorites.includes(id) ? colors.red : "transparent"}
          />
        </IconButton>
      </View>
      <View style={[ui.row, { flexWrap: "wrap", gap: 17 }]}>
        <View style={ui.row}>
          <Star size={16} color="#D8A037" fill="#D8A037" />
          <T weight="semibold">
            {r.rating.toFixed(1)}{" "}
            <T style={{ color: colors.muted, fontSize: 11 }}>
              (120+ avaliações)
            </T>
          </T>
        </View>
        <View style={ui.row}>
          <Clock3 size={16} color={colors.muted} />
          <T style={{ fontSize: 12 }}>
            {r.time}–{r.time + 10} min
          </T>
        </View>
        <View style={ui.row}>
          <Bike size={18} color={colors.green} />
          <T style={{ fontSize: 12, color: colors.green }}>
            {r.delivery ? money(r.delivery) : "Entrega grátis"}
          </T>
        </View>
      </View>
      <Pressable
        onPress={() => setInfo(!info)}
        style={[ui.row, { paddingVertical: 6 }]}
      >
        <Info size={17} color={colors.red} />
        <T style={{ color: colors.red, fontSize: 12 }}>
          {info ? "Ocultar informações" : "Informações do estabelecimento"}
        </T>
      </Pressable>
      {info && (
        <View style={ui.card}>
          <T weight="semibold">Feito com carinho, aqui no bairro</T>
          <T style={{ color: colors.muted }}>
            Funcionamento: todos os dias, das 10h às 23h. Loja fictícia para
            demonstração.
          </T>
          <View style={ui.row}>
            <MapPin size={17} color={colors.red} />
            <T>Alameda dos Sabores, 250 · São Paulo</T>
          </View>
          <T>Em caso de alergias, consulte os ingredientes antes de pedir.</T>
        </View>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {["Todos", "Favoritos da casa", "Para completar"].map((s) => (
          <Chip
            key={s}
            title={s}
            active={section === s}
            onPress={() => setSection(s)}
          />
        ))}
      </ScrollView>
      <View>
        <T weight="bold" style={{ fontSize: 22 }}>
          {section === "Todos" ? "Nosso cardápio" : section}
        </T>
        {menu
          .filter((p) => section === "Todos" || p.section === section)
          .map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
      </View>
    </Page>
  );
}
