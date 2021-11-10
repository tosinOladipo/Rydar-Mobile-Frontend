import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pending-trips',
    loadChildren: () => import('./pages/pending-trips/pending-trips.module').then( m => m.PendingTripsPageModule)
  },
  {
    path: 'started-trips',
    loadChildren: () => import('./pages/started-trips/started-trips.module').then( m => m.StartedTripsPageModule)
  },
  {
    path: 'add-trip',
    loadChildren: () => import('./pages/add-trip/add-trip.module').then( m => m.AddTripPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'completed-trips',
    loadChildren: () => import('./pages/completed-trips/completed-trips.module').then( m => m.CompletedTripsPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'all-shipments',
    loadChildren: () => import('./pages/all-shipments/all-shipments.module').then( m => m.AllShipmentsPageModule)
  },
  {
    path: 'pick-up-form',
    loadChildren: () => import('./pages/pick-up-form/pick-up-form.module').then( m => m.PickUpFormPageModule)
  },
  {
    path: 'delivery-form',
    loadChildren: () => import('./pages/delivery-form/delivery-form.module').then( m => m.DeliveryFormPageModule)
  },
  {
    path: 'current-trip',
    loadChildren: () => import('./pages/current-trip/current-trip.module').then( m => m.CurrentTripPageModule)
  },
  {
    path: 'start-trip-form/:orderId/:customerPhoneNumber',
    loadChildren: () => import('./pages/start-trip-form/start-trip-form.module').then( m => m.StartTripFormPageModule)
  },
  {
    path: 'request/:orderId/:riderId',
    loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
