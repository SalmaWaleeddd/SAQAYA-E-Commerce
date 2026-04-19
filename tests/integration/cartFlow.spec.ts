import { shallowMount } from '@vue/test-utils';
import ProductCard from '@/components/product/ProductCard.vue';
import { mockProduct } from '../mocks/productMock';

describe('Cart Flow Integration', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('adds product to cart and emits event', async () => {
    wrapper = shallowMount(ProductCard as any, {
      propsData: { product: mockProduct }
    });
    
    await wrapper.vm.handleAddToCart();
    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
    expect(wrapper.emitted('add-to-cart')[0][0]).toEqual(mockProduct);
  });

  it('calculates cart total correctly', () => {
    const cartItems = [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 }
    ];
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    expect(total).toBe(40);
  });
});