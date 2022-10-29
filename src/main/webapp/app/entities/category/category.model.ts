import { IProduct } from 'app/entities/product/product.model';
import { Categories } from 'app/entities/enumerations/categories.model';

export interface ICategory {
  id?: number;
  category?: Categories;
  products?: IProduct[];
}

export class Category implements ICategory {
  constructor(public id?: number, public category?: Categories, public products?: IProduct[]) {}
}

export function getCategoryIdentifier(category: ICategory): number | undefined {
  return category.id;
}
