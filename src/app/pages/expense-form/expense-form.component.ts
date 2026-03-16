// Import Angular Core and Common modules
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// Import Reactive Forms modules for advanced form handling and validation
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

// Import our custom Expense Service and Data Model
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../core/models/common.model';

// Import Routing modules to handle URL parameters and navigation
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  standalone: true, // Indicates this component manages its own imports
  imports: [CommonModule, ReactiveFormsModule], // Required for [formGroup] and validators
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit {

  // Local storage for expenses if needed within the form logic
  expenses: IExpense[] = [];
  
  // Definition of the reactive form group
  expenseForm!: FormGroup;
  
  // Stores the unique ID if we are in 'Edit' mode
  expenseId = '';

  // Constructor injecting required services: Service, Router, FormBuilder, and ActivatedRoute
  constructor(private expenseSer: ExpenseService, private router: Router, private fb: FormBuilder, private activetedRoute: ActivatedRoute) {
    // Initialize the form with validation rules
    this.expenseForm = this.fb.group({
      // Price: Required field
      price: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      // Title: Required, minimum 5 characters for clarity
      title: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
      // Description: Required, between 10 and 500 characters
      description: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
    });
  }

  // Getter methods to simplify access to form controls in the HTML template
  get price() { return this.expenseForm.get('price'); }
  get title() { return this.expenseForm.get('title'); }

  // Runs when the component is initialized
  ngOnInit(): void {
    // Check the URL for the 'key' parameter to determine if we are editing an existing item
    this.activetedRoute.params.subscribe({
      next: (params) => {
        this.expenseId = params['key'];
        if (this.expenseId) {
          // If a key exists, we are in Edit Mode; fetch the current data
          this.getExpense(this.expenseId);
        }
      }
    })
  }

  /**
   * Handles the submission of the expense form
   */
  onSubmit() {
    // If the form passes all validation rules
    if (this.expenseForm.valid) {
      if (this.expenseId) {
        // UPDATE MODE: If we have an ID, update the existing entry in Firebase
        this.expenseSer.updateExpense(this.expenseId, this.expenseForm.value);
      } else {
        // ADD MODE: If no ID, create a new entry in Firebase
        this.expenseSer.addExpense(this.expenseForm.value);
      }
      
      // Navigate back to the dashboard after success
      this.router.navigate(['/']);
    } else {
      // If form is invalid, highlight all errors for the user
      this.expenseForm.markAllAsTouched();
    }

    // Clear the form data
    this.expenseForm.reset();
  }

  /**
   * Fetches the data for a single expense specifically for the edit form
   * @param key The unique identifier from Firebase
   */
  getExpense(key: string) {
    // Call service with the unique key and listen for data once
    this.expenseSer.getExpense(key).snapshotChanges().subscribe({
      next: (data) => {
        // Map the Firebase data packet to our TypeScript interface
        let expense = data.payload.toJSON() as IExpense;
        
        if (expense) {
          // Safely populate the form fields with existing data
          this.expenseForm.patchValue({
            price: expense.price || '',
            title: expense.title || '',
            description: expense.description || ''
          });
          console.log("Expense data loaded successfully:", expense);
        } else {
          // If no data found, return to main list to avoid errors
          console.warn("Expense not found for key:", key);
          this.router.navigate(['/']);
        }
      }
    })
  }
}
