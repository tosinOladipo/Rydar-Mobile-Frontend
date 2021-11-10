import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children:[
      {
        path: 'home',
        children:[
          {
            path: '',
          loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'pending-trips',
        children:[
          {
            path: '',
          loadChildren: () => import('../pending-trips/pending-trips.module').then( m => m.PendingTripsPageModule)
          }
        ]
      },
      {
        path: 'started-trips',
        children:[
          {
            path: '',
            loadChildren: () => import('../started-trips/started-trips.module').then( m => m.StartedTripsPageModule)
          }
        ]
      },
      {
        path: 'completed-trips',
        children:[
          {
            path: '',
            loadChildren: () => import('../completed-trips/completed-trips.module').then( m => m.CompletedTripsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
