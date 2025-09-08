import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [

            {
              path: 'dashboard',loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
              path: 'crear',loadChildren: () => import('./administracion/cuenta/cuenta.module').then((m) => m.CuentaModule),
            },
            {
              path: 'archivooperaciones',loadChildren: () => import('./administracion/cuenta/cuenta.module').then((m) => m.CuentaModule),
            },
            {
              path: 'transacciones',loadChildren: () => import('./transaccion/transaccion-caja-ahorro/transaccion-caja-ahorro.module').then((m) => m.TransaccionCajaAhorroModule),
            }





        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
