import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Heart, Star } from "lucide-react-native";
import { Restaurant } from "../types";
import { Photo, T } from "./ui";
import { colors, money, ui } from "../constants/theme";
import { useStore } from "../store/useStore";

export function Logo({
  restaurant,
  size = 48,
}: {
  restaurant: Restaurant;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: restaurant.color,
        borderRadius: size * 0.33,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "white",
      }}
    >
      <T
        weight="black"
        style={{
          color: "white",
          fontSize: size * 0.34,
          lineHeight: size * 0.65,
          fontStyle: "italic",
          letterSpacing: -2,
        }}
      >
        {restaurant.initials}
      </T>
    </View>
  );
}
export function RestaurantCard({
  restaurant: r,
  wide = false,
}: {
  restaurant: Restaurant;
  wide?: boolean;
}) {
  const favorite = useStore((s) => s.favorites.includes(r.id));
  const toggle = useStore((s) => s.toggleFavorite);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${r.name}`}
      onPress={() => router.push(`/restaurant/${r.id}`)}
      style={({ pressed }) => ({
        width: wide ? "100%" : 247,
        borderWidth: 1,
        borderColor: "#ECECEC",
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "white",
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View>
        <Photo
          uri={r.image}
          style={{ height: wide ? 180 : 134, width: "100%" }}
        />
        {r.promo && (
          <View
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "white",
              borderRadius: 6,
              paddingHorizontal: 9,
              paddingVertical: 4,
            }}
          >
            <T weight="bold" style={{ fontSize: 10, color: colors.red }}>
              OFERTA ESPECIAL
            </T>
          </View>
        )}
        <Pressable
          accessibilityLabel={
            favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          onPress={(e) => {
            e.stopPropagation();
            toggle(r.id);
          }}
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 24,
          }}
        >
          <Heart
            size={17}
            color={favorite ? colors.red : "#444"}
            fill={favorite ? colors.red : "transparent"}
          />
        </Pressable>
        <View style={{ position: "absolute", bottom: -15, left: 12 }}>
          <Logo restaurant={r} />
        </View>
      </View>
      <View style={{ padding: 14, paddingTop: 23, gap: 6 }}>
        <View style={ui.between}>
          <T weight="bold" numberOfLines={1} style={{ flex: 1 }}>
            {r.name}
          </T>
          <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
            <Star size={12} color="#E5A42B" fill="#E5A42B" />
            <T weight="semibold" style={{ fontSize: 11 }}>
              {r.rating.toFixed(1)}
            </T>
          </View>
        </View>
        <T style={{ fontSize: 11, color: colors.muted }}>
          {r.cuisine} · {r.distance}
        </T>
        <View style={[ui.row, { gap: 7 }]}>
          <T style={{ fontSize: 11, color: colors.muted }}>
            {r.time}–{r.time + 10} min
          </T>
          <T style={{ color: "#CCC" }}>·</T>
          <T
            weight="medium"
            style={{
              fontSize: 11,
              color: r.delivery ? colors.muted : colors.green,
            }}
          >
            {r.delivery ? money(r.delivery) : "Entrega grátis"}
          </T>
        </View>
      </View>
    </Pressable>
  );
}
