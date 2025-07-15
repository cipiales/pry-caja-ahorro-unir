import { NgModule } from '@angular/core';
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


import { ErrorMessageComponent } from '../modules/comon/error-message/error-message.component';

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
    declarations: [LoginComponent,ErrorMessageComponent]

})
export class LoginModule {}
