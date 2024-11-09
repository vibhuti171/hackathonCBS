import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeProducts.getProducts(filters);
  // const data = {
  //   success: true,
  //   time: new Date().toISOString(),
  //   message: 'Sample expense data for testing and learning purposes',
  //   total_products: 3,
  //   offset: 0,
  //   limit: 10,
  //   products: [
  //     {
  //       id: 1,
  //       name: 'Travel',
  //       description: 'Flight tickets to New York',
  //       created_at: '2024-10-05',
  //       price: 300.5,
  //       currency: 'USD',
  //       photo_url: 'https://example.com/photo1.jpg',
  //       category: 'Travel',
  //       updated_at: '2024-10-06'
  //     },
  //     {
  //       id: 2,
  //       name: 'Food',
  //       description: 'Groceries for the month',
  //       created_at: '2024-10-10',
  //       price: 120.75,
  //       currency: 'USD',
  //       photo_url: 'https://example.com/photo1.jpg',
  //       category: 'Travel',
  //       updated_at: '2024-10-06'
  //     },
  //     {
  //       id: 3,
  //       name: 'Entertainment',
  //       description: 'Concert tickets',
  //       created_at: '2024-10-15',
  //       price: 150.0,
  //       currency: 'USD',
  //       photo_url: 'https://example.com/photo1.jpg',
  //       category: 'Travel',
  //       updated_at: '2024-10-06'
  //     }
  //   ]
  // };
  
  const totalProducts = data.total_products;
  const products: Product[] = data.products;

  return (
    <ProductTable
      columns={columns}
      data={products}
      totalItems={totalProducts}
    />
  );
}
