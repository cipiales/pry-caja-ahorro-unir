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
              path: 'archivocliente',loadChildren: () => import('./gestionararchivos/archivocliente/archivo-cliente.module').then((m) => m.ArchivoClienteModule),
            },
            {
              path: 'archivooperaciones',loadChildren: () => import('./gestionararchivos/archivooperaciones/archivo-operaciones.module').then((m) => m.ArchivoOperacionesModule),
            },
         
          
           
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
