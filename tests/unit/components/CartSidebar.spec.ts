import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import CartSidebar from '@/components/cart/CartSidebar.vue';
import { useCartStore } from '@/stores/useCartStore';

// Mock CartItem component
jest.mock('@/components/cart/CartItem.vue', () => ({
  default: { template: '<div></div>' },
}));

describe('CartSidebar.vue', () => {
  let wrapper: any;
  let cartStore: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    cartStore = useCartStore();
    wrapper = mount(CartSidebar);
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  it('shows empty cart message when no items', () => {
    cartStore.items = [];
    expect(wrapper.text()).toContain('Your cart is empty');
  });

  it('shows cart items when items exist', () => {
    cartStore.items = [{
      productId: 1,
      title: 'Test Product',
      price: 99.99,
      quantity: 2,
      totalPrice: 199.98,
      thumbnail: 'test.jpg'
    }];
    expect(wrapper.find('.cart-sidebar__items').exists()).toBe(true);
  });

  it('closes sidebar when closeCart method called', async () => {
    await cartStore.openCart();
    expect(cartStore.isOpen).toBe(true);
    await cartStore.closeCart();
    expect(cartStore.isOpen).toBe(false);
  });

  it('calculates free shipping correctly', () => {
    cartStore.items = [{ productId: 1, price: 30, quantity: 1, totalPrice: 30, title: 'Test', thumbnail: 'test.jpg' }];
    expect(cartStore.freeShippingRemaining).toBeGreaterThan(0);
  });
});