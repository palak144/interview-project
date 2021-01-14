import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../models/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit ,OnDestroy {

  ingredients: Ingredient[];
  ingredientAdded : Ingredient
  private idChangeSub :Subscription
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
     this.ingredients = this.shoppingListService.getShoppingList();
    this.idChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
       (newIngredients : Ingredient[])=>{
         this.ingredients=newIngredients
       }
     )
  }
  ngOnDestroy(){
    this.idChangeSub.unsubscribe();
  }
  onClick(index : number){
  this.shoppingListService.startedEditing.next(index)
  }
}
