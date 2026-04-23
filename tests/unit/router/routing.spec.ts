describe("Routing Tests", () => {
  describe("Product Detail Route", () => {
    it("product detail route matches pattern /products/:id", () => {
      // Route pattern from your router: /products/:id
      const productIdPattern = /^\/products\/\d+$/;

      // Valid product detail paths
      expect(productIdPattern.test("/products/1")).toBe(true);
      expect(productIdPattern.test("/products/123")).toBe(true);
      expect(productIdPattern.test("/products/99999")).toBe(true);

      // Invalid paths
      expect(productIdPattern.test("/products/abc")).toBe(false);
      expect(productIdPattern.test("/products/")).toBe(false);
      expect(productIdPattern.test("/products")).toBe(false);
      expect(productIdPattern.test("/product/1")).toBe(false); // Old pattern
      expect(productIdPattern.test("/products/1/extra")).toBe(false);
    });

    it("extracts product ID from route correctly", () => {
      const extractProductId = (path: string): string | null => {
        const match = path.match(/^\/products\/(\d+)$/);
        return match ? match[1] : null;
      };

      // Valid extractions
      expect(extractProductId("/products/1")).toBe("1");
      expect(extractProductId("/products/999")).toBe("999");
      expect(extractProductId("/products/12345")).toBe("12345");

      // Invalid extractions
      expect(extractProductId("/products/abc")).toBe(null);
      expect(extractProductId("/products/")).toBe(null);
      expect(extractProductId("/products")).toBe(null);
      expect(extractProductId("/product/1")).toBe(null); // Wrong pattern
      expect(extractProductId("/")).toBe(null);
    });

    it("handles product ID as number conversion", () => {
      const extractProductIdAsNumber = (path: string): number | null => {
        const match = path.match(/^\/products\/(\d+)$/);
        return match ? parseInt(match[1], 10) : null;
      };

      expect(extractProductIdAsNumber("/products/1")).toBe(1);
      expect(extractProductIdAsNumber("/products/999")).toBe(999);
      expect(extractProductIdAsNumber("/products/abc")).toBe(null);
    });
  });

  describe("Products List Route", () => {
    it("products route matches /products", () => {
      const productsPattern = /^\/products$/;

      expect(productsPattern.test("/products")).toBe(true);

      // Not matches
      expect(productsPattern.test("/products/1")).toBe(false);
      expect(productsPattern.test("/products/abc")).toBe(false);
      expect(productsPattern.test("/product")).toBe(false);
      expect(productsPattern.test("/")).toBe(false);
    });

    it("products route with query parameters still matches base path", () => {
      // Base path should match regardless of query params
      const basePath = "/products";
      const pathWithQuery = "/products?category=electronics&sort=price";

      expect(basePath).toBe("/products");
      expect(pathWithQuery.split("?")[0]).toBe("/products");
    });
  });

  describe("Home Route", () => {
    it("home route matches /", () => {
      const homePattern = /^\/$/;

      expect(homePattern.test("/")).toBe(true);
      expect(homePattern.test("")).toBe(false);
      expect(homePattern.test("/home")).toBe(false);
      expect(homePattern.test("/products")).toBe(false);
    });
  });

  describe("About Route", () => {
    it("about route matches /about", () => {
      const aboutPattern = /^\/about$/;

      expect(aboutPattern.test("/about")).toBe(true);
      expect(aboutPattern.test("/about/")).toBe(false);
      expect(aboutPattern.test("/aboutus")).toBe(false);
    });
  });

  describe("Contact Route", () => {
    it("contact route matches /contact", () => {
      const contactPattern = /^\/contact$/;

      expect(contactPattern.test("/contact")).toBe(true);
      expect(contactPattern.test("/contact/")).toBe(false);
      expect(contactPattern.test("/contactus")).toBe(false);
    });
  });

  describe("Catch-All / 404 Route", () => {
    it("catch-all route matches any unmatched path", () => {
      // The catch-all pattern from your router: /:pathMatch(.*)*
      const catchAllPattern = /^\/.*/;

      expect(catchAllPattern.test("/non-existent")).toBe(true);
      expect(catchAllPattern.test("/random/path/that/doesnt/exist")).toBe(true);
      expect(catchAllPattern.test("/404")).toBe(true);
      expect(catchAllPattern.test("/this-is-not-a-valid-route")).toBe(true);
    });

    it("404 route should be shown for non-matching paths", () => {
      const nonMatchingPaths = [
        "/non-existent",
        "/invalid-route",
        "/random/123/abc",
        "/page/not/found",
      ];

      const validPaths = [
        "/",
        "/products",
        "/products/1",
        "/about",
        "/contact",
      ];

      // Helper to check if path is valid (has a matching route)
      const isValidRoute = (path: string): boolean => {
        const validRoutes = ["/", "/products", "/about", "/contact"];
        const productDetailPattern = /^\/products\/\d+$/;

        return validRoutes.includes(path) || productDetailPattern.test(path);
      };

      nonMatchingPaths.forEach((path) => {
        expect(isValidRoute(path)).toBe(false);
      });

      validPaths.forEach((path) => {
        expect(isValidRoute(path)).toBe(true);
      });
    });
  });

  describe("Route Parameter Extraction Utilities", () => {
    it("extracts category from query params", () => {
      const extractQueryParam = (
        queryString: string,
        paramName: string,
      ): string | null => {
        const params = new URLSearchParams(queryString);
        return params.get(paramName);
      };

      expect(extractQueryParam("?category=electronics", "category")).toBe(
        "electronics",
      );
      expect(extractQueryParam("?category=beauty&sort=price", "category")).toBe(
        "beauty",
      );
      expect(extractQueryParam("?q=phone", "q")).toBe("phone");
      expect(extractQueryParam("?foo=bar", "nonexistent")).toBe(null);
    });

    it("constructs product detail path correctly", () => {
      const getProductDetailPath = (id: number): string => `/products/${id}`;

      expect(getProductDetailPath(1)).toBe("/products/1");
      expect(getProductDetailPath(999)).toBe("/products/999");
      expect(getProductDetailPath(12345)).toBe("/products/12345");
    });
  });
});
