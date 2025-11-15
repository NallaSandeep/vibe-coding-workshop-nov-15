import ShopifyClient from '../shopify/client';
import { ShopifyAuth } from '../types';

interface GetArgs {
  path: string;
}

export default async function get(auth: ShopifyAuth, args: GetArgs) {
  const { path } = args;
  const client = new ShopifyClient(auth);
  return await client.get(path);
}
