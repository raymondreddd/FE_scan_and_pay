export interface TProduct {
  id: string;
  name: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  isVeg: boolean;
  categoryId: string | null;
}

export interface TProductCreate {
  name: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  isVeg: boolean;
  categoryId: string | null;
}
