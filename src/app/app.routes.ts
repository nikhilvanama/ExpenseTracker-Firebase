import { Routes } from '@angular/router';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';

export const routes: Routes = [
    { path: '', component: ExpenseComponent },
    { path: 'expenseform', component: ExpenseFormComponent },
    { path: 'expenseform/:key', component: ExpenseFormComponent },
];
