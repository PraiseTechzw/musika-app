export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number | null;
  buying_price: number;
  selling_price: number;
  quantity: number;
  image_path?: string;
  date_added: string;
  notes?: string;
}

export interface Sale {
  id: number;
  product_id: number;
  quantity: number;
  selling_price: number;
  date: string;
  profit: number;
}
