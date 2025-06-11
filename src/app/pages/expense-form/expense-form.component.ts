import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../core/models/common.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})

export class ExpenseFormComponent implements OnInit {

  expenses: IExpense[] = [];

  constructor(private expenseSer: ExpenseService, private router: Router, private fb: FormBuilder, private activetedRoute: ActivatedRoute) {
    this.expenseForm = this.fb.group({
      price: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      title: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
    });
  }

  expenseForm!: FormGroup;
  expenseId = '';

  // expenseForm = new FormGroup({
  //   price: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
  //   title: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
  //   description: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
  // });

  // ngOnInit(): void {
  // this.expenseForm = this.fb.group({
  //   price: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
  //   title: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
  //   description: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
  // });
  // }

  get price() {
    return this.expenseForm.get('price');
  }

  get title() {
    return this.expenseForm.get('title');
  }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe({
      next: (params) => {
        this.expenseId = params['key'];
        if (this.expenseId) {
          this.getExpense(this.expenseId);
        }
      }
    })
  }

  onSubmit() {
    const postValue = this.expenseForm.value;

    if (this.expenseForm.valid) {
      this.expenseSer.addExpense(this.expenseForm.value);
      this.router.navigate(['/']);
    } else {
      this.expenseForm.markAllAsTouched();
      return;
    }

    console.log('Expense Values:', postValue);

    // Reset Form
    this.expenseForm.reset();
  }

  getExpense(key: string) {
    this.expenseSer.getExpense(key).snapshotChanges().subscribe({
      next:(data)=>{
        let expense = data.payload.toJSON() as IExpense;
        // FIX 2: Use patchValue
        if (expense) {
            this.expenseForm.patchValue({
                price: expense.price || '',
                title: expense.title || '',
                description: expense.description || ''
            });
            console.log("Expense data loaded into form:", expense);
        } else {
            console.warn("No expense data found for key:", key);
            this.router.navigate(['/expenses']); // Redirect if not found
        }
        console.log("Raw Firebase data snapshot:", data);
      }
    })
  }
}
