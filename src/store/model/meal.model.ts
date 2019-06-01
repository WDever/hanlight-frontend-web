export interface MealItem {
  date: number;
  detail: string;
}

export interface MealModel {
  mealStatus: 'none' | 'pending' | 'success' | 'failure';
  mealOrderStatus: 'none' | 'pending' | 'success' | 'failure';
  mealList: MealItem[];
  mealOrder: string;
}
