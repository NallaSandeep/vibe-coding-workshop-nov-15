import ShopifyClient from '../shopify/client';
import { ShopifyAuth } from '../types';

interface GetProductsArgs {
  limit?: number;
  page_info?: string;
}

export default async function getProducts(auth: ShopifyAuth, args: GetProductsArgs) {
  const { limit = 10, page_info } = args;
  let path = `/products.json?limit=${limit}`;

  if (page_info) {
    path += `&page_info=${page_info}`;
  }

  const client = new ShopifyClient(auth);
  return await client.get(path);
}
