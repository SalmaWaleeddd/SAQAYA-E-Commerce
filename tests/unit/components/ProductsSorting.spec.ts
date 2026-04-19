import { mount, Wrapper } from "@vue/test-utils";
import ProductsSorting from "@/components/product/ProductsSorting.vue";

describe("ProductsSorting.vue", () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it("renders all sort options", () => {
    wrapper = mount(ProductsSorting as any, {
      propsData: { currentSort: "default" },
    });

    const options = wrapper.findAll("option");
    const optionLabels = options.wrappers.map((opt: Wrapper<any>) =>
      opt.text(),
    );
    expect(optionLabels).toContain("Default");
    expect(optionLabels).toContain("Price: Low to High");
    expect(optionLabels).toContain("Price: High to Low");
    expect(optionLabels).toContain("Highest Rating");
    expect(optionLabels).toContain("Lowest Rating");
    expect(optionLabels).toContain("Best Discount");
  });

  it("has correct default selected value", () => {
    wrapper = mount(ProductsSorting as any, {
      propsData: { currentSort: "default" },
    });

    const select = wrapper.find("select");
    expect(select.element.value).toBe("default");
  });

  it("emits sort-change event when option selected", async () => {
    wrapper = mount(ProductsSorting as any, {
      propsData: { currentSort: "default" },
    });

    const select = wrapper.find("select");
    await select.setValue("price-asc");

    expect(wrapper.emitted("sort-change")).toBeTruthy();
    expect(wrapper.emitted("sort-change")[0][0]).toBe("price-asc");
  });

  it("updates selected value when currentSort prop changes", async () => {
    wrapper = mount(ProductsSorting as any, {
      propsData: { currentSort: "default" },
    });

    await wrapper.setProps({ currentSort: "rating-desc" });
    const select = wrapper.find("select");
    expect(select.element.value).toBe("rating-desc");
  });
});
