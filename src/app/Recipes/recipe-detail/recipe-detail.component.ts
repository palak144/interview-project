import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe;
 id : number
  constructor(private recipeService : RecipeService, private route:ActivatedRoute , private router : Router,) { }

  ngOnInit(){
    console.log("recipeDetail",this.recipe)
     this.route.params.subscribe(
       (id:Params)=>{
       this.id = +id['id']
       this.recipe =  this.recipeService.getRecipe(this.id)
       }
     ) }
 
     onEditRecipe(){
      this.router.navigate(['edit'], {relativeTo: this.route})
      //this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route})
    }
    onDelete(){
      this.recipeService.deleteRecipe(this.id)
      this.router.navigate(["/recipes"])
    }
    toShoppingList(){
      this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)

    }
    
}

