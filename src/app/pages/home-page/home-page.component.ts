import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { NavigationService } from '../../services/navigation-service/navigation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavBarComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private navigationService: NavigationService) {
    this.navigationService.setCurrNavOptionsList(['home', 'settings']);
  }
}
