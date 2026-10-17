import { Pressable, View } from "react-native";
import { ArrowUpRight } from "lucide-react-native";
import { router } from "expo-router";
import { Page, T, SearchShortcut } from "../../components/ui";
import { CategoryGrid } from "../../components/Home";
import { categories } from "../../data/mocks";
import { colors, ui } from "../../constants/theme";

export default function Categories() {
  return (
    <Page
      title="Um mundo de possibilidades"
      subtitle="Tudo o que você precisa, pertinho de você."
    >
      <SearchShortcut />
      <CategoryGrid />
      <T weight="bold" style={{ fontSize: 21, marginTop: 10 }}>
        Explore do seu jeito
      </T>
      {categories.map((c) => (
        <Pressable
          key={c.id}
          onPress={() =>
            router.push({
              pathname: "/restaurants",
              params: { category: c.id },
            })
          }
          style={[
            ui.between,
            { backgroundColor: c.color, padding: 20, borderRadius: 16 },
          ]}
        >
          <View>
            <T weight="semibold">{c.name}</T>
            <T style={{ color: colors.muted, fontSize: 12 }}>{c.subtitle}</T>
          </View>
          <ArrowUpRight color={colors.text} size={21} />
        </Pressable>
      ))}
    </Page>
  );
}
