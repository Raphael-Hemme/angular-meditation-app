import { Component, computed } from '@angular/core';
import { NavigationService } from '../../services/navigation-service/navigation.service';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [JsonPipe, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private readonly navigationService: NavigationService) {}

  public currNavOptions = computed(() =>
    this.navigationService.currNavOptions()
  );
}
