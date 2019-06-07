export interface MealItem {
  date: number;
  detail: string;
}

export interface MealModel {
  mealList: MealItem[];
  mealOrder: string;
  getMealStatus: 'none' | 'pending' | 'success' | 'failure';
  getMealOrderStatus: 'none' | 'pending' | 'success' | 'failure';
}
