import { products, restaurants } from "./mocks";
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
/** Local adapter: replace these methods with your API client without changing screens. */
export const catalog = {
  restaurant: (id: string) => restaurants.find((r) => r.id === id),
  product: (id: string) => products.find((p) => p.id === id),
  menu: (id: string) => products.filter((p) => p.restaurantId === id),
  search: (query: string, category = "") => ({
    restaurants: restaurants.filter(
      (r) =>
        (!category || r.category === category) &&
        normalize(`${r.name} ${r.cuisine}`).includes(normalize(query)),
    ),
    products: products.filter(
      (p) =>
        (!category ||
          restaurants.find((r) => r.id === p.restaurantId)?.category ===
            category) &&
        normalize(p.name).includes(normalize(query)),
    ),
  }),
};
