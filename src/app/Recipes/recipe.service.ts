import { Recipe } from '../models/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
recipesChanged = new Subject<Recipe[]>()
   private recipes : Recipe[] = [
        new Recipe('Pasta'
        ,"Pasta is love",
        'https://thumbs.dreamstime.com/b/pasta-tomato-18319793.jpg',
        [
            new Ingredient('Pasta',1),
          new Ingredient('Tomato',2),
           new Ingredient('Onion',2)
        ]),
        new Recipe('Indori Poha',
        "Perfect Indian Snack",
        'https://thumbs.dreamstime.com/b/indian-vegetarian-glutenfree-snack-poha-indian-street-food-snack-poha-also-served-breakfast-madhya-pradesh-112711698.jpg',
        [ new Ingredient('Poha',1),
          new Ingredient('Potato',2),
           new Ingredient('Onion',2)])
      ]
    constructor( private shoppingListService : ShoppingListService) { }
    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(index:number){
      return this.recipes.slice()[index]
    }
    addIngredientToShoppingList(ingredients : Ingredient[]){
         this.shoppingListService.addIngredients(ingredients)
    }
    addRecipe(recipe:Recipe){
this.recipes.push(recipe)
this.recipesChanged.next(this.recipes.slice())
    }
    updateRecipe(index:number, newRecipe: Recipe){
this.recipes[index] = newRecipe
this.recipesChanged.next(this.recipes.slice())

    }

    deleteRecipe(index:number){
      debugger
      this.recipes.splice(index,1)
      this.recipesChanged.next(this.recipes.slice())

    }
}