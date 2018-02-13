import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Mixed pepper crusted steak with mushroom salad',
    'Keep summer cooking easy with this clever pepper-crusted steak and salad meal.',
    'http://img.taste.com.au/-OoAuH3l/w643-h428-cfill-q90/taste/2016/11/mixed-pepper-crusted-steak-with-mushroom-salad-87602-1.jpeg'),
    new Recipe('Pasta a la Italian',
    'Some tasty Italian Pasta to make your mouth water.',
    'https://cdn.pixabay.com/photo/2017/11/11/10/07/pasta-2938710_960_720.jpg')
  ];

  @Output() recipeSelectedChanged = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelectedChanged(recipe: Recipe) {
    this.recipeSelectedChanged.emit(recipe);
  }
}
