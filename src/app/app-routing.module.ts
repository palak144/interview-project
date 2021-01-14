import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { RecipesComponent } from './Recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeItemComponent } from './Recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './Recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './Recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  { path: '', redirectTo : '/recipes', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipes', component: RecipesComponent,children:[
    {path:'', component:RecipeStartComponent},
    {path:'new', component:RecipeEditComponent},
      {path:':id', component:RecipeDetailComponent},
      {path:':id/edit', component:RecipeEditComponent}


   ] },
  { path: 'shopping-list', component: ShoppingListComponent },


  // otherwise redirect to home component
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }