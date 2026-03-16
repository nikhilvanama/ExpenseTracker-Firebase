// Import necessary Angular modules for routing and common utilities
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Import our custom Expense Service and the Expense Interface
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../core/models/common.model';

@Component({
  selector: 'app-expense', // The CSS selector used to identify this component in HTML
  standalone: true, // This component is standalone and manages its own dependencies
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet], // Modules required for this component's template
  templateUrl: './expense.component.html', // Path to the HTML template file
  styleUrl: './expense.component.css' // Path to the CSS styling file
})
export class ExpenseComponent {
  // Array to store the list of expenses fetched from Firebase
  expenses: IExpense[] = [];
  
  // Variable to store the running total of all expense prices
  totalExpenses = 0;
  
  // State variable to manage the visibility of the loading spinner
  isLoading: boolean = false;
  
  // State variable to manage the visibility of the custom delete confirmation modal
  showDeleteModal: boolean = false;
  
  // Temporary storage for the key of the expense selected for deletion
  selectedExpenseKey: string = '';

  // Inject the ExpenseService for database operations and Router for navigation
  constructor(private expenseSer: ExpenseService, private router: Router) { }

  // Lifcycle hook: Called once the component is initialized
  ngOnInit(): void {
    this.getAllExpenses(); // Fetch all expenses immediately on load
  }

  /**
   * Fetches all expenses from the Firebase Realtime Database
   */
  getAllExpenses() {
    this.isLoading = true; // Show loading spinner
    this.expenses = []; // Clear current list before fetching
    this.totalExpenses = 0; // Reset total calculation

    // Subscribe to snapshotChanges() to get real-time data and unique keys from Firebase
    this.expenseSer.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        this.expenses = []; // Clear list for each update to prevent duplicates
        this.totalExpenses = 0; // Reset total for recalculation

        data.forEach((item) => {
          // Convert the payload from Firebase into our IExpense object
          let expense = item.payload.toJSON() as IExpense;
          
          // Parse the price string into a number for summation
          const priceValue = parseInt(expense.price || '0');
          if (!isNaN(priceValue)) {
            this.totalExpenses += priceValue; // Add to the total balance
          }

          // Add the expense to the beginning of the array (Latest First)
          this.expenses.unshift({
            key: item.key || '', // Store the unique ID from Firebase
            title: expense.title,
            description: expense.description,
            price: expense.price,
          });
        });
        this.isLoading = false; // Hide loading spinner once data is processed
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
        this.isLoading = false; // Ensure spinner is hidden even on error
      }
    });
  }

  /**
   * Navigates to the expense form in Edit Mode
   * @param key Unique identifier for the expense
   */
  editExpense(key: string) {
    this.router.navigate(['/expenseform', key]);
  }

  /**
   * Triggers the custom delete confirmation flow
   * @param key Unique identifier for the expense to be deleted
   */
  deleteExpense(key: string) {
      this.openDeleteModal(key); // Open the modern glassmorphic modal
  }

  /**
   * Opens the delete confirmation modal
   */
  openDeleteModal(key: string) {
    this.selectedExpenseKey = key; // Save the key of the item to delete
    this.showDeleteModal = true; // Show the modal overlay
  }

  /**
   * Closes the delete confirmation modal without action
   */
  closeModal() {
    this.showDeleteModal = false; // Hide the modal overlay
    this.selectedExpenseKey = ''; // Clear the stored key
  }

  /**
   * Finalizes the deletion after user confirmation
   */
  confirmDelete() {
    if (this.selectedExpenseKey) {
      // Call the service to remove the item from Firebase
      this.expenseSer.deleteExpense(this.selectedExpenseKey)
        .then(() => {
          console.log('Expense deleted successfully!');
          this.closeModal(); // Close modal on success
        })
        .catch(err => {
          console.error('Error deleting expense:', err);
          this.closeModal(); // Close modal on error
        });
    }
  }
}