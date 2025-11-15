import ShopifyClient from '../shopify/client';
import { ShopifyAuth } from '../types';

interface GetProductArgs {
  id: string;
}

export default async function getProduct(auth: ShopifyAuth, args: GetProductArgs) {
  const { id } = args;
  const client = new ShopifyClient(auth);
  return await client.get(`/products/${id}.json`);
}
