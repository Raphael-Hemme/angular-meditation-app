import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { NavigationService } from '../../services/navigation-service/navigation.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.navigationService.setCurrNavOptionsList(['home', 'settings']);
  }

  public openPractice(): void {
    this.router.navigate(['/practice']);
  }
}
