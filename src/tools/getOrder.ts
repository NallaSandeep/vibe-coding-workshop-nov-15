import ShopifyClient from '../shopify/client';
import { ShopifyAuth } from '../types';

interface GetOrderArgs {
  id: string;
}

export default async function getOrder(auth: ShopifyAuth, args: GetOrderArgs) {
  const { id } = args;
  const client = new ShopifyClient(auth);
  return await client.get(`/orders/${id}.json`);
}
