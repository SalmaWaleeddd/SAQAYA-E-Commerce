export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  tags: string[];
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  q?: string | null;
  limit?: number | null;
  skip?: number | null;
  select?: string | null;
  category?: string | null;
  sortBy?: string | null;
  order?: "asc" | "desc" | null;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface PaginationState {
  skip: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  pagination: PaginationState;
  filters: ProductFilters;
  categories: string[];
  error: string | null;
}
