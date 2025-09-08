import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransaccionCajaAhorroComponent } from './transaccion-caja-ahorro.component';
import { TransaccionCrearComponent } from './transaccion-crear/transaccion-crear.component';


const routes: Routes = [
    {
        path: '',
        component: TransaccionCajaAhorroComponent
    },
    {
      path: 'crear-transaccion/:id',  component: TransaccionCrearComponent
      //path: 'crear-transaccion',component:TransaccionCrearComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransaccionCajaAhorroRoutingModule {}
