import { Component } from '@angular/core';
import { User } from './models';
import { AuthenticationService } from './services/authentication.service';
import { SpinnerComponent } from './modules/spinner/spinner.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

import _ from 'lodash';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pry-caja-ahorro-unir';

  user?: User | null;
  private ventana: MatDialogRef<SpinnerComponent>;

    constructor(private authenticationService: AuthenticationService, private matDialog: MatDialog,private overlay: Overlay,) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authenticationService.logout();
    }

    abrirProgreso(): void {
    this.cerrarProgreso();
    this.ventana = this.matDialog.open(SpinnerComponent, {
      panelClass: 'epsSelectorPanel',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }

   cerrarProgreso(): void {
    if (!_.isNil(this.ventana)) {
      this.ventana.close();
    }
  }
}
