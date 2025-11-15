import ShopifyClient from '../shopify/client';
import { ShopifyAuth } from '../types';

export default async function getShopDetails(auth: ShopifyAuth) {
  const client = new ShopifyClient(auth);
  return await client.get('/shop.json');
}
