import { config } from "@vue/test-utils";

// Mock Vuex store
jest.mock('vuex', () => ({
  useStore: jest.fn(),
  mapGetters: jest.fn(),
  mapActions: jest.fn(),
  mapState: jest.fn()
}));

// Mock Vue Router
jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
  useRoute: jest.fn()
}));

// Mock product service
jest.mock('@/services/product.service', () => ({
  default: {
    getProductById: jest.fn(),
    getProducts: jest.fn(),
    getProductsByCategory: jest.fn()
  }
}));

// Mock global $root event bus
const mockEmit = jest.fn();
const mockOn = jest.fn();
const mockOff = jest.fn();

Object.defineProperty(globalThis, 'window', {
  value: {
    scrollTo: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }
});

globalThis.document = {
  body: { style: { overflow: '' } }
} as any;

// Configure Vue Test Utils
config.stubs = {
  'router-link': true,
  'router-view': true,
};