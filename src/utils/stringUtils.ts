export const capitalizeFirstLetter = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeEachWord = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

export const formatCategoryName = (slug: string): string => {
  if (!slug || typeof slug !== "string") return "";

  // Replace hyphens with spaces and capitalize each word
  return slug
    .split("-")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

export const formatPrice = (price: number, currency = "$"): string => {
  if (typeof price !== "number" || isNaN(price)) return `${currency}0`;
  return `${currency}${price.toFixed(2)}`;
};
