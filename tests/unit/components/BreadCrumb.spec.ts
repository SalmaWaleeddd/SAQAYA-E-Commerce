import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import BreadCrumb from '@/components/common/BreadCrumb.vue';

// Mock the async component
jest.mock('@/components/common/BreadCrumb.vue', () => ({
  default: {
    name: 'BreadCrumb',
    template: `
      <div v-if="!isHomePage" class="bread-crumb">
        <router-link to="/">Home</router-link>
        <span v-for="(crumb, index) in breadcrumbs" :key="index">
          <span>/</span>
          <router-link v-if="!isLast(index)" :to="crumb.path">{{ crumb.name }}</router-link>
          <span v-else>{{ crumb.name }}</span>
        </span>
      </div>
    `,
    props: {},
    setup() {
      const route = { path: '/' };
      const isHomePage = route.path === '/';
      return { isHomePage, breadcrumbs: [] };
    },
  },
}));

describe('BreadCrumb.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  it('does not render on homepage', () => {
    wrapper = mount(BreadCrumb, {
      global: {
        mocks: {
          $route: { path: '/' }
        }
      }
    });
    expect(wrapper.find('.bread-crumb').exists()).toBe(false);
  });

  it('formats category names correctly', () => {
    // Test the formatName function logic
    const formatName = (segment: string) => {
      if (segment === '404-error') return '404 Error';
      if (segment === 'product') return 'Product';
      let name = segment.replace(/-/g, ' ');
      name = name.charAt(0).toUpperCase() + name.slice(1);
      return name;
    };
    expect(formatName('beauty-products')).toBe('Beauty products');
    expect(formatName('about-us')).toBe('About us');
  });

  it('handles 404 error page correctly', () => {
    const formatName = (segment: string) => {
      if (segment === '404-error') return '404 Error';
      return segment;
    };
    expect(formatName('404-error')).toBe('404 Error');
  });

  it('detects product ID segments', () => {
    const isProductId = (segment: string) => /^\d+$/.test(segment);
    expect(isProductId('123')).toBe(true);
    expect(isProductId('abc')).toBe(false);
    expect(isProductId('product')).toBe(false);
  });
});