import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './today/today.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'today', component: TodayComponent },
      { path: 'upcoming', component: UpcomingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
