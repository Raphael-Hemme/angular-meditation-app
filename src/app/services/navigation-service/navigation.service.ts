import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly router: Router) {}

  public currNavOptionList: WritableSignal<string[]> = signal([
    /* 'home',
    'settings', */
  ]);

  public currNavOptions = computed(() => {
    return this.allNavOptions.filter((opt) =>
      this.currNavOptionList().includes(opt.name)
    );
  });

  private allNavOptions = [
    {
      name: 'home',
      path: '',
      icon: '',
    },
    {
      name: 'practice',
      path: '/practice',
      icon: '',
    },
    {
      name: 'settings',
      path: '/settings',
      icon: '',
    },
    {
      name: 'stats',
      path: '/stats',
      icon: '',
    },
  ];

  public setCurrNavOptionsList(optionsToActivate: string[]): void {
    this.currNavOptionList.set(optionsToActivate);
  }

  public navigateTo(targetPath: string): void {
    this.router.navigate([targetPath]);
  }
}
