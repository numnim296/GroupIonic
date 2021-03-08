import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./admin-home/admin-home.module').then( m => m.AdminHomePageModule),
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'edit-product/:pd',
    loadChildren: () => import('./edit-product/edit-product.module').then( m => m.EditProductPageModule),
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule),
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'series/:alldata',
    loadChildren: () => import('./series/series.module').then( m => m.SeriesPageModule)
  },
  {
    path: 'detail-series/:detail',
    loadChildren: () => import('./detail-series/detail-series.module').then( m => m.DetailSeriesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
