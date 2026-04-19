import { shallowMount } from '@vue/test-utils';
import ProductsSorting from '@/components/product/ProductsSorting.vue';

describe('ProductsSorting.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(ProductsSorting as any, {
      propsData: { currentSort: 'default' }
    });
  });

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('renders all sort options', () => {
    const options = wrapper.findAll('option');
    expect(options.length).toBeGreaterThan(0);
  });

  it('has correct default selected value', () => {
    const select = wrapper.find('select');
    expect(select.element.value).toBe('default');
  });

  it('emits sort-change event when option selected', async () => {
    const select = wrapper.find('select');
    await select.setValue('price-asc');
    expect(wrapper.emitted('sort-change')).toBeTruthy();
    expect(wrapper.emitted('sort-change')[0][0]).toBe('price-asc');
  });

  it('updates selected value when currentSort prop changes', async () => {
    await wrapper.setProps({ currentSort: 'rating-desc' });
    const select = wrapper.find('select');
    expect(select.element.value).toBe('rating-desc');
  });
});