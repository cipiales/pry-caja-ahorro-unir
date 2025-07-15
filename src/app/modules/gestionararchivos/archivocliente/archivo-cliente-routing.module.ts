import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivoClienteComponent } from './archivo-cliente.component';

const routes: Routes = [
    {
        path: '',
        component: ArchivoClienteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArchivoClienteRoutingModule {}
