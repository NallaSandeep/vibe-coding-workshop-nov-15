export interface ShopifyObject {
  id: number;
}

export interface Product extends ShopifyObject {
  title: string;
  vendor: string;
  product_type: string;
  status: 'active' | 'archived' | 'draft';
}

export interface Order extends ShopifyObject {
  name: string;
  total_price: string;
  financial_status: 'pending' | 'authorized' | 'paid' | 'refunded' | 'voided';
}
