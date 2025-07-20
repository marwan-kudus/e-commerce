'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addProduct } from '@/lib/redux/slices/productSlice';
import { ProductFormData } from '@/lib/redux/types';

// Komponen AddProductForm - KOMPONEN A
export default function AddProductForm() {
  // Menggunakan custom hook useAppDispatch untuk mendapatkan dispatch function
  const dispatch = useAppDispatch();

  // State lokal untuk form data
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
    imageUrl: '',
  });

  // State untuk loading dan success message
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handler untuk mengubah input form
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validasi sederhana
      if (!formData.name || !formData.description || !formData.category) {
        alert('Mohon isi semua field yang wajib!');
        return;
      }

      if (formData.price <= 0 || formData.stock < 0) {
        alert('Harga harus lebih dari 0 dan stok tidak boleh negatif!');
        return;
      }

      // Dispatch action addProduct ke Redux store
      // Ini adalah bagian penting: komponen A mengubah state global
      dispatch(addProduct(formData));

      // Reset form setelah berhasil
      setFormData({
        name: '',
        price: 0,
        description: '',
        category: '',
        stock: 0,
        imageUrl: '',
      });

      // Tampilkan pesan sukses
      setSuccessMessage('Produk berhasil ditambahkan!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Terjadi kesalahan saat menambah produk');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>
        Tambah Produk Baru
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Nama Produk */}
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Nama Produk *
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Masukkan nama produk'
            required
          />
        </div>

        {/* Harga */}
        <div>
          <label
            htmlFor='price'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Harga (Rp) *
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={formData.price}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='0'
            min='1'
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label
            htmlFor='category'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Kategori *
          </label>
          <select
            id='category'
            name='category'
            value={formData.category}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          >
            <option value=''>Pilih kategori</option>
            <option value='elektronik'>Elektronik</option>
            <option value='fashion'>Fashion</option>
            <option value='makanan'>Makanan</option>
            <option value='buku'>Buku</option>
            <option value='olahraga'>Olahraga</option>
            <option value='lainnya'>Lainnya</option>
          </select>
        </div>

        {/* Stok */}
        <div>
          <label
            htmlFor='stock'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Stok
          </label>
          <input
            type='number'
            id='stock'
            name='stock'
            value={formData.stock}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='0'
            min='0'
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Deskripsi *
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Deskripsi produk'
            required
          />
        </div>

        {/* URL Gambar */}
        <div>
          <label
            htmlFor='imageUrl'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            URL Gambar (opsional)
          </label>
          <input
            type='url'
            id='imageUrl'
            name='imageUrl'
            value={formData.imageUrl}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='https://example.com/image.jpg'
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSubmitting ? 'Menambahkan...' : 'Tambah Produk'}
        </button>
      </form>
    </div>
  );
}
