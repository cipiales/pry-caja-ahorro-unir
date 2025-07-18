import { Observable } from 'rxjs';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isHandset: Observable<BreakpointState>;

    constructor(private breakpointObserver: BreakpointObserver) {

      this.isHandset = this.breakpointObserver.observe(
        Breakpoints.Handset
    );


    }





}
