import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.css']
})
export class ShoppingListDetailComponent implements OnInit, OnDestroy {
  private editingSubscription: Subscription;
  private editMode: boolean;
  private editIndex: number;

  @ViewChild('f') shoppingListForm: NgForm;
  public editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
    this.editMode = false;
  }

  ngOnInit() {
    this.editingSubscription = this.shoppingListService.editingStarted.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIndex = index;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    );
  }

  hasErrorName(form: NgForm): boolean {
    if (form.controls['name'] === undefined)
      return;
    const nameCtrl = form.controls.name;
    return !nameCtrl.valid && nameCtrl.touched;
  }

  hasErrorCodeName(form: NgForm, errorCode: string): boolean {
    if (form.controls['name'] === undefined)
      return;
    const nameCtrl = form.controls.name;
    return nameCtrl.errors[errorCode];
  }

  hasErrorAmount(form: NgForm): boolean {
    if (form.controls['name'] === undefined)
      return;
    const amountCtrl = form.controls.amount;
    return !amountCtrl.valid && amountCtrl.touched;
  }

  hasErrorCodeAmount(form: NgForm, errorCode: string): boolean {
    if (form.controls['name'] === undefined)
      return;
    const amountCtrl = form.controls.amount;
    return amountCtrl.errors[errorCode];
  }

  addIngredient(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editIndex, newIngredient);
      this.reset(form);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

  deleteIngredient() {
    if (this.editIndex < 0)
      return;
    this.shoppingListService.deleteIngredient(this.editIndex);
  }

  reset(form: NgForm) {
    this.editIndex = -1;
    this.editMode = false;
    this.editItem = null;
    form.reset();
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
}
