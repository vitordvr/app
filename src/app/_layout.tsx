import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { Inter_800ExtraBold } from "@expo-google-fonts/inter/800ExtraBold";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { CheckCircle2, CircleAlert } from "lucide-react-native";
import { colors } from "../constants/theme";
import { T } from "../components/ui";
import { useStore } from "../store/useStore";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  const toast = useStore((s) => s.toast);
  const hydrated = useStore((s) => s.hydrated);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => useStore.setState({ toast: null }), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  if ((!loaded && !error) || !hydrated)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator color={colors.red} size="large" />
      </View>
    );
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" options={{ presentation: "modal" }} />
      </Stack>
      {toast && (
        <Animated.View
          key={toast.message}
          entering={FadeInDown.duration(200)}
          exiting={FadeOutUp.duration(160)}
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 58,
            alignSelf: "center",
            width: "90%",
            maxWidth: 460,
            padding: 17,
            borderRadius: 15,
            backgroundColor: toast.error ? "#A82637" : "#216949",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            elevation: 8,
            boxShadow: "0 5px 20px #00000020",
          }}
        >
          {toast.error ? (
            <CircleAlert color="white" size={20} />
          ) : (
            <CheckCircle2 color="white" size={20} />
          )}
          <T style={{ color: "white", flex: 1, fontSize: 13 }}>
            {toast.message}
          </T>
        </Animated.View>
      )}
    </SafeAreaProvider>
  );
}
