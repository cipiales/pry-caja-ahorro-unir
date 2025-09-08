import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
//import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';

//import {NotifierComponent} from '../../components/notifier/notifier.component';
//import {MatSnackBar} from '@angular/material/snack-bar';
//import {MatDialog} from '@angular/material/dialog';
//import {DialogComponent} from '../../components/dialogs/dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EXP_REGULARES } from '../../../shared/exp-regulares/exp-regulares';
import { Cuenta } from '../../../shared/model/cuenta';
import { CuentasService } from '../../../services/cuentas.service';
import { Transaccion } from '../../../shared/model/transaccion';
import { TransaccionesService } from '../../../services/transacciones.service';







@Component({
    selector: 'app-transaccion-caja-ahorro',
    templateUrl: './transaccion-caja-ahorro.component.html',
    styleUrls: ['./transaccion-caja-ahorro.component.scss']
})


export class TransaccionCajaAhorroComponent implements OnInit {

  doClean = false;
  searchError: string | null = null;

  selectedType: string | null = null;
  headers: string[] = ['id', 'description', 'status'];


  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})

  set sort(value: MatSort) {
    //this.dataSource.sort = value;
  }


    busquedaForm: FormGroup;
    formBusqueda: FormGroup;/////

    transacciones: Transaccion[] = [];


  resultados: Transaccion[] = [];


    constructor(private fb: FormBuilder,private constructorBusquedaForm: FormBuilder,private transaccioneService:TransaccionesService) {


      this.busquedaForm = this.constructorBusquedaForm.group({
      fechaTransaccion: ["", [Validators.pattern("^[0-9]*$")]],
      numeroSemana: [ "",[Validators.pattern(EXP_REGULARES.SOLO_DIGITOS),],],
      ciclo: ["",[Validators.pattern(EXP_REGULARES.SOLO_TEXTO),],],


    });

    this.formBusqueda = this.fb.group(
      {
      criterio: ['todos'],
      valor: [''],
      estado:['']
    });



    }



    ngOnInit() {

    }






  buscarTransacciones(fechaTransaccion:string,numeroSemana:string,ciclo:string) {





  //this.appComponent.abrirProgreso();
  //  this.isErrorInServiceHistoria = "";
    //this.dataSourceHistoria = new MatTableDataSource([]);


    this.transaccioneService
      .obtenerTransacciones(fechaTransaccion,numeroSemana,ciclo)
      .subscribe(
        (respuesta) => {
          console.log('Respuesta Historia...:'+ respuesta);
          if (respuesta) {

            this.resultados = respuesta;
            //this.clientesHistoria = respuesta.detalles;
           /* this.dataSourceHistoria = new MatTableDataSource(
              this.clientesHistoria
            );*/
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

  buscarTransaccionesFormulario() {
    let criterio = this.formBusqueda.get("criterio").value;
    console.log("criterio:"+criterio);
    let valor = this.formBusqueda.get("valor").value;
    console.log("valor:"+valor);
    let estado = this.formBusqueda.get("estado").value;
    console.log("estado:"+estado);

    if (criterio === 'todos') {
       this.buscarTransacciones(null,null,null);
    } else if  (criterio === 'fechaTransaccion') {

      this.buscarTransacciones(valor,null,null);

    } else if  (criterio === 'numeroSemana') {
      this.buscarTransacciones(null,valor,null);

    } else if  (criterio === 'ciclo') {
      this.buscarTransacciones(null,null,valor);

    }
  }

  getErrorMessage(nombreCampo: string) {
    return this.formBusqueda.get(nombreCampo).hasError('required')
      ? 'El campo es obligatorio ingresar.'
      : this.formBusqueda.get(nombreCampo).hasError("pattern")
        ? "El campo permite ingresar unicamente valores númericos"
        : this.formBusqueda.get(nombreCampo).hasError("maxlength")
          ? 'El campo admite ' + this.formBusqueda.get(nombreCampo).getError("maxlength").requiredLength + ' caracteres'
          : this.formBusqueda.get(nombreCampo).hasError("minlength")
            ? 'El campo admite ' + this.formBusqueda.get(nombreCampo).getError("minlength").requiredLength + ' caracteres'
            : "";
  }
  onClickCriterio(opcion: string) {
    this.formBusqueda.get("valor").setValue("");
    let criterio = this.formBusqueda.get("criterio").value;
    console.log("opcion:" + opcion);

    if (opcion === 'Todos') {
      this.formBusqueda.get("valor").setValidators(
        null
      );
    } if (opcion === 'fechaTransaccion') {
      this.formBusqueda.get("valor").setValidators(
        [Validators.required, Validators.pattern(EXP_REGULARES.SOLO_NUMEROS), Validators.maxLength(12), Validators.minLength(4)]
      );
    } if (opcion === 'numeroSemana') {
      this.formBusqueda.get("valor").setValidators(
        [Validators.required, Validators.pattern(EXP_REGULARES.SOLO_NUMEROS), Validators.maxLength(10), Validators.minLength(10)]
      );
    } if (opcion === 'ciclo') {
      this.formBusqueda.get("valor").setValidators(
        [Validators.required, Validators.pattern(EXP_REGULARES.SOLO_NUMEROS), Validators.maxLength(10), Validators.minLength(10)]
      );
    }
    this.formBusqueda.get("valor").updateValueAndValidity();
  }

  verDetalle(secuencialDetalleTransacionCajaAhorro:string)  {

           console.log('secuencialDetalleTransacionCajaAhorro...:'+ secuencialDetalleTransacionCajaAhorro);






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
           /* this.dataSourceHistoria = new MatTableDataSource(
              this.clientesHistoria
            );*/
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







