import { mount } from "@vue/test-utils";
import ProductDetails from "@/components/product/ProductDetails.vue";
import { mockProduct } from "../../mocks/productMock";

describe("ProductDetails.vue", () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it("computes sale price correctly with discount", () => {
    wrapper = mount(ProductDetails as any, {
      propsData: { product: mockProduct },
    });

    const expectedPrice =
      mockProduct.price * (1 - mockProduct.discountPercentage / 100);
    expect(wrapper.vm.getSalePrice()).toBe(expectedPrice);
  });

  it("shows In Stock when stock > 0", () => {
    wrapper = mount(ProductDetails as any, {
      propsData: { product: mockProduct },
    });

    expect(wrapper.vm.isInStock).toBe(true);
    expect(wrapper.find(".rating__stock--in").exists()).toBe(true);
  });

  it("shows Out of Stock when stock = 0", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    wrapper = mount(ProductDetails as any, {
      propsData: { product: outOfStockProduct },
    });

    expect(wrapper.vm.isInStock).toBe(false);
    expect(wrapper.find(".rating__stock--out").exists()).toBe(true);
  });

  it("increment increases quantity up to max stock", async () => {
    wrapper = mount(ProductDetails as any, {
      propsData: { product: mockProduct },
    });

    expect(wrapper.vm.quantity).toBe(1);
    await wrapper.vm.increment();
    expect(wrapper.vm.quantity).toBe(2);
  });

  it("decrement decreases quantity but not below 1", async () => {
    wrapper = mount(ProductDetails as any, {
      propsData: { product: mockProduct },
    });

    wrapper.vm.quantity = 1;
    await wrapper.vm.decrement();
    expect(wrapper.vm.quantity).toBe(1);
  });

  it("emits buy-now with correct payload", async () => {
    wrapper = mount(ProductDetails as any, {
      propsData: { product: mockProduct },
    });

    wrapper.vm.quantity = 3;
    await wrapper.vm.handleBuyNow();

    expect(wrapper.emitted("buy-now")).toBeTruthy();
    expect(wrapper.emitted("buy-now")[0][0]).toEqual({
      product: mockProduct,
      quantity: 3,
    });
  });

  it("displays correct number of rating stars", () => {
    wrapper = mount(ProductDetails as any, {
      propsData: { product: mockProduct },
    });
    const filledStars = wrapper.findAll(".rating__star--filled");
    expect(filledStars.length).toBe(4);
  });
});
