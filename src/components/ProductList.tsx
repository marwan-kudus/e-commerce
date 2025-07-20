'use client';

import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { removeProduct } from '@/lib/redux/slices/productSlice';
import { Product } from '@/lib/redux/types';

// Komponen ProductCard untuk menampilkan satu produk
function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  // Handler untuk menghapus produk
  const handleDelete = () => {
    if (
      confirm(`Apakah Anda yakin ingin menghapus produk "${product.name}"?`)
    ) {
      dispatch(removeProduct(product.id));
    }
  };

  // Format harga ke Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  // Format tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow'>
      {/* Header dengan nama dan harga */}
      <div className='flex justify-between items-start mb-2'>
        <h3 className='text-lg font-semibold text-gray-800 truncate'>
          {product.name}
        </h3>
        <span className='text-lg font-bold text-green-600 ml-2'>
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Kategori dan stok */}
      <div className='flex justify-between items-center mb-2'>
        <span className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
          {product.category}
        </span>
        <span
          className={`text-sm font-medium ${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          Stok: {product.stock}
        </span>
      </div>

      {/* Deskripsi */}
      <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
        {product.description}
      </p>

      {/* Gambar produk  */}
      {product.imageUrl && (
        <div className='mb-3'>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={128}
            className='w-full h-32 object-cover rounded-md'
          />
        </div>
      )}

      {/* Footer dengan tanggal dan tombol hapus */}
      <div className='flex justify-between items-center pt-2 border-t border-gray-100'>
        <span className='text-xs text-gray-500'>
          Dibuat: {formatDate(product.createdAt)}
        </span>
        <button
          onClick={handleDelete}
          className='text-red-600 hover:text-red-800 text-sm font-medium'
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

// Komponen ProductList - KOMPONEN B
export default function ProductList() {
  // Menggunakan useAppSelector untuk membaca data dari Redux store
  // Ini adalah bagian penting: komponen B membaca state global
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  // Statistik produk
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const categories = [...new Set(products.map((p) => p.category))];

  // Format total value
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  // Loading state
  if (loading) {
    return (
      <div className='flex justify-center items-center p-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        <span className='ml-2 text-gray-600'>Memuat produk...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto'>
      {/* Header dengan statistik */}
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Daftar Produk</h2>

        {/* Statistik */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
          <div className='bg-blue-50 p-4 rounded-lg'>
            <h3 className='text-sm font-medium text-blue-800'>Total Produk</h3>
            <p className='text-2xl font-bold text-blue-600'>{totalProducts}</p>
          </div>
          <div className='bg-green-50 p-4 rounded-lg'>
            <h3 className='text-sm font-medium text-green-800'>
              Total Nilai Stok
            </h3>
            <p className='text-lg font-bold text-green-600'>
              {formatPrice(totalValue)}
            </p>
          </div>
          <div className='bg-purple-50 p-4 rounded-lg'>
            <h3 className='text-sm font-medium text-purple-800'>Kategori</h3>
            <p className='text-2xl font-bold text-purple-600'>
              {categories.length}
            </p>
          </div>
        </div>
      </div>

      {/* Daftar produk */}
      {totalProducts === 0 ? (
        // Empty state
        <div className='text-center py-12'>
          <div className='text-gray-400 text-6xl mb-4'>📦</div>
          <h3 className='text-xl font-medium text-gray-600 mb-2'>
            Belum ada produk
          </h3>
          <p className='text-gray-500'>
            Tambahkan produk pertama menggunakan form di atas
          </p>
        </div>
      ) : (
        // Grid produk
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
