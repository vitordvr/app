import { Pressable, View } from "react-native";
import { Plus } from "lucide-react-native";
import { router } from "expo-router";
import { Product } from "../types";
import { colors, money, ui } from "../constants/theme";
import { Photo, T } from "./ui";

export function ProductRow({
  product: p,
  shop,
}: {
  product: Product;
  shop?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver ${p.name}`}
      onPress={() => router.push(`/product/${p.id}`)}
      style={[
        ui.row,
        {
          paddingVertical: 17,
          borderBottomWidth: 1,
          borderBottomColor: colors.line,
          alignItems: "center",
          gap: 16,
        },
      ]}
    >
      <View style={{ flex: 1, gap: 5 }}>
        {shop && <T style={{ fontSize: 10, color: colors.red }}>{shop}</T>}
        <T weight="semibold">{p.name}</T>
        <T
          numberOfLines={2}
          style={{ fontSize: 12, lineHeight: 18, color: colors.muted }}
        >
          {p.description}
        </T>
        <View style={ui.row}>
          <T
            weight="semibold"
            style={{ color: p.originalPrice ? colors.green : colors.text }}
          >
            {money(p.price)}
          </T>
          {p.originalPrice && (
            <T
              style={{
                textDecorationLine: "line-through",
                fontSize: 11,
                color: "#999",
              }}
            >
              {money(p.originalPrice)}
            </T>
          )}
        </View>
      </View>
      <View>
        <Photo
          uri={p.image}
          style={{ width: 102, height: 102, borderRadius: 14 }}
        />
        <View
          style={{
            position: "absolute",
            right: -3,
            bottom: -3,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#EEE",
            borderRadius: 11,
            padding: 8,
          }}
        >
          <Plus color={colors.red} size={17} />
        </View>
      </View>
    </Pressable>
  );
}
