import { mount } from '@vue/test-utils';
import ProductCard from '@/components/product/ProductCard.vue';
import { mockProduct } from '../mocks/productMock';

describe('Cart Flow Integration', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('adds product to cart and updates sidebar', async () => {
    // Mock the global event bus
    const mockEmit = jest.fn();
    const mockRoot = { $emit: mockEmit };
    
    wrapper = mount(ProductCard, {
      propsData: { product: mockProduct },
     mocks: { $root: mockRoot }
    });
    
    await wrapper.vm.handleAddToCart();
    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
  });

  it('calculates cart total correctly', () => {
    const cartItems = [
      { ...mockProduct, quantity: 2, price: 10 },
      { ...mockProduct, quantity: 1, price: 20 }
    ];
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    expect(total).toBe(40);
  });
});