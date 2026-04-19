export const mockProduct = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  category: "beauty",
  tags: ["beauty", "mascara"],
  thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
  images: [
    "https://dummyjson.com/image/i/products/1/1.jpg",
    "https://dummyjson.com/image/i/products/1/2.jpg"
  ]
};

export const mockProductNoDiscount = {
  ...mockProduct,
  id: 2,
  title: "iPhone 9",
  price: 549,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10
};

export const mockProductOutOfStock = {
  ...mockProduct,
  id: 3,
  title: "Out of Stock Item",
  stock: 0
};

export const mockCartItem = {
  productId: 1,
  product: mockProduct,
  quantity: 2,
  price: 9.99,
  totalPrice: 19.98,
  title: "Essence Mascara Lash Princess",
  thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg"
};

export const mockCartState = {
  items: [mockCartItem],
  totalItems: 2,
  totalPrice: 19.98
};