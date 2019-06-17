export interface MealItem {
  month: number;
  date: number;
  detail: string;
}

export interface MealModel {
  mealWeekList: MealItem[];
  mealMonthList: MealItem[];
  mealOrder: string;
  getMealWeekStatus: 'none' | 'pending' | 'success' | 'failure';
  getMealMonthStatus: 'none' | 'pending' | 'success' | 'failure';
  getMealOrderStatus: 'none' | 'pending' | 'success' | 'failure';
}
