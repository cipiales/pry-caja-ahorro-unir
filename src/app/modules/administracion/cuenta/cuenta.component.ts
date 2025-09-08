import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { Config } from 'app/shared/config/config';
//import { FileService } from 'app/services/file.service';
//import * as fileSaver from 'file-saver';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//import { DetalleArchivoSalida, RespuestasEjecucion } from 'app/models/detalle-archivo-salida';
import {MatTableDataSource} from '@angular/material/table';
import { Config } from '../../../shared/config/config';
import { DetalleArchivoSalida, RespuestasEjecucion } from '../../../models/detalle-archivo-salida';
import { FileService } from '../../../services/file.service';
import { CuentasService } from '../../../services/cuentas.service';
import { Cuenta } from '../../../shared/model/cuenta';
import { Socio } from '../../../shared/model/socio';
import { AppComponent } from '../../../app.component';
import { MessageService } from '../../../shared/services/message-services/message.service';

import { ERROR_MESSAGE_APP } from '../../../shared/constants/error-messaje-app';
import { EXP_REGULARES } from '../../../shared/exp-regulares/exp-regulares';
import { SocioService } from '../../../services/socio.service';
import { constantesComun } from '../../../shared/constants/constantes-comun';
import moment from 'moment';
@Component({
    selector: 'app-cuenta',
    templateUrl: './cuenta.component.html',
    styleUrls: ['./cuenta.component.scss']

})
export class CuentaComponent implements OnInit {

     formularioDatos: FormGroup;
     formularioBusqueda: FormGroup;
     mostrarFormularioBusqueda :boolean;
     mostrarFormularioDatos :boolean;
     resultados: Cuenta[] = [];
     cedulaIdentidadBusqueda:string;
     cuenta:Cuenta ;
    socio:Socio;




