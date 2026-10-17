import { router } from "expo-router";
import { Empty, Page } from "../components/ui";
import { RestaurantCard } from "../components/RestaurantCard";
import { restaurants } from "../data/mocks";
import { useStore } from "../store/useStore";
export default function Favorites() {
  const favorites = useStore((s) => s.favorites);
  return (
    <Page
      title="Seus favoritos"
      subtitle="As lojas que ganharam seu coração."
      back
    >
      {favorites.length ? (
        restaurants
          .filter((r) => favorites.includes(r.id))
          .map((r) => <RestaurantCard key={r.id} restaurant={r} wide />)
      ) : (
        <Empty
          title="Guarde seus melhores sabores"
          description="Toque no coração de uma loja para encontrá-la aqui."
          action={() => router.push("/restaurants")}
        />
      )}
    </Page>
  );
}
