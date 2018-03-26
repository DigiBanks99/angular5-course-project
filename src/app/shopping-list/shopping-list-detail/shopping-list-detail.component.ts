import { Component, OnInit} from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.css']
})
export class ShoppingListDetailComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
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
    this.shoppingListService.addIngredient(new Ingredient(form.value.name, form.value.amount));
  }
}
