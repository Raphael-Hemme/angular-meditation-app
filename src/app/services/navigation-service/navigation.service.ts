import { computed, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  public currNavOptionList: WritableSignal<string[]> = signal([]);
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
}
