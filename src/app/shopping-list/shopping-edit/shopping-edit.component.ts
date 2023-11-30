import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  subscription:Subscription;
  editMode = false;
  editedItemIndex:number;
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
        this.subscription= this.shoppingListService.startedEditing.subscribe((index:number) => {
        this.editMode = true;
        this.editedItemIndex = index;
      });
   }

  onAddIngredient(nameInput: HTMLInputElement) {
    const newIngredient = new Ingredient(
      nameInput.value, 
      this.amountInput.nativeElement.value
    );
    this.shoppingListService.addIngredient(newIngredient);

  }
  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient (value.nameInput,value.amountInput);
    // this.shoppingListService.addIngredient(newIngredient);
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.onClear();
  }
  onClear(){
    this.editMode = false;
    this.shoppingListForm.reset();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  
}
