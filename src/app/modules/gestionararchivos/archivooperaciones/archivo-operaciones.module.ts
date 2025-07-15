import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { BlankPageRoutingModule } from './blank-page-routing.module';
import { ArchivoOperacionesRoutingModule } from './archivo-operaciones-routing.module';
import { ArchivoOperacionesComponent} from './archivo-operaciones.component';



import { MatButtonModule } from '@angular/material/button';
import {  MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

//import { MensajeConfirmacionModule } from '../../shared/modules//mensaje-confirmacion/mensaje-confirmacion.module';
import { MensajeConfirmacionModule } from '../../../shared/modules//mensaje-confirmacion/mensaje-confirmacion.module';
//import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [CommonModule, ArchivoOperacionesRoutingModule,
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
   // MaterialFileInputModule,
    MatTooltipModule
],
  declarations: [],
  exports: []
})
export class ArchivoOperacionesModule {}
