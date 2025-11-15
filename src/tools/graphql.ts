import ShopifyClient from '../shopify/client';
import { ShopifyAuth } from '../types';

interface GraphqlArgs {
  query: string;
  variables?: any;
}

export default async function graphql(auth: ShopifyAuth, args: GraphqlArgs) {
  const { query, variables } = args;
  const client = new ShopifyClient(auth);
  return await client.graphql(query, variables);
}
