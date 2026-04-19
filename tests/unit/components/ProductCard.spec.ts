import { shallowMount } from '@vue/test-utils';
import ProductCard from '@/components/product/ProductCard.vue';
import { mockProduct } from '../../mocks/productMock';

describe('ProductCard.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(ProductCard as any, {
      propsData: { product: mockProduct }
    });
  });

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('displays product title correctly', () => {
    expect(wrapper.find('.product-card__title').text()).toBe(mockProduct.title);
  });

  it('displays sale price when discount exists', () => {
    const salePrice = wrapper.find('.product-card__price-wrapper__price-sale');
    expect(salePrice.exists()).toBe(true);
  });

  it('shows discount badge when discountPercentage exists', () => {
    const discountBadge = wrapper.find('.product-card__img-container__discount');
    expect(discountBadge.exists()).toBe(true);
    expect(discountBadge.text()).toContain(String(mockProduct.discountPercentage));
  });

  it('displays correct number of filled stars based on rating', () => {
    const filledStars = wrapper.findAll('.product-card__rating__star--filled');
    expect(filledStars.length).toBe(Math.floor(mockProduct.rating));
  });

  it('emits add-to-cart event when button clicked', async () => {
    await wrapper.vm.handleAddToCart();
    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
    expect(wrapper.emitted('add-to-cart')[0][0]).toEqual(mockProduct);
  });
});