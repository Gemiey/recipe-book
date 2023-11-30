import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipesService {
  recipeChanged = new EventEmitter<Recipe[]>()
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Recipe 1', 'Testing with this first recipe', 'https://img.taste.com.au/VGK3b1i8/taste/2017/05/the-perfect-churros1980x1320-127049-1.jpg', [
        new Ingredient('meat', 1),
        new Ingredient('fries', 20)
      ]),
    new Recipe ('Recipe 2', 'another test','https://img.taste.com.au/VGK3b1i8/taste/2017/05/the-perfect-churros1980x1320-127049-1.jpg',[
        new Ingredient('buns', 1),
        new Ingredient('meat', 1)
  
      ]),

  ];

  constructor(private shoppingListService: ShoppingListService) { }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.emit(this.recipes.slice());
    console.log(this.recipes);
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}