import { SortOption } from "@/types/product";

// Map category slugs to icon image paths
export const categoryIconMap: Record<string, string> = {
  "beauty": "@/assets/icons/categories/beauty.svg",
  "fragrances": "@/assets/icons/categories/fragrance.svg",
  "furniture": "@/assets/icons/categories/furniture.svg",
  "camera": "@/assets/icons/categories/camera.svg",
  "mobile-accessories": "@/assets/icons/categories/mobile-accessories.svg",
  "home-accessories": "@/assets/icons/categories/home-accessories.svg",
};

export const SORT_OPTIONS: SortOption[] = [
  { label: "Default", value: "default", sortBy: "", order: "asc" },
  { label: "Price: Low to High", value: "price-asc", sortBy: "price", order: "asc" },
  { label: "Price: High to Low", value: "price-desc", sortBy: "price", order: "desc" },
  { label: "Highest Rating", value: "rating-desc", sortBy: "rating", order: "desc" },
  { label: "Lowest Rating", value: "rating-asc", sortBy: "rating", order: "asc" },
  { label: "Best Discount", value: "discount-desc", sortBy: "discountPercentage", order: "desc" },
];