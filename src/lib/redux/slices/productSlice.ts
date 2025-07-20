import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState, ProductFormData } from '../types';

// State awal untuk produk
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Membuat slice untuk produk menggunakan createSlice dari Redux Toolkit
const productSlice = createSlice({
  name: 'products', // Nama slice
  initialState, // State awal
  reducers: {
    // Action untuk menambah produk baru
    addProduct: (state, action: PayloadAction<ProductFormData>) => {
      // Membuat produk baru dengan ID unik dan timestamp
      const newProduct: Product = {
        id: Date.now().toString(), // Menggunakan timestamp sebagai ID sederhana
        ...action.payload, // Spread data dari form
        createdAt: new Date().toISOString(), // Timestamp saat dibuat
      };

      // Menambahkan produk baru ke array products
      state.products.push(newProduct);
      state.error = null;
    },

    // Action untuk menghapus produk berdasarkan ID
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    // Action untuk mengupdate produk
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // Action untuk set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Action untuk set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Action untuk clear semua produk (untuk testing)
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
    },
  },
});

// Export actions untuk digunakan di komponen
export const {
  addProduct,
  removeProduct,
  updateProduct,
  setLoading,
  setError,
  clearProducts,
} = productSlice.actions;

// Export reducer untuk digunakan di store
export default productSlice.reducer;
