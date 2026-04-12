export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  discount?: number;
  img: string;
  stars: number;
  reviews: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  img: string;
}
