import { shallowMount } from '@vue/test-utils';
import CartSidebar from '@/components/cart/CartSidebar.vue';

describe('CartSidebar.vue', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('shows empty cart message when no items', () => {
    wrapper = shallowMount(CartSidebar as any, {
      data() {
        return { isOpen: true };
      },
      computed: {
        typedCartItems: () => [],
        typedCartSummary: () => ({ subtotal: 0, shipping: 0, total: 0, itemCount: 0 })
      }
    });
    
    expect(wrapper.text()).toContain('Your cart is empty');
  });

  it('shows cart items when items exist', () => {
    wrapper = shallowMount(CartSidebar as any, {
      data() {
        return { isOpen: true };
      },
      computed: {
        typedCartItems: () => [{
          productId: 1,
          title: 'Test Product',
          price: 99.99,
          quantity: 2,
          totalPrice: 199.98,
          thumbnail: 'test.jpg'
        }],
        typedCartSummary: () => ({ subtotal: 199.98, shipping: 5, total: 204.98, itemCount: 2 })
      }
    });
    
    expect(wrapper.find('.cart-sidebar__items').exists()).toBe(true);
  });

  it('opens sidebar when openCart method called', async () => {
    wrapper = shallowMount(CartSidebar as any, {
      computed: {
        typedCartItems: () => [],
        typedCartSummary: () => ({ subtotal: 0, shipping: 0, total: 0, itemCount: 0 })
      }
    });
    
    expect(wrapper.vm.isOpen).toBe(false);
    await wrapper.vm.openCart();
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('closes sidebar when closeCart method called', async () => {
    wrapper = shallowMount(CartSidebar as any, {
      computed: {
        typedCartItems: () => [],
        typedCartSummary: () => ({ subtotal: 0, shipping: 0, total: 0, itemCount: 0 })
      }
    });
    
    await wrapper.vm.openCart();
    expect(wrapper.vm.isOpen).toBe(true);
    
    await wrapper.vm.closeCart();
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('calculates free shipping correctly', () => {
    wrapper = shallowMount(CartSidebar as any, {
      computed: {
        typedCartItems: () => [],
        typedCartSummary: () => ({ subtotal: 30, shipping: 5, total: 35, itemCount: 1 })
      }
    });
    
    expect(wrapper.vm.freeShippingRemaining).toBeGreaterThan(0);
  });

  it('shows free shipping when subtotal meets threshold', () => {
    wrapper = shallowMount(CartSidebar as any, {
      computed: {
        typedCartItems: () => [],
        typedCartSummary: () => ({ subtotal: 150, shipping: 0, total: 150, itemCount: 3 })
      }
    });
    
    expect(wrapper.vm.qualifiesForFreeShipping).toBe(true);
  });
});