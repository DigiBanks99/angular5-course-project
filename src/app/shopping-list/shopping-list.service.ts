import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Beef', 1),
    new Ingredient('Salt', 10),
    new Ingredient('Carrots', 3)
  ];

  public ingredientsChanged = new Subject<Ingredient[]>();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // Effectively clones the array (to avoid returning a reference to the array)
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
