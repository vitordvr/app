import { useState } from "react";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  ArrowUpRight,
  Bike,
} from "lucide-react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { banners, categories, restaurants } from "../data/mocks";
import { colors, money, ui } from "../constants/theme";
import { useStore } from "../store/useStore";
import { CategoryArt } from "./CategoryArt";
import {
  CartBar,
  Chip,
  IconButton,
  Page,
  Photo,
  SearchShortcut,
  T,
} from "./ui";
import { Logo, RestaurantCard } from "./RestaurantCard";
import { Restaurant } from "../types";

export function CategoryGrid() {
  const { width } = useWindowDimensions();
  const big = width >= 760;
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {categories.slice(0, 2).map((c) => (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityLabel={`Explorar ${c.name}`}
            onPress={() =>
              router.push({
                pathname: "/restaurants",
                params: { category: c.id },
              })
            }
            style={({ pressed }) => ({
              flex: 1,
              backgroundColor: pressed ? c.color : "#F5F5F5",
              height: big ? 148 : 114,
              borderRadius: 17,
              overflow: "hidden",
              padding: 16,
            })}
          >
            <T weight="semibold" style={{ fontSize: big ? 19 : 14 }}>
              {c.name}
            </T>
            {big && (
              <T style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>
                {c.subtitle}
              </T>
            )}
            <View
              pointerEvents="none"
              style={{ position: "absolute", right: big ? 20 : 0, bottom: -4 }}
            >
              <CategoryArt kind={c.id} size={big ? 150 : 96} />
            </View>
            <View
              style={{
                position: "absolute",
                left: 16,
                bottom: 15,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 5,
              }}
            >
              <ArrowUpRight size={14} color="#777" />
            </View>
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: "row", gap: big ? 16 : 10 }}>
        {categories.slice(2).map((c) => (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityLabel={`Explorar ${c.name}`}
            onPress={() =>
              router.push({
                pathname: "/restaurants",
                params: { category: c.id },
              })
            }
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              borderRadius: 15,
              paddingVertical: 8,
            }}
          >
            <CategoryArt kind={c.id} size={big ? 95 : 68} />
            <T
              weight="medium"
              style={{ fontSize: big ? 13 : 10, marginBottom: 3 }}
            >
              {c.name}
            </T>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
function Section({
  title,
  subtitle,
  items,
  filter,
}: {
  title: string;
  subtitle?: string;
  items: Restaurant[];
  filter?: string;
}) {
  return (
    <View style={{ gap: 16 }}>
      <View style={ui.between}>
        <View>
          <T
            weight="bold"
            style={{ fontSize: 21, lineHeight: 29, letterSpacing: -0.6 }}
          >
            {title}
          </T>
          {subtitle && (
            <T style={{ fontSize: 12, color: colors.muted, marginTop: 3 }}>
              {subtitle}
            </T>
          )}
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/restaurants",
              params: { filter: filter || "", title },
            })
          }
          style={[ui.row, { gap: 3, paddingVertical: 10 }]}
        >
          <T weight="medium" style={{ color: colors.red, fontSize: 12 }}>
            Ver mais
          </T>
          <ChevronRight size={14} color={colors.red} />
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 15 }}
      >
        {items.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </ScrollView>
    </View>
  );
}
export default function Home() {
  const { width } = useWindowDimensions();
  const desktop = width >= 760;
  const [slide, setSlide] = useState(0);
  const address = useStore((s) => s.address);
  const bannerWidth = desktop ? 690 : width - 56;
  return (
    <Page scroll={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: desktop ? 30 : 20,
          paddingBottom: 28,
        }}
      >
        <View style={[ui.between, { paddingTop: 20, paddingBottom: 23 }]}>
          {desktop && (
            <View style={ui.row}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 12,
                  backgroundColor: colors.red,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [{ rotate: "-8deg" }],
                }}
              >
                <Bike color="white" size={23} />
              </View>
              <T
                weight="black"
                style={{ fontSize: 27, lineHeight: 35, letterSpacing: -1.5 }}
              >
                food
                <T weight="black" style={{ color: colors.red, fontSize: 27 }}>
                  go
                </T>
                <T style={{ color: colors.red }}>.</T>
              </T>
            </View>
          )}
          <Pressable onPress={() => router.push("/addresses")} style={ui.row}>
            <MapPin size={20} color={colors.red} />
            <View>
              <T
                style={{ fontSize: 9, color: colors.muted, letterSpacing: 1.5 }}
              >
                ENTREGAR EM CASA
              </T>
              <View style={[ui.row, { gap: 7 }]}>
                <T weight="semibold" style={{ fontSize: 13 }}>
                  {address}
                </T>
                <ChevronDown size={15} color={colors.red} />
              </View>
            </View>
          </Pressable>
          <IconButton
            label="Notificações"
            onPress={() => router.push("/notifications")}
          >
            <Bell size={21} color={colors.text} />
            <View
              style={{
                position: "absolute",
                right: 11,
                top: 8,
                width: 6,
                height: 6,
                backgroundColor: colors.red,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "white",
              }}
            />
          </IconButton>
        </View>
        <SearchShortcut />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 13,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EEE",
          }}
          contentContainerStyle={{ gap: desktop ? 32 : 25 }}
        >
          <Pressable
            style={{
              paddingVertical: 15,
              borderBottomWidth: 3,
              borderBottomColor: colors.red,
            }}
          >
            <T weight="semibold" style={{ color: colors.red }}>
              Início
            </T>
          </Pressable>
          {categories.map((c) => (
            <Pressable
              key={c.id}
              onPress={() =>
                router.push({
                  pathname: "/restaurants",
                  params: { category: c.id },
                })
              }
              style={{ paddingVertical: 15 }}
            >
              <T style={{ color: "#888" }}>{c.name}</T>
            </Pressable>
          ))}
        </ScrollView>
        <View style={[ui.between, { marginBottom: 18 }]}>
          <View>
            <T style={{ fontSize: 12, color: colors.muted, marginBottom: 3 }}>
              Seu dia pede algo gostoso
            </T>
            <T
              weight="bold"
              style={{
                fontSize: desktop ? 29 : 24,
                lineHeight: 34,
                letterSpacing: -0.9,
              }}
            >
              O que vai ser hoje?
            </T>
          </View>
          <Sparkles color="#D89D41" size={25} />
        </View>
        <CategoryGrid />
        <View style={{ marginTop: 25 }}>
          <ScrollView
            horizontal
            snapToInterval={bannerWidth + 14}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setSlide(
                Math.round(e.nativeEvent.contentOffset.x / (bannerWidth + 14)),
              )
            }
            contentContainerStyle={{ gap: 14 }}
          >
            {banners.map((b) => (
              <Pressable
                key={b.id}
                onPress={() =>
                  router.push(
                    b.filter === "cupons"
                      ? "/coupons"
                      : {
                          pathname: "/restaurants",
                          params: {
                            filter: b.filter,
                            category: b.filter === "market" ? "market" : "",
                          },
                        },
                  )
                }
                style={{
                  width: bannerWidth,
                  height: desktop ? 250 : 210,
                  borderRadius: 20,
                  overflow: "hidden",
                  backgroundColor: b.color,
                }}
              >
                <Photo
                  uri={b.image}
                  style={{
                    position: "absolute",
                    right: 0,
                    width: "57%",
                    height: "100%",
                  }}
                />
                <LinearGradient
                  colors={[b.color, b.color, `${b.color}00`]}
                  locations={[0, 0.42, 1]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={{ position: "absolute", width: "88%", height: "100%" }}
                />
                <View
                  style={{
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: "#FFFFFF15",
                    left: -100,
                    bottom: -80,
                  }}
                />
                <View
                  style={{
                    padding: desktop ? 28 : 21,
                    alignItems: "flex-start",
                    flex: 1,
                  }}
                >
                  <T
                    weight="bold"
                    style={{
                      fontSize: desktop ? 9 : 7,
                      color: "#FFFFFFC9",
                      letterSpacing: 1.3,
                    }}
                  >
                    {b.eyebrow}
                  </T>
                  <T
                    weight="black"
                    style={{
                      color: "white",
                      fontSize: desktop ? 36 : 28,
                      lineHeight: desktop ? 39 : 32,
                      letterSpacing: -1.1,
                      marginTop: 8,
                    }}
                  >
                    {b.title}
                  </T>
                  <View
                    style={{
                      backgroundColor: "#FFF4D4",
                      borderRadius: 7,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      marginTop: 12,
                    }}
                  >
                    <T
                      weight="bold"
                      style={{ color: "#A43A24", fontSize: desktop ? 16 : 13 }}
                    >
                      {b.highlight}
                    </T>
                  </View>
                  {desktop && (
                    <T
                      style={{
                        color: "#FFFFFFDA",
                        fontSize: 10,
                        marginTop: 10,
                      }}
                    >
                      {b.subtitle}
                    </T>
                  )}
                  <View
                    style={{
                      position: "absolute",
                      right: 16,
                      bottom: 17,
                      backgroundColor: "white",
                      width: 33,
                      height: 33,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowUpRight size={17} color={b.color} />
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              marginTop: 13,
            }}
          >
            {banners.map((b, i) => (
              <View
                key={b.id}
                style={{
                  width: slide === i ? 18 : 5,
                  height: 5,
                  borderRadius: 4,
                  backgroundColor: slide === i ? colors.red : "#DDD",
                }}
              />
            ))}
          </View>
        </View>
        <Pressable
          onPress={() => router.push("/coupons")}
          style={[
            ui.between,
            {
              backgroundColor: "#FFF6F2",
              borderRadius: 14,
              padding: 15,
              marginTop: 23,
              marginBottom: 28,
              borderWidth: 1,
              borderColor: "#FCECE5",
            },
          ]}
        >
          <View style={ui.row}>
            <Ticket color={colors.red} size={25} />
            <View>
              <T weight="semibold" style={{ fontSize: 12 }}>
                Um presente para o seu primeiro pedido
              </T>
              <T style={{ color: colors.muted, fontSize: 10 }}>
                Use BEMVINDO20 e ganhe R$ 20 de desconto*
              </T>
            </View>
          </View>
          <ChevronRight size={18} color={colors.red} />
        </Pressable>
        <View style={{ gap: 29 }}>
          <View>
            <View style={ui.between}>
              <T weight="bold" style={{ fontSize: 21, letterSpacing: -0.6 }}>
                Últimas lojas
              </T>
              <Pressable onPress={() => router.push("/restaurants")}>
                <T style={{ color: colors.red, fontSize: 12 }}>Ver mais</T>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: desktop ? 32 : 22, paddingTop: 18 }}
            >
              {restaurants.slice(0, 8).map((r) => (
                <Pressable
                  key={r.id}
                  onPress={() => router.push(`/restaurant/${r.id}`)}
                  style={{ width: 81, alignItems: "center", gap: 8 }}
                >
                  <Logo restaurant={r} size={66} />
                  <T numberOfLines={1} weight="medium" style={{ fontSize: 10 }}>
                    {r.name}
                  </T>
                  <View
                    style={{
                      backgroundColor: "#F2F8F3",
                      paddingHorizontal: 7,
                      borderRadius: 4,
                    }}
                  >
                    <T style={{ color: colors.green, fontSize: 8 }}>
                      {r.delivery ? `Entrega ${money(r.delivery)}` : "Entrega grátis"}
                    </T>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            <View style={{ justifyContent: "center", paddingRight: 4 }}>
              <SlidersHorizontal size={17} color="#555" />
            </View>
            {[
              "Entrega grátis",
              "Melhor avaliação",
              "Menor tempo",
              "Promoções",
            ].map((f) => (
              <Chip
                key={f}
                title={f}
                onPress={() =>
                  router.push({
                    pathname: "/restaurants",
                    params: { filter: f },
                  })
                }
              />
            ))}
          </ScrollView>
          <Section
            title="Entrega grátis"
            subtitle="Seu prato favorito, sem taxa de entrega"
            items={restaurants.filter((r) => !r.delivery)}
            filter="Entrega grátis"
          />
          <Section
            title="Os queridinhos do bairro"
            subtitle="Restaurantes populares · quem pede, recomenda"
            items={[...restaurants]
              .filter((r) => r.category === "restaurants")
              .sort((a, b) => b.rating - a.rating)}
            filter="Melhor avaliação"
          />
          <Section
            title="Ofertas do dia"
            subtitle="Preços que dão ainda mais vontade"
            items={restaurants.filter((r) => r.promo)}
            filter="Promoções"
          />
          <Section
            title="Recomendados para você"
            subtitle="Seu próximo favorito pode estar aqui"
            items={restaurants.slice(3, 10)}
          />
          <View style={{ alignItems: "center", paddingTop: 15, gap: 3 }}>
            <T weight="bold" style={{ color: "#AAA", fontSize: 19 }}>
              foodgo.
            </T>
            <T style={{ fontSize: 10, color: "#AAA" }}>
              Feito para levar bons momentos até você.
            </T>
            <T style={{ fontSize: 9, color: "#BBB" }}>
              *Pedido mínimo de R$ 50. Aplicativo de demonstração.
            </T>
          </View>
        </View>
      </ScrollView>
      <CartBar />
    </Page>
  );
}
