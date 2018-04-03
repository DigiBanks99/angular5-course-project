import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  getIngredientsControls(): FormControl[] {
    return <FormControl[]>(<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  getIngredientsControl(i: number): AbstractControl {
    return (<FormArray>this.recipeForm.get('ingredients')).controls[i];
  }

  getErrorIngredientsCtrl(i: number, ctrlName: string) {
    const errors = this.getIngredientsControl(i).get(ctrlName).errors;
    return errors;
  }

  inErrorNameCtrl(): boolean {
    const nameCtrl = this.recipeForm.get('name');
    if (!nameCtrl)
      return false;
    return nameCtrl.touched && !nameCtrl.valid;
  }

  inErrorImagePathCtrl(): boolean {
    const imagePathCtrl = this.recipeForm.get('imagePathCtrl');
    if (!imagePathCtrl)
      return false;
    return imagePathCtrl.touched && !imagePathCtrl.valid;
  }

  inErrorDescriptionCtrl(): boolean {
    const descriptionCtrl = this.recipeForm.get('descriptionCtrl');
    if (!descriptionCtrl)
      return false;
    return descriptionCtrl.touched && !descriptionCtrl.valid;
  }

  inErrorIngredientCtrl(i): boolean {
    const ingredientCtrl = (<FormArray>this.recipeForm.get('ingredients')).controls[i];
    if (!ingredientCtrl)
      return false;
    return ingredientCtrl.touched && !ingredientCtrl.valid;
  }

  onDeleteIngredient(index: number) {
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.getIngredient(true, null));
  }

  onSubmit() {
    const recipe: Recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      if (recipe != null) {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        if (recipe['ingredients']) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(this.getIngredient(false, ingredient));
          }
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  private getIngredient(isNew: boolean, ingredient: Ingredient): FormGroup {
    let nameValue: string;
    let amountValue: number;

    if (isNew) {
      nameValue = null;
      amountValue = null;
    } else {
      if (ingredient === null) {
        throw new Error('ingredient is required');
      }

      nameValue = ingredient.name;
      amountValue = ingredient.amount;
    }

    return new FormGroup({
      'name': new FormControl(nameValue, Validators.required),
      'amount': new FormControl(amountValue, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  private navigateBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
