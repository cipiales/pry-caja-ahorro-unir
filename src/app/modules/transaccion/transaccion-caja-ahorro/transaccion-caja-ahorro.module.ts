import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { Overlay } from '@angular/cdk/overlay';

// Módulos propios y componentes...
import { MensajeConfirmacionModule } from '../../../shared/modules/mensaje-confirmacion/mensaje-confirmacion.module';
import { TransaccionCajaAhorroRoutingModule } from './transaccion-caja-ahorro-routing.module';
import { TransaccionCrearComponent } from './transaccion-crear/transaccion-crear.component';
import { TransaccionCajaAhorroComponent } from './transaccion-caja-ahorro.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

// Registrar locale
registerLocaleData(localeEs);

// Opcional: formato de fecha
export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransaccionCajaAhorroRoutingModule,
    OverlayModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    MensajeConfirmacionModule,
       MatRadioModule,
        MatSelectModule,


    FormsModule,
    MatTableModule,     // 👈 Necesario para mat-table
    MatCheckboxModule,  // 👈 Para los checkboxes
     // 👈 Para los inputs dentro de la tabla

  ],
  declarations: [
    TransaccionCrearComponent,
    TransaccionCajaAhorroComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // 🔹 aquí se fuerza español
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: MAT_DATEPICKER_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.reposition(),
      deps: [Overlay]
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransaccionCajaAhorroModule {}
