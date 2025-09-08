

import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaComponent } from './cuenta.component';
import { MatButtonModule } from '@angular/material/button';
import {  MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table'

//import { MensajeConfirmacionModule } from '../../shared/modules//mensaje-confirmacion/mensaje-confirmacion.module';
import { MensajeConfirmacionModule } from '../../../shared/modules/mensaje-confirmacion/mensaje-confirmacion.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../comon/error-message/error-message.component';


@NgModule({
  imports: [
    CuentaRoutingModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCardModule,

    MatDividerModule,
    MensajeConfirmacionModule,
    MatTooltipModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,

],

  declarations: [CuentaComponent,ErrorMessageComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CuentaComponent]
})
export class CuentaModule {}
