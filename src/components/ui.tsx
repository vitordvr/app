import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react-native";
import { router } from "expo-router";
import { colors, fonts, money, ui } from "../constants/theme";
import { totals, useStore } from "../store/useStore";

export function T({
  children,
  style,
  weight = "regular",
  ...props
}: TextProps & { weight?: keyof typeof fonts }) {
  const fontSize = StyleSheet.flatten(style)?.fontSize || 14;
  return (
    <Text
      {...props}
      style={[
        {
          color: colors.text,
          fontFamily: fonts[weight],
          fontSize: 14,
          lineHeight: Math.round(fontSize * 1.4),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
export function Button({
  title,
  onPress,
  secondary = false,
  disabled = false,
  loading = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: 52,
          borderRadius: 14,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: secondary ? "#FFF0F1" : colors.red,
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        },
        ui.row,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <T
            weight="semibold"
            style={{ color: secondary ? colors.red : "white", flexShrink: 1, textAlign: "center" }}
          >
            {title}
          </T>
          {!secondary && <ArrowRight color="white" size={18} />}
        </>
      )}
    </Pressable>
  );
}
export function IconButton({
  children,
  onPress,
  label,
}: {
  children: React.ReactNode;
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: pressed ? "#FFECEF" : colors.background,
      })}
    >
      {children}
    </Pressable>
  );
}
export function Photo({
  uri,
  style,
}: {
  uri: string;
  style?: StyleProp<ImageStyle>;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <View
        style={[
          {
            backgroundColor: "#F8E9DF",
            justifyContent: "center",
            alignItems: "center",
          },
          style as StyleProp<ViewStyle>,
        ]}
      >
        <UtensilsCrossed size={35} color="#C79069" />
      </View>
    );
  return (
    <Image
      source={{ uri }}
      style={style}
      onError={() => setFailed(true)}
      resizeMode="cover"
    />
  );
}
export function Page({
  children,
  title,
  subtitle,
  back = false,
  footer,
  scroll = true,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  back?: boolean;
  footer?: React.ReactNode;
  scroll?: boolean;
}) {
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%", maxWidth: 1100, alignSelf: "center" }}
      >
        {title && (
          <View
            style={[
              ui.row,
              { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 22 },
            ]}
          >
            {back && (
              <IconButton
                label="Voltar"
                onPress={() =>
                  router.canGoBack() ? router.back() : router.replace("/")
                }
              >
                <ArrowLeft size={21} color={colors.text} />
              </IconButton>
            )}
            <View style={{ flex: 1 }}>
              <T weight="bold" style={{ fontSize: 26, lineHeight: 34 }}>
                {title}
              </T>
              {subtitle && (
                <T style={{ color: colors.muted, marginTop: 5 }}>{subtitle}</T>
              )}
            </View>
          </View>
        )}
        {scroll ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 22,
              paddingTop: title ? 0 : 16,
              paddingBottom: 30,
              gap: 20,
            }}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
        {footer && (
          <View
            style={{
              padding: 18,
              borderTopWidth: 1,
              borderTopColor: colors.line,
              backgroundColor: "white",
            }}
          >
            {footer}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export function Chip({
  title,
  active,
  onPress,
}: {
  title: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: active ? "#F8C3C8" : "#EAEAEA",
        backgroundColor: active ? "#FFF0F2" : pressed ? "#F4F4F4" : "white",
      })}
    >
      <T
        weight={active ? "semibold" : "medium"}
        style={{ fontSize: 12, color: active ? colors.red : "#666" }}
      >
        {title}
      </T>
    </Pressable>
  );
}
export function Empty({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: () => void;
}) {
  return (
    <View style={{ alignItems: "center", paddingVertical: 55, gap: 16 }}>
      <View
        style={{ backgroundColor: "#FFF0F1", padding: 24, borderRadius: 50 }}
      >
        <ShoppingBag color={colors.red} size={38} />
      </View>
      <T weight="bold" style={{ fontSize: 21 }}>
        {title}
      </T>
      <T style={{ textAlign: "center", color: colors.muted, maxWidth: 290 }}>
        {description}
      </T>
      {action && <Button title="Explorar lojas" onPress={action} />}
    </View>
  );
}
export function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <View
      style={[
        ui.row,
        { borderWidth: 1, borderColor: colors.line, borderRadius: 12, gap: 0 },
      ]}
    >
      <IconButton
        label="Diminuir quantidade"
        onPress={() => onChange(Math.max(0, value - 1))}
      >
        <Minus size={17} color={colors.red} />
      </IconButton>
      <T weight="semibold" style={{ minWidth: 28, textAlign: "center" }}>
        {value}
      </T>
      <IconButton
        label="Aumentar quantidade"
        onPress={() => onChange(value + 1)}
      >
        <Plus size={17} color={colors.red} />
      </IconButton>
    </View>
  );
}
export function RowLink({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[
        ui.row,
        {
          paddingVertical: 18,
          borderBottomWidth: 1,
          borderBottomColor: colors.line,
        },
      ]}
    >
      <View style={{ width: 42 }}>{icon}</View>
      <View style={{ flex: 1 }}>
        <T weight="semibold">{title}</T>
        {subtitle && (
          <T style={{ fontSize: 12, color: colors.muted }}>{subtitle}</T>
        )}
      </View>
      <ChevronRight size={18} color={colors.muted} />
    </Pressable>
  );
}
export function CartBar() {
  const cart = useStore((s) => s.cart);
  const coupon = useStore((s) => s.coupon);
  if (!cart.length) return null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Ver sacola"
      onPress={() => router.push("/cart")}
      style={[
        ui.between,
        {
          marginHorizontal: 18,
          marginBottom: 10,
          padding: 16,
          backgroundColor: colors.red,
          borderRadius: 15,
        },
      ]}
    >
      <View style={ui.row}>
        <ShoppingBag color="white" size={20} />
        <T weight="semibold" style={{ color: "white" }}>
          {cart.reduce((s, i) => s + i.quantity, 0)} itens · Ver sacola
        </T>
      </View>
      <T weight="bold" style={{ color: "white" }}>
        {money(totals(cart, coupon).total)}
      </T>
    </Pressable>
  );
}
export function SearchShortcut() {
  return (
    <Pressable
      onPress={() => router.push("/search")}
      style={[
        ui.row,
        {
          backgroundColor: colors.card,
          borderRadius: 14,
          paddingHorizontal: 17,
          height: 52,
        },
      ]}
    >
      <Search size={20} color={colors.red} />
      <T style={{ color: "#929292" }}>Buscar lojas ou itens</T>
      <View style={{ flex: 1 }} />
      <View style={{ width: 1, height: 20, backgroundColor: "#DDD" }} />
      <T style={{ color: "#999", fontSize: 12 }}>Buscar</T>
    </Pressable>
  );
}
export const common = StyleSheet.create({
  sectionTitle: { fontSize: 21, lineHeight: 29, letterSpacing: -0.6 },
  muted: { color: colors.muted },
  caption: { fontSize: 12, color: colors.muted },
});
