import { Tabs } from "expo-router";
import {
  House,
  Search,
  LayoutGrid,
  ReceiptText,
  UserRound,
} from "lucide-react-native";
import { colors, fonts } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
  { name: "index", title: "Início", Icon: House },
  { name: "search", title: "Busca", Icon: Search },
  { name: "categories", title: "Categorias", Icon: LayoutGrid },
  { name: "orders", title: "Pedidos", Icon: ReceiptText },
  { name: "profile", title: "Perfil", Icon: UserRound },
];
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: "#8C8C8C",
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          borderTopColor: "#EEE",
          height: 64 + Math.max(insets.bottom, 12),
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 12),
          backgroundColor: "white",
        },
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: 10,
          marginTop: 4,
        },
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: "white" },
      }}
    >
      {tabs.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <Icon color={color} size={22} strokeWidth={focused ? 2.4 : 1.7} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
