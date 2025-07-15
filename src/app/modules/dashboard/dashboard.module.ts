//import { AutofocusDirective } from './../../../../.history/src/app/shared/directives/autofocus.directive_20190628154224';

//import { AutofocusDirective } from 'app/shared/directives/autofocus.directive';
//import { HasAnyAuthorityDirective } from 'app/shared/auth/has-any-authority.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
    import { MatButtonModule } from '@angular/material/button';
    import { MatCardModule } from '@angular/material/card';
    import { MatIconModule } from '@angular/material/icon';
    import { MatTableModule } from '@angular/material/table';
    import { MatFormFieldModule } from '@angular/material/form-field';
    import { MatInputModule } from '@angular/material/input';
    import {MatPaginatorModule} from '@angular/material/paginator';

import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
//import { ChartsModule as Ng2Charts } from 'ng2-charts';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HasAnyAuthorityDirective } from '../../shared/auth/has-any-authority.directive';
import { AutofocusDirective } from '../../shared/directives/autofocus.directive';
import { MatSelect } from "@angular/material/select";

@NgModule({
    imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    StatModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    //Ng2Charts,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,

],

    declarations: [DashboardComponent, HasAnyAuthorityDirective,AutofocusDirective]
})
export class DashboardModule {}
