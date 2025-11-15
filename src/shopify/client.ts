import axios, { AxiosInstance } from 'axios';
import { ShopifyAuth } from '../types';

class ShopifyClient {
  private client: AxiosInstance;

  constructor(auth: ShopifyAuth) {
    const { store_url, access_token } = auth;

    if (!store_url || !access_token) {
      throw new Error('Missing Shopify store URL or access token.');
    }

    this.client = axios.create({
      baseURL: `${store_url}/admin/api/2023-10`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': access_token,
      },
    });
  }

  async get(path: string) {
    try {
      const response = await this.client.get(path);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async graphql(query: string, variables: any = {}) {
    try {
      const response = await this.client.post('/graphql.json', {
        query,
        variables,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Shopify API Error:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(error.response?.data?.errors || 'Shopify API request failed.');
    } else {
      console.error('Unknown Error:', error);
      throw new Error('An unknown error occurred.');
    }
  }
}

export default ShopifyClient;