    constructor(private socioService :SocioService,private cuentasService:CuentasService,private fb: FormBuilder, private formulariob: FormBuilder,private http: HttpClient,private appComponent: AppComponent,  private messageService: MessageService) {
    this.formularioDatos = this.fb.group({
      cedulaIdentidad: [''],
      primerNombre: ['', [Validators.required,Validators.maxLength(32), Validators.minLength(5),Validators.pattern(EXP_REGULARES.ALPHANUMERIC)]],
      primerApellido: ['', [Validators.required,Validators.maxLength(32), Validators.minLength(5),Validators.pattern(EXP_REGULARES.ALPHANUMERIC)]],
      direccion: ['', [Validators.required,Validators.maxLength(256), Validators.minLength(5),Validators.pattern(EXP_REGULARES.ALPHANUMERIC)]],
      telefonoCelular: ['',[Validators.minLength(9)]],
      sexo: ['',Validators.required],

      acciones: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(3), Validators.minLength(1)]],
      segundoNombre: [''],
      segundoApellido: [''],
      telefonoConvencional: ['',[Validators.minLength(9)]]
    });
    this.formularioBusqueda = this.formulariob.group({
      cedulaIdentidadBusqueda: ["", [Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]]

    });
    this.mostrarFormularioBusqueda = true;
    this.mostrarFormularioDatos = false;

    this.cuenta = new Cuenta();
    this.socio = new Socio();



  }
    ngOnInit() {

    }

    guardar() {
    if (this.formularioDatos.valid) {
      console.log(this.formularioDatos.value);
      // Aquí puedes enviar los datos al backend o hacer cualquier lógica adicional
    console.log("Cedula Identidad:::::::"+this.cedulaIdentidadBusqueda);

    let fechaSistema = this.obtenerFechaSistema();
    let fechaSistemaFormatoYYYYMMDD = this.convertirFechaACadenaFormato(fechaSistema);

      this.socio.cedulaIdentidad = this.cedulaIdentidadBusqueda;
      this.socio.direccion = this.formularioDatos.get("direccion").value;
      this.socio.estado = constantesComun.ESTADO_ACTIVO;//this.formularioDatos.get("estado").value;
      this.socio.primerApellido = this.formularioDatos.get("primerApellido").value;
      this.socio.segundoApellido = this.formularioDatos.get("segundoApellido").value;
      this.socio.primerNombre = this.formularioDatos.get("primerNombre").value;
      this.socio.segundoNombre = this.formularioDatos.get("segundoNombre").value;
      this.socio.sexo = this.formularioDatos.get("sexo").value;
      this.socio.nombreCompleto = this.socio.primerNombre+" "+  this.socio.segundoNombre  +" " +this.socio.primerApellido+ " " + this.socio.segundoApellido
      this.socio.telefonoConvencional = this.formularioDatos.get("telefonoConvencional").value;
      this.socio.telefonoCelular = this.formularioDatos.get("telefonoCelular").value;
      this.socio.usuarioRegistro = "CAC01" //this.formularioDatos.get("usuarioRegistro").value;
      this.socio.fechaRegistro = fechaSistemaFormatoYYYYMMDD;//this.formularioDatos.get("fechaRegistro").value;



      this.cuenta.codigoCajaAhorro = "CAJA01"
       this.cuenta.estado = constantesComun.ESTADO_ACTIVO;
       this.cuenta.usuarioRegistro = "CAC01"
       this.cuenta.fechaRegistro = fechaSistemaFormatoYYYYMMDD;

       this.cuenta.socio = this.socio;


       this.creaSocio(this.socio,this.cuenta);


       this.mostrarFormularioBusqueda = true;
    this.mostrarFormularioDatos = false;
    } else {
      this.formularioDatos.markAllAsTouched();
    }
  }

    /*buscarCliente1() {
    if (this.formularioBusqueda.valid) {
      console.log("formulario Valido");
    this.mostrarFormularioBusqueda = false;
    this.mostrarFormularioDatos = true;

      // Aquí puedes enviar los datos al backend o hacer cualquier lógica adicional
    } else {
       console.log("Formuario Invalido");
      this.formularioBusqueda.markAllAsTouched();


    }
  }*/
  getErrorMessage(nombreCampo:string ) {
     return this.formularioBusqueda.get(nombreCampo).hasError('required')
     ? 'El campo es obligatorio ingresar.'
     : this.formularioBusqueda.get(nombreCampo).hasError("maxlength")
     ? 'El campo admite solo '+this.formularioBusqueda.get(nombreCampo).getError("maxlength").requiredLength+' caracteres.'
     : this.formularioBusqueda.get(nombreCampo).hasError("minlength")
     ? 'El campo admite como minimo solo '+this.formularioBusqueda.get(nombreCampo).getError("minlength").requiredLength+' caracteres.'
     : this.formularioBusqueda.get(nombreCampo).hasError("pattern")
     ? 'El valor del campo es incorrecto.'
     : "";


 }

 getErrorMessage1(nombreCampo:string ) {
     return this.formularioDatos.get(nombreCampo).hasError('required')
     ? 'El campo es obligatorio ingresar.'
     : this.formularioDatos.get(nombreCampo).hasError("maxlength")
     ? 'El campo admite solo '+this.formularioDatos.get(nombreCampo).getError("maxlength").requiredLength+' caracteres.'
     : this.formularioDatos.get(nombreCampo).hasError("minlength")
     ? 'El campo admite como minimo solo '+this.formularioDatos.get(nombreCampo).getError("minlength").requiredLength+' caracteres.'
     : this.formularioDatos.get(nombreCampo).hasError("pattern")
     ? 'El valor del campo es incorrecto.'
     : "";


 }

 buscarCliente(cedulaIdentidad:string) {
  this.messageService.clear();

if (this.formularioBusqueda.valid) {

this.appComponent.abrirProgreso();
  //  this.isErrorInServiceHistoria = "";
    //this.dataSourceHistoria = new MatTableDataSource([]);

     this.cedulaIdentidadBusqueda = this.formularioBusqueda.get("cedulaIdentidadBusqueda").value;
     console.log("cedulaIdentidad:"+this.cedulaIdentidadBusqueda);


    this.cuentasService
      .obtenerCuentas(null,this.cedulaIdentidadBusqueda,null,null)
      .subscribe(
        (respuesta) => {
          console.log('Respuesta Historia...:'+ respuesta);
          if (respuesta) {

            this.resultados = respuesta;
            if (this.resultados.length > 0){
                   this.messageService.add(ERROR_MESSAGE_APP.MENSAJE_SOCIO_EXISTENTE,"warning");

            } else  {


               this.mostrarFormularioBusqueda = false;
                 this.mostrarFormularioDatos = true;
            }

            setTimeout(() => {

            }, 500);

          } else {
            //this.isErrorInService = respuesta.error.mensajeError;
          }
         this.appComponent.cerrarProgreso();
        },
        (err) => {

         this.appComponent.cerrarProgreso();
        }
      );




      console.log("formulario Valido");


      // Aquí puedes enviar los datos al backend o hacer cualquier lógica adicional
    } else {
       console.log("Formuario Invalido");
      this.formularioBusqueda.markAllAsTouched();


    }



 }

 creaSocio(socio:Socio,cuenta:Cuenta) {
  this.messageService.clear();
    this.appComponent.abrirProgreso();
    this.socioService
      .crearSocio(this.socio)
      .subscribe(
        (respuesta) => {
          console.log('Respuesta crearSocio'+ respuesta);
          if (respuesta) {
            this.resultados = respuesta;
            this.creaCuenta(cuenta);


            setTimeout(() => {
            }, 500);
          } else {
          }
         this.appComponent.cerrarProgreso();
        },
        (err) => {

         this.appComponent.cerrarProgreso();
        }
      );
      console.log("formulario Valido");
      // Aquí puedes enviar los datos al backend o hacer cualquier lógica adicional




 }


  creaCuenta(cuenta:Cuenta) {
  this.messageService.clear();
    this.appComponent.abrirProgreso();
    this.cuentasService.crearCuenta
      (cuenta)
      .subscribe(
        (respuesta) => {
          console.log('Respuesta crearSocio'+ respuesta);
          if (respuesta) {
              this.messageService.add(ERROR_MESSAGE_APP.MENSAJE_SOCIO_CREA_EXITO,"success");
             console.log("Mensaje agregado al servicio");
            this.resultados = respuesta;

            setTimeout(() => {
            }, 500);
          } else {
          }
         this.appComponent.cerrarProgreso();
        },
        (err) => {

         this.appComponent.cerrarProgreso();
        }
      );
 }

 obtenerFechaSistema() {
  let fechaActualSistema = new Date();
  fechaActualSistema = fechaActualSistema;
  return fechaActualSistema;
}

convertirFechaACadenaFormato(fecha: Date): string {
  return moment(fecha).format('YYYY-MM-DD');
}

}


