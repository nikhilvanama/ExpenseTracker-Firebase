import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../core/models/common.model';

@Component({
  selector: 'app-expense',
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})

export class ExpenseComponent {

  expenses: IExpense[] = [];
  totalExpenses = 0;
  isLoading: boolean = false; // Initialize loading state

  constructor(private expenseSer: ExpenseService, private router: Router) { }

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses() {
    this.isLoading = true; // Set loading to true before starting fetch
    this.expenses = []; // Clear previous data when starting a new fetch
    this.totalExpenses = 0; // Reset total as well

    this.expenseSer.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        this.expenses = []; // Re-initialize or clear array inside next if you're not resetting above
        this.totalExpenses = 0; // Reset total to recalculate

        data.forEach((item) => {
          let expense = item.payload.toJSON() as IExpense;
          const priceValue = parseInt(expense.price || '0');
          if (!isNaN(priceValue)) {
            this.totalExpenses += priceValue;
          }

          this.expenses.push({
            key: item.key || '',
            title: expense.title,
            description: expense.description,
            price: expense.price,
          });
        });
        this.isLoading = false; // Set loading to false after data is processed
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
        this.isLoading = false; // Set loading to false even if there's an error
        // Optionally, show an error message to the user
      },
      complete: () => {
        console.log('Expense fetching complete.');
        // This 'complete' handler might fire before 'next' if there's no data or on unsubscription.
        // It's generally safer to set isLoading=false in 'next' and 'error' for stream-based fetches.
      }
    });
  }

  editExpense(key: string) {
    this.router.navigate(['/expenseform', key]);
  }

  deleteExpense(key: string) {
      if (confirm('Are you sure you want to delete this expense?')) {
          this.expenseSer.deleteExpense(key)
              .then(() => console.log('Expense deleted successfully!'))
              .catch(err => console.error('Error deleting expense:', err));
      }
  }
}