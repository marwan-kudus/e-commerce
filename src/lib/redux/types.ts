export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl?: string;
  createdAt: string;
}

// Interface untuk state produk di Redux store
export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Type untuk form input produk baru
export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl?: string;
}
