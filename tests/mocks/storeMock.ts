export const createMockStore = () => ({
  state: {
    cart: {
      items: [],
      loading: false
    },
    products: {
      currentProduct: null,
      items: [],
      loading: false,
      error: null
    }
  },
  getters: {
    'cart/cartItems': [],
    'cart/cartSummary': { subtotal: 0, shipping: 0, total: 0, itemCount: 0 },
    'products/allProducts': [],
    'products/hasMore': false,
    'products/totalProducts': 0
  },
  dispatch: jest.fn(),
  commit: jest.fn()
});