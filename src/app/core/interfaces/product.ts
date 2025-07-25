export interface Product {
  slice(arg0: number, arg1: number): Product[];
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string; 
  discount?: number;
  popular?: boolean;
  onSale?: boolean;
  quantity?: number; 
}
