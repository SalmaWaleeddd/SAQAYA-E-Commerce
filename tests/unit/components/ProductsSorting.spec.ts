import { mount } from "@vue/test-utils";
import ProductsSorting from "@/components/product/ProductsSorting.vue";

// Mock the SORT_OPTIONS constant
jest.mock("@/constants/products", () => ({
  SORT_OPTIONS: [
    { label: "Default", value: "default", sortBy: null, order: null },
    {
      label: "Price: Low to High",
      value: "price-asc",
      sortBy: "price",
      order: "asc",
    },
    {
      label: "Price: High to Low",
      value: "price-desc",
      sortBy: "price",
      order: "desc",
    },
    {
      label: "Rating: High to Low",
      value: "rating-desc",
      sortBy: "rating",
      order: "desc",
    },
  ],
}));

describe("ProductsSorting.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ProductsSorting, {
      props: {
        currentSort: "default",
      },
    });
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  describe("Rendering", () => {
    it("renders all sort options", () => {
      const options = wrapper.findAll("option");
      expect(options.length).toBeGreaterThan(0);
      expect(options.length).toBe(4); // Based on mock above
    });

    it("has correct default selected value", () => {
      const select = wrapper.find("select");
      expect(select.element.value).toBe("default");
    });

    it("displays the correct label for each option", () => {
      const options = wrapper.findAll("option");
      const labels = options.map((opt: any) => opt.text());

      expect(labels).toContain("Default");
      expect(labels).toContain("Price: Low to High");
      expect(labels).toContain("Price: High to Low");
      expect(labels).toContain("Rating: High to Low");
    });

    it("renders the select element with correct label", () => {
      const label = wrapper.find(".products-sorting__label");
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe("Sort by:");
    });
  });

  describe("Events", () => {
    it("emits sort-change event when option selected", async () => {
      const select = wrapper.find("select");
      await select.setValue("price-asc");

      expect(wrapper.emitted("sort-change")).toBeTruthy();
      expect(wrapper.emitted("sort-change")[0][0]).toBe("price-asc");
    });

    it("emits sort-change event with correct value for each option", async () => {
      const select = wrapper.find("select");

      // Test each sort option
      const testCases = [
        { value: "price-asc", expected: "price-asc" },
        { value: "price-desc", expected: "price-desc" },
        { value: "rating-desc", expected: "rating-desc" },
        { value: "default", expected: "default" },
      ];

      for (const testCase of testCases) {
        await select.setValue(testCase.value);
        const lastEvent = wrapper.emitted("sort-change")?.pop();
        expect(lastEvent?.[0]).toBe(testCase.expected);
      }
    });

    it("emits sort-change event on user interaction", async () => {
      const select = wrapper.find("select");
      await select.trigger("change");

      expect(wrapper.emitted("sort-change")).toBeTruthy();
    });
  });

  describe("Props", () => {
    it("updates selected value when currentSort prop changes", async () => {
      await wrapper.setProps({ currentSort: "rating-desc" });
      const select = wrapper.find("select");
      expect(select.element.value).toBe("rating-desc");
    });

    it("handles invalid currentSort prop gracefully", async () => {
      // When invalid prop is passed, select should still work
      await wrapper.setProps({ currentSort: "invalid-value" });
      const select = wrapper.find("select");

      // Should still be able to change selection
      await select.setValue("price-asc");
      expect(wrapper.emitted("sort-change")).toBeTruthy();
    });

    it("maintains selected option when valid prop is provided", async () => {
      await wrapper.setProps({ currentSort: "price-desc" });
      const select = wrapper.find("select");
      expect(select.element.value).toBe("price-desc");
    });
  });

  describe("Accessibility", () => {
    it("has accessible label for screen readers", () => {
      const label = wrapper.find(".products-sorting__label");
      expect(label.exists()).toBe(true);

      const select = wrapper.find("select");
      expect(select.attributes("aria-label")).toBeUndefined(); // Label visible
    });

    it("select element is focusable", async () => {
      const select = wrapper.find("select");
      expect(select.attributes("tabindex")).toBeUndefined(); // Naturally focusable

      await select.trigger("focus");
      expect(select.element).toBe(document.activeElement);
    });
  });

  describe("Styling", () => {
    it("applies correct CSS classes", () => {
      const container = wrapper.find(".products-sorting");
      const label = wrapper.find(".products-sorting__label");
      const select = wrapper.find(".products-sorting__select");

      expect(container.exists()).toBe(true);
      expect(label.exists()).toBe(true);
      expect(select.exists()).toBe(true);
    });

    it("select element is not disabled by default", () => {
      const select = wrapper.find("select");
      expect(select.attributes("disabled")).toBeUndefined();
    });
  });
});
