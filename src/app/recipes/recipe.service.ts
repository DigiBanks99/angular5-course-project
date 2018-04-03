import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Mixed pepper crusted steak with mushroom salad',
    'Keep summer cooking easy with this clever pepper-crusted steak and salad meal.',
    'http://img.taste.com.au/-OoAuH3l/w643-h428-cfill-q90/taste/2016/11/mixed-pepper-crusted-steak-with-mushroom-salad-87602-1.jpeg',
    [
      new Ingredient('Beef Fillet', 1),
      new Ingredient('Pepper', 5),
      new Ingredient('Mushroom', 20)
    ]),
    new Recipe('Pasta a la Italian',
    'Some tasty Italian Pasta to make your mouth water.',
    'https://cdn.pixabay.com/photo/2017/11/11/10/07/pasta-2938710_960_720.jpg',
    [
      new Ingredient('Tagliatelle', 200),
      new Ingredient('Basil', 5),
      new Ingredient('Mozzarella Cheese', 3)
    ])
  ];

  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // same as cloning the recipes array
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  sendToShoppingList(ingredients: Ingredient[]) {
    if (ingredients != null && ingredients.length > 0) {
      this.shoppingListService.addIngredients(ingredients);
    }
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.emitRecipeChanged();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.emitRecipeChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.emitRecipeChanged();
  }

  emitRecipeChanged() {
    this.recipeChanged.next(this.recipes.slice());
  }
}
