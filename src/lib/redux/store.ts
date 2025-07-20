import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

// Membuat Redux store dengan configureStore dari Redux Toolkit
export const store = configureStore({
  reducer: {
    // Menambahkan product reducer ke store
    products: productReducer,
  },

  // Middleware default dari Redux Toolkit sudah termasuk:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Konfigurasi middleware bisa ditambahkan di sini jika diperlukan
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

// Infer tipe RootState dari store
export type RootState = ReturnType<typeof store.getState>;

// Infer tipe AppDispatch dari store
export type AppDispatch = typeof store.dispatch;

// Export store sebagai default
export default store;
