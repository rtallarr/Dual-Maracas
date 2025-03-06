import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {
    this.router.navigate(['/blocklist']);
  }
}