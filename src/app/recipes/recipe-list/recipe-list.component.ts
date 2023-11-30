// recipe-list.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  selectedRecipe: Recipe;
  recipes: Recipe[];
  showIngredientsForm = false;
  showNewRecipeForm = false;
  newRecipeName: string;
  newRecipeDescription: string;
  newRecipeIngredients: Ingredient[] = []; // Initialize as an empty array
  newIngredientName = '';
  newIngredientAmount = 1;
  newImageURL = '';

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.recipeWasSelected.emit(recipe);
  }

  onNewRecipe() {
    // Show the new recipe form
    this.showNewRecipeForm = true;
  }

  onNewIngredient(){

    if (this.newIngredientName && this.newIngredientAmount) {
      this.newRecipeIngredients.push( new Ingredient(this.newIngredientName, this.newIngredientAmount));
      // Clear the form fields
      this.newIngredientName = '';
      this.newIngredientAmount = 1;
      this.showIngredientsForm = true;

      // Set showIngredientsForm to true after adding the first ingredient
    }
  }

  onSubmitNewRecipe() {
    const newRecipe: Recipe = {
      name: this.newRecipeName,
      desc: this.newRecipeDescription,
      imagePath: this.newImageURL,
      ingredients: this.newRecipeIngredients
    };
    this.recipeService.addRecipe(newRecipe);
    this.recipes = this.recipeService.getRecipes(); // Update the recipes array

    this.showNewRecipeForm = false;

    console.log('Recipes in Component:', this.newRecipeIngredients);
    // Clear form fields after adding the recipe
    this.newRecipeName = '';
    this.newRecipeDescription = '';
    this.newRecipeIngredients = [];
    this.newImageURL = '';
  }
}
