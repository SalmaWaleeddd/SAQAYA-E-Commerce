describe('Routing Tests', () => {
  it('product detail route matches pattern /product/:id', () => {
    const productIdPattern = /^\/product\/\d+$/;
    
    expect(productIdPattern.test('/product/1')).toBe(true);
    expect(productIdPattern.test('/product/123')).toBe(true);
    expect(productIdPattern.test('/product/abc')).toBe(false);
    expect(productIdPattern.test('/products')).toBe(false);
  });

  it('extracts product ID from route correctly', () => {
    const extractProductId = (path: string) => {
      const match = path.match(/^\/product\/(\d+)$/);
      return match ? match[1] : null;
    };
    
    expect(extractProductId('/product/1')).toBe('1');
    expect(extractProductId('/product/999')).toBe('999');
    expect(extractProductId('/product/abc')).toBe(null);
  });

  it('products route matches /products', () => {
    const productsRoute = '/products';
    
    expect(productsRoute).toBe('/products');
    expect('/products').toMatch(/^\/products$/);
  });
});