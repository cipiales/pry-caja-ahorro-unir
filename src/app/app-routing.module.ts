import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers';


const routes: Routes = [
  {
    path: 'dashboard',loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),canActivate: [AuthGuard]
  },

  {
    //path: 'login',
    //loadChildren: './login/login.module#LoginModule'
    path: 'login',loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    //path: 'login',
    //loadChildren: './login/login.module#LoginModule'
    path: 'cuenta',loadChildren: () => import('./modules/layout.module').then((m) => m.LayoutModule),
  },
{
    //path: 'login',
    //loadChildren: './login/login.module#LoginModule'
    path: 'transacciones',loadChildren: () => import('./modules/layout.module').then((m) => m.LayoutModule),
  },
  {
    //path: 'login',
    //loadChildren: './login/login.module#LoginModule'
    path: '',loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
/*,
{
  path: 'blank-page',loadChildren: () => import('./layout/blank-page/blank-page.module').then((m) => m.BlankPageModule),
},*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
