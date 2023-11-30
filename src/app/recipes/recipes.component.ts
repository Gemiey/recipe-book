import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  styleUrls: ['./recipes.component.scss'],
  templateUrl: './recipes.component.html',
  providers: [RecipesService]
})

export class RecipesComponent implements OnInit{
  selectedRecipe: Recipe;
  recipeIndex: number;

  constructor(private recipeService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }
}