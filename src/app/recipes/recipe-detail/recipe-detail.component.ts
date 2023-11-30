import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipesService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {this.activatedRoute.params.subscribe(
    (params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    }
  );}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);    
  }

  onDeleteRecipe(){
    console.log(this.id)
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);

  }

}