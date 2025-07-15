import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivoClienteRoutingModule } from './archivo-cliente-routing.module';
import { ArchivoClienteComponent } from './archivo-cliente.component';
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

@NgModule({
  imports: [
    ArchivoClienteRoutingModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    MatDividerModule,
    MensajeConfirmacionModule,
    MatTooltipModule,
    MatTableModule
],
  declarations: [ArchivoClienteComponent],
  exports: [ArchivoClienteComponent]
})
export class ArchivoClienteModule {}
