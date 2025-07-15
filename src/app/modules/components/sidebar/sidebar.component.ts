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
      routerlink: '/compracartera/dashboard',
      routerText: 'Inicio'
    } , /*{
            menutitle: 'Internal Menu',
            submenus: [
                {
                    routerlink: 'charts',
                    routerText: 'Charts'
                  },
                  {
                    routerlink: 'tables',
                    routerText: 'Tables'
                  },
                  {
                    routerlink: 'forms',
                    routerText: 'Forms'
                  },
                  {
                    routerlink: 'grid',
                    routerText: 'Grid'
                  }
              ]
          },
    {
      menutitle: 'Menu Casa Comerciales',
      submenus: [
        {
          routerlink: 'new-page',
          routerText: 'Validacion Filtros Duros'
        },
        {
          routerlink: 'new-page',
          routerText: 'Carga Archivos Compra Cartera'
        }
      ]
    },
    {
      menutitle: 'Menu Operaciones',
      submenus: [
        {
          routerlink: 'new-page',
          routerText: 'Parametros Clientes'
        },
        {
          routerlink: 'new-page',
          routerText: 'Parametros Casa Comercial'
        },
        {
          routerlink: 'new-page',
          routerText: 'Carga Archivo Visado'
        },
        {
          routerlink: 'new-page',
          routerText: 'Anclaje Cuenta'
        },
        {
          routerlink: 'new-page',
          routerText: 'Notificacion Desembolso'
        },
        {
          routerlink: 'new-page',
          routerText: 'Reportes'
        }
      ]
    },*/
    {
      menutitle: 'Administracion',
      submenus: [
        {
          routerlink: '/compracartera/dashboard',
          routerText: 'Cuentas'
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
