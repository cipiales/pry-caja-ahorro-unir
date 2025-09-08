import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivoOperacionesComponent } from './archivo-operaciones.component';

const routes: Routes = [
    {
        path: '',
        component: ArchivoOperacionesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArchivoOperacionesRoutingModule {}
