// services/product.service.ts
import { ProductFilters, ProductsResponse, Product } from '@/types/product'
import { httpClient } from './http'



class ProductService {
  private readonly baseUrl = '/products'

  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params: Record<string, any> = {}
    
    if (filters.limit !== undefined) params.limit = filters.limit
    if (filters.skip !== undefined) params.skip = filters.skip
    if (filters.select) params.select = filters.select
    if (filters.sortBy) params.sortBy = filters.sortBy
    if (filters.order) params.order = filters.order
    if (filters.q) params.q = filters.q
    
    const response = await httpClient.get<ProductsResponse>(this.baseUrl, { params })
    return response
  }

  async getProductById(id: number): Promise<Product> {
    return httpClient.get<Product>(`${this.baseUrl}/${id}`)
  }

  async searchProducts(query: string, limit?: number, skip?: number): Promise<ProductsResponse> {
    const params: Record<string, any> = { q: query }
    if (limit) params.limit = limit
    if (skip) params.skip = skip
    return httpClient.get<ProductsResponse>(`${this.baseUrl}/search`, { params })
  }

  async getCategoryList(): Promise<string[]> {
    return httpClient.get<string[]>(`${this.baseUrl}/category-list`)
  }

  async getProductsByCategory(categorySlug: string, limit?: number, skip?: number): Promise<ProductsResponse> {
    const params: Record<string, any> = {}
    if (limit) params.limit = limit
    if (skip) params.skip = skip
    return httpClient.get<ProductsResponse>(`${this.baseUrl}/category/${categorySlug}`, { params })
  }

  getDiscountedPrice(product: Product): number {
    if (!product.discountPercentage) return product.price
    return Number((product.price * (1 - product.discountPercentage / 100)).toFixed(2))
  }
}

export const productService = new ProductService()
export default productService