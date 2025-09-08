import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule }   from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';





@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,

        MatFormFieldModule,
        FormsModule,

    ],
    providers:[provideHttpClient()],
    declarations: [LoginComponent],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class LoginModule {}
