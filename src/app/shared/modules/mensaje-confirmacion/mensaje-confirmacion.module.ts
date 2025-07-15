import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeConfirmacionComponent } from './mensaje-confirmacion.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MensajeConfirmacionComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  /*entryComponents: [

  ],*/
  exports: [MensajeConfirmacionComponent]

})
export class MensajeConfirmacionModule { }
