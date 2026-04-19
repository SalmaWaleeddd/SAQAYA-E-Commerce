import { shallowMount } from "@vue/test-utils";
import BreadCrumb from "@/components/common/BreadCrumb.vue";

describe("BreadCrumb.vue", () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it("does not render on homepage", () => {
    wrapper = shallowMount(BreadCrumb as any, {
      mocks: {
        $route: { path: "/" },
      },
    });
    expect(wrapper.find(".bread-crumb").exists()).toBe(false);
  });

  it("renders breadcrumbs on subpages", () => {
    wrapper = shallowMount(BreadCrumb as any, {
      mocks: {
        $route: { path: "/products" },
      },
    });
    expect(wrapper.find(".bread-crumb").exists()).toBe(true);
  });

  it("formats category names correctly", () => {
    wrapper = shallowMount(BreadCrumb as any, {
      mocks: {
        $route: { path: "/products" },
      },
    });
    expect(wrapper.vm.formatName("beauty-products")).toBe("Beauty products");
    expect(wrapper.vm.formatName("about-us")).toBe("About us");
  });

  it("handles 404 error page correctly", () => {
    wrapper = shallowMount(BreadCrumb as any, {
      mocks: {
        $route: { path: "/404" },
      },
    });
    expect(wrapper.vm.formatName("404-error")).toBe("404 Error");
  });

  it("detects product ID segments", () => {
    wrapper = shallowMount(BreadCrumb as any, {
      mocks: {
        $route: { path: "/product/123" },
      },
    });
    expect(wrapper.vm.isProductId("123")).toBe(true);
    expect(wrapper.vm.isProductId("abc")).toBe(false);
    expect(wrapper.vm.isProductId("product")).toBe(false);
  });
});
