//import { FormsModule } from './forms/forms.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MatButtonModule } from '@angular/material/button';

   import { MatIconModule } from '@angular/material/icon';

   import { MatInputModule } from '@angular/material/input';
   import { MatListModule } from '@angular/material/list';
   import { MatMenuModule } from '@angular/material/menu';
   import { MatSidenavModule } from '@angular/material/sidenav';
   import { MatToolbarModule } from '@angular/material/toolbar';
   import { MatBadgeModule } from '@angular/material/badge';
   import { MatExpansionModule } from '@angular/material/expansion';

//import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
       // TranslateModule,
        MatBadgeModule,
        MatExpansionModule
       // FormsModule
    ],
    declarations: [LayoutComponent, NavComponent,SidebarComponent,TopnavComponent]
})
export class LayoutModule {}
