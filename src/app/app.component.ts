// Import Angular Core components
import { Component, AfterViewInit } from '@angular/core';

// Import forms and routing modules for global app functionality
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet, NavigationEnd, Router } from '@angular/router';

// Import RxJS filter operator to listen for specific router events
import { filter } from 'rxjs/operators';

// Declare the 'lucide' global variable (defined via CDN in index.html)
declare var lucide: any;

@Component({
  selector: 'app-root', // The root component tag used in index.html
  standalone: true, // Standalone component that manages its own global imports
  imports: [RouterOutlet, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'Modern Expense Tracker';

  constructor(private router: Router) {
    /**
     * Listen for Router changes (NavigationEnd)
     * This is required because Lucide Icons need to be re-rendered 
     * every time a new component is loaded into the <router-outlet>
     */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Small delay ensures the DOM is fully ready before scanning for icons
      setTimeout(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons(); // Scan and render Lucide icons
        }
      }, 100);
    });
  }

  // Lifecycle hook: Runs after the initial view has been rendered
  ngAfterViewInit() {
    // Initial render of icons on the first page load
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}
