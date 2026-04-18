import {  CategoryDisplay } from "@/types/product";
import { formatCategoryName } from "./stringUtils";
import { categoryIconMap } from "@/constants/products";



// Default icon if category not found
const DEFAULT_ICON = "@/assets/icons/categories/default.svg";

export const getCategoryIcon = (slug: string): string => {
  return categoryIconMap[slug] || DEFAULT_ICON;
};

export const transformCategories = (categories: string[]): CategoryDisplay[] => {
  return categories.map((category, index) => ({
    id: index + 1,
    name: formatCategoryName(category),
    slug: category,
    icon: getCategoryIcon(category),
  }));
};