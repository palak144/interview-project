import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[]= [
        new Ingredient('Apple', 3),
        new Ingredient('Tomatoes', 5)
      ];

    constructor() { }

    getShoppingList(){
        return this.ingredients.slice();
    }
    getIngredient(index : number){
return this.ingredients[index]
    }
    onAdd(ingredient : Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    addIngredients(ingredients : Ingredient[]){
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.next(this.ingredients.slice())
    }
    updateIngredient(index:number,newIngredient : Ingredient){
      
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())

    }
    deleteIngredient(index:number){
      this.ingredients.splice(index,1)
      this.ingredientsChanged.next(this.ingredients.slice())

    }
}