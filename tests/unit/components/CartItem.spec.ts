import { mount } from "@vue/test-utils";
import CartItem from "@/components/cart/CartItem.vue";
import { mockCartItem } from "../../mocks/productMock";

describe("CartItem.vue", () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it("displays product title correctly", () => {
    wrapper = mount(CartItem as any, {
      propsData: { item: mockCartItem },
    });
    expect(wrapper.find(".cart-item__title").text()).toBe(mockCartItem.title);
  });

  it("displays correct quantity", () => {
    wrapper = mount(CartItem as any, {
      propsData: { item: mockCartItem },
    });
    expect(wrapper.find(".cart-item__quantity-value").text()).toBe(
      String(mockCartItem.quantity),
    );
  });

  it("increment button increases quantity", async () => {
    wrapper = mount(CartItem as any, {
      propsData: { item: mockCartItem },
    });

    await wrapper.vm.increment();
    expect(wrapper.emitted("update-quantity")).toBeTruthy();
    expect(wrapper.emitted("update-quantity")[0][0].quantity).toBe(
      mockCartItem.quantity + 1,
    );
  });

  it("decrement button decreases quantity when greater than 1", async () => {
    const itemWithQuantity2 = { ...mockCartItem, quantity: 2 };
    wrapper = mount(CartItem as any, {
      propsData: { item: itemWithQuantity2 },
    });

    await wrapper.vm.decrement();
    expect(wrapper.emitted("update-quantity")).toBeTruthy();
    expect(wrapper.emitted("update-quantity")[0][0].quantity).toBe(1);
  });

  it("decrement button is disabled when quantity is 1", () => {
    const itemWithQuantity1 = { ...mockCartItem, quantity: 1 };
    wrapper = mount(CartItem as any, {
      propsData: { item: itemWithQuantity1 },
    });

    const decrementBtn = wrapper.findAll(".cart-item__quantity-btn").at(1);
    expect(decrementBtn.attributes("disabled")).toBe("disabled");
  });

  it("remove button emits remove event", async () => {
    wrapper = mount(CartItem as any, {
      propsData: { item: mockCartItem },
    });

    await wrapper.vm.remove();
    expect(wrapper.emitted("remove")).toBeTruthy();
    expect(wrapper.emitted("remove")[0][0]).toBe(mockCartItem.productId);
  });
});
