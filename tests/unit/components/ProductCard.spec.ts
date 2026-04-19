import { mount, shallowMount } from '@vue/test-utils';
import ProductCard from '@/components/product/ProductCard.vue';
import { mockProduct, mockProductNoDiscount } from '../../mocks/productMock';

// Mock BaseButton component
jest.mock('@/components/ui/BaseButton.vue', () => ({
  name: 'BaseButton',
  template: '<button @click="$emit(\'click\')"><slot /></button>'
}));

describe('ProductCard.vue', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  describe('Rendering', () => {
    it('renders product title correctly', () => {
      wrapper = shallowMount(ProductCard, {
        propsData: { product: mockProduct }
      });
      expect(wrapper.find('.product-card__title').text()).toBe(mockProduct.title);
    });

    it('renders sale price when discount exists', () => {
      wrapper = shallowMount(ProductCard, {
        propsData: { product: mockProduct }
      });
      const salePrice = wrapper.find('.product-card__price-wrapper__price-sale');
      expect(salePrice.exists()).toBe(true);
    });

    it('shows discount badge when discountPercentage exists', () => {
      wrapper = shallowMount(ProductCard, {
        propsData: { product: mockProduct }
      });
      const discountBadge = wrapper.find('.product-card__img-container__discount');
      expect(discountBadge.exists()).toBe(true);
      expect(discountBadge.text()).toContain('7.17');
    });

    it('does not show discount badge when no discount', () => {
      wrapper = shallowMount(ProductCard, {
        propsData: { product: mockProductNoDiscount }
      });
      const discountBadge = wrapper.find('.product-card__img-container__discount');
      expect(discountBadge.exists()).toBe(false);
    });
  });

  describe('Rating Stars', () => {
    it('displays correct number of filled stars based on rating', () => {
      wrapper = shallowMount(ProductCard, {
        propsData: { product: mockProduct }
      });
      const filledStars = wrapper.findAll('.product-card__rating__star--filled');
      expect(filledStars.length).toBe(Math.floor(mockProduct.rating));
    });

    it('displays zero filled stars for rating 0', () => {
      const productWithZeroRating = { ...mockProduct, rating: 0 };
      wrapper = shallowMount(ProductCard, {
        propsData: { product: productWithZeroRating }
      });
      const filledStars = wrapper.findAll('.product-card__rating__star--filled');
      expect(filledStars.length).toBe(0);
    });
  });

  describe('Add to Cart', () => {
    it('emits add-to-cart event when button clicked', async () => {
      wrapper = shallowMount(ProductCard, {
        propsData: { product: mockProduct }
      });
      await wrapper.vm.handleAddToCart();
      expect(wrapper.emitted('add-to-cart')).toBeTruthy();
      expect(wrapper.emitted('add-to-cart')[0][0]).toEqual(mockProduct);
    });
  });

  describe('Price Calculation', () => {
    it('calculates sale price correctly with discount', () => {
      wrapper = shallowMount(ProductCard, {
        propsData: { product: mockProduct }
      });
      const expectedPrice = mockProduct.price * (1 - mockProduct.discountPercentage / 100);
      expect(wrapper.vm.getSalePrice()).toBe(expectedPrice);
    });

    it('returns original price when no discount', () => {
      wrapper = shallowMount(ProductCard, {
        propsData: { product: mockProductNoDiscount }
      });
      expect(wrapper.vm.getSalePrice()).toBe(mockProductNoDiscount.price);
    });
  });
});