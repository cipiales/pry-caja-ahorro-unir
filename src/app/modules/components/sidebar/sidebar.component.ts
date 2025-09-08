import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public showMenu: string;
  constructor(private router: Router) {}
 menus = [
  {
    routerlink: '/cuenta/dashboard',
    routerText: 'Inicio'
  },
  {
    menutitle: 'Administracion',
    submenus: [
      {
        menutitle: 'Cuentas',
        submenus: [
          {
            routerlink: '/cuenta/dashboard',
            routerText: 'Listado de Cuentas'
          },
          {
            routerlink: '/cuenta/crear',
            routerText: 'Crear Cuenta'
          }
        ]
      },
      {
        routerlink: '/compracartera/archivooperaciones',
        routerText: 'Ciclos'
      },
      {
        routerlink: '/compracartera/archivooperaciones',
        routerText: 'Usuarios'
      }
    ]
  },
    {
    menutitle: 'Transacción',
    submenus: [
      {
        menutitle: 'Transacción Caja',
        submenus: [
          {
            routerlink: '/transacciones/transacciones',
            routerText: 'Listado de Transacciones'
          },
          {
            routerlink: '/transacciones/transacciones/crear-transaccion/0',

            routerText: 'Crear Transacciòn'
          }
        ]
      }


    ]
  }
];
  ngOnInit() {}

  ifActiveRoute(subRoutes: any[]) {

    const subLinks = subRoutes.map(m => '/' + m.routerlink);

    //console.log("subLinks:"+subLinks);
    const activeRoute = this.router.url;
    //console.log("activeRoute:"+activeRoute);
    return subLinks.indexOf(activeRoute) >= 0;
  }
}
