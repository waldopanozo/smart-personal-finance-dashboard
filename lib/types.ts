export type ExpenseCategory =
  | 'Comida'
  | 'Transporte'
  | 'Vivienda'
  | 'Ocio'
  | 'Salud'
  | 'Otros';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  note: string;
  date: string;
}
