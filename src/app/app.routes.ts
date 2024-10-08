import { Routes } from '@angular/router';
import { PracticePageComponent } from './pages/practice-page/practice-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'practice',
    pathMatch: 'full',
  },
  {
    path: 'practice',
    component: PracticePageComponent,
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
  },
  {
    path: 'stats',
    component: StatsPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
