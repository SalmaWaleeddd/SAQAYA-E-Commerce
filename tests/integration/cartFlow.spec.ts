import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ProductCard from '@/components/product/ProductCard.vue';
import { useCartStore } from '@/stores/useCartStore';
import { mockProduct } from '../mocks/productMock';

// Mock BaseButton component
jest.mock('@/components/ui/BaseButton.vue', () => ({
  default: { template: '<button><slot /></button>' },
}));

describe('Cart Flow Integration', () => {
  let wrapper: any;
  let cartStore: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    cartStore = useCartStore();
    
    wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        stubs: {
          'router-link': { template: '<a><slot /></a>' },
        },
      },
    });
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  it('adds product to cart and emits event', async () => {
    const button = wrapper.find('.product-card__img-container__add-to-cart');
    await button.trigger('click');
    
    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
    expect(wrapper.emitted('add-to-cart')[0][0]).toEqual(mockProduct);
  });

  it('calculates cart total correctly using store', () => {
    // Add items to cart store
    cartStore.addToCart(mockProduct, 2);
    
    // Get the cart summary
    const summary = cartStore.cartSummary;
    
    // Calculate expected total
    const discountedPrice = mockProduct.discountPercentage 
      ? mockProduct.price * (1 - mockProduct.discountPercentage / 100)
      : mockProduct.price;
    const expectedTotal = discountedPrice * 2;
    
    expect(summary.subtotal).toBe(expectedTotal);
  });

  it('updates cart total when quantity changes', async () => {
    // Add product to cart
    cartStore.addToCart(mockProduct, 1);
    
    // Update quantity
    cartStore.updateQuantity(mockProduct.id, 3);
    
    const summary = cartStore.cartSummary;
    const discountedPrice = mockProduct.discountPercentage 
      ? mockProduct.price * (1 - mockProduct.discountPercentage / 100)
      : mockProduct.price;
    const expectedTotal = discountedPrice * 3;
    
    expect(summary.subtotal).toBe(expectedTotal);
  });

  it('removes product from cart', async () => {
    // Add then remove product
    cartStore.addToCart(mockProduct, 1);
    expect(cartStore.cartItems.length).toBe(1);
    
    cartStore.removeItem(mockProduct.id);
    expect(cartStore.cartItems.length).toBe(0);
  });

  it('calculates shipping correctly based on subtotal', () => {
    // Test with low subtotal (shipping applies)
    cartStore.addToCart({ ...mockProduct, price: 10, discountPercentage: 0 }, 1);
    expect(cartStore.cartSummary.shipping).toBeGreaterThan(0);
    
    // Clear cart
    cartStore.clearCart();
    
    // Test with high subtotal (free shipping)
    cartStore.addToCart({ ...mockProduct, price: 200, discountPercentage: 0 }, 1);
    expect(cartStore.cartSummary.shipping).toBe(0);
  });
});