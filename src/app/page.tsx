import AddProductForm from '@/components/AddProductForm';
import ProductList from '@/components/ProductList';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-gray-900'>
              🛒 E-Commerce Digital Jabar Store
            </h1>
            <p className='mt-2 text-gray-600'>
              Aplikasi Latihan Pertemuan Ke-6 State Management Global Dengan
              Redux
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Layout Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Sidebar - Form Tambah Produk (Komponen A) */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8'>
              <AddProductForm />
            </div>
          </div>

          {/* Main Content - Daftar Produk (Komponen B) */}
          <div className='lg:col-span-2'>
            <ProductList />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-white border-t mt-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='text-center text-gray-500 text-sm'>
            <p>E-Commerce Digital Jabar Store</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
