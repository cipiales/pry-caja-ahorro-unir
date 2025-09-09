import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionCrear } from '../../../../shared/model/transaccion-crear';
import { Transaccion } from '../../../../shared/model/transaccion';
import { TransaccionesService } from '../../../../services/transacciones.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-busqueda-transaccion',
  templateUrl: './transaccion-crear.component.html',
  styleUrls: ['./transaccion-crear.component.scss']
})
export class TransaccionCrearComponent implements OnInit {

formularioBusqueda: FormGroup;
dataSource = new MatTableDataSource<Transaccion>();
secuencialDetalleTransacionCajaAhorro: string; // o number si es numérico
validarEdicion:boolean;

   constructor(private fb: FormBuilder,private transaccioneService:TransaccionesService,private route: ActivatedRoute) {


   }

  ngOnInit(): void {
   this.formularioBusqueda = this.fb.group({
  fechaTransaccionCajaAhorro: [null, Validators.required]
});

 this.secuencialDetalleTransacionCajaAhorro = this.route.snapshot.paramMap.get('id');

    console.log("secuencialDetalleTransacionCajaAhorro:"+this.secuencialDetalleTransacionCajaAhorro);

    if (this.secuencialDetalleTransacionCajaAhorro =="0") {
      this.validarEdicion =true;
    } else {
      this.validarEdicion =false;
    }

    this.verDetalle(this.secuencialDetalleTransacionCajaAhorro);
  }

  displayedColumns: string[] = [
    'acciones',
    'asistencia',
    'nroCuenta',
    'tieneCredito',
    'solicitudCredito',
    'nombreSocio',
    'ahorro',
    'fondoReserva',
    'pagoAcciones',
    'pagoCredito',
    'pagoInteres',
    'accion'
  ];

    resultados: Transaccion[] = [];

  /*= [
    {
      acciones: 20,
      asistencia: true,
      nroCuenta: '2004',
      tieneCredito: false,
      solicitudCredito: false,
      nombreSocio: 'IRALDA ALEXANDRA IPIALES MORETA',
      ahorro: 0,
      fondoReserva: 0,
      pagoAcciones: 0,
      pagoCredito: 0,
      pagoInteres: 0
    },
    {
      acciones: 45,
      asistencia: true,
      nroCuenta: '0000200',
      tieneCredito: false,
      solicitudCredito: false,
      nombreSocio: 'ALEXANDRA RUTH ARMAS FUENTES',
      ahorro: 0,
      fondoReserva: 0,
      pagoAcciones: 0,
      pagoCredito: 0,
      pagoInteres: 0
    }
    // ... más filas según tus datos
  ];*/

  totales = {
    ahorro: 0,
    fondoReserva: 0,
    pagoAcciones: 0,
    pagoCredito: 0,
    pagoInteres: 0,
    saldo: 0
  };

  calcularTotales() {
    /*this.totales = this.dataSource.reduce(
      (acc, curr) => {
        acc.ahorro += curr.ahorro || 0;
        acc.fondoReserva += curr.fondoReserva || 0;
        acc.pagoAcciones += curr.pagoAcciones || 0;
        acc.pagoCredito += curr.pagoCredito || 0;
        acc.pagoInteres += curr.pagoInteres || 0;
        acc.saldo = acc.ahorro + acc.fondoReserva + acc.pagoAcciones + acc.pagoCredito + acc.pagoInteres;
        return acc;
      },
      { ahorro: 0, fondoReserva: 0, pagoAcciones: 0, pagoCredito: 0, pagoInteres: 0, saldo: 0 }
    );*/
  }

  editarFila(element: TransaccionCrear) {
    console.log('Editar:', element);
    // Aquí puedes abrir un modal o hacer lógica de edición
  }




  getErrorMessage(campo: string): string {
    const control = this.formularioBusqueda.get(campo);
    if (!control) return '';
    if (control.hasError('required')) return 'La fecha es obligatoria';
    if (control.hasError('matDatepickerParse')) return 'Formato de fecha inválido';
    return '';
  }

 onSubmit(): void {
    if (this.formularioBusqueda.valid) {
      console.log('Fecha seleccionada:', this.formularioBusqueda.value.fechaTransaccionCajaAhorro);
    } else {
      this.formularioBusqueda.markAllAsTouched();
    }
  }


  aceptarFechaTransaccion() {

  }


   verDetalle(secuencialDetalleTransacionCajaAhorro:string)  {

  console.log('Ver secuencialDetalleTransacionCajaAhorro...:'+ secuencialDetalleTransacionCajaAhorro);






  //this.appComponent.abrirProgreso();
  //  this.isErrorInServiceHistoria = "";
    //this.dataSourceHistoria = new MatTableDataSource([]);


    this.transaccioneService
      .obtenerDetaleTransacciones(secuencialDetalleTransacionCajaAhorro,null)
      .subscribe(
        (respuesta) => {
          console.log('Respuesta...:'+ respuesta);
          if (respuesta) {



            this.resultados = respuesta;
            //this.clientesHistoria = respuesta.detalles;
           this.dataSource = new MatTableDataSource(
              this.resultados
            );
            setTimeout(() => {

             // this.tamanoClientesHistoria = this.clientesHistoria.length;
              //this.dataSourceHistoria.paginator = this.paginatorHistorico;
              //this.dataSourceHistoria.sort = this.sortHistorico;
              /*if (this.tamanoClientesHistoria == 0) {
                let mensaje = "La búsqueda de historial de búsqueda no generó resultados";
                this.msjErrorConsultaHistoria = mensaje;
                this.mostrarMsjErrorConsultaHistoria = true;
                this.existeRegistrosHistoria = false;
                this.tamanoClientesHistoria = null;
              } else {
                this.existeRegistrosHistoria = true;
              }*/
            }, 500);
            //this.mostrarMsjErrorConsultaHistoria = false;
          } else {
            //this.isErrorInService = respuesta.error.mensajeError;
          }
         // this.appComponent.cerrarProgreso();
        },
        (err) => {

         // this.appComponent.cerrarProgreso();
        }
      );



  }

}
