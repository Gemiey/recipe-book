import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() recipeId: number;
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSelected(){
    this.router.navigate(['/selected']);
    console.log('id:',this.recipeId)
    this.recipeSelected.emit(this.recipe);

  }

}