import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { Config } from 'app/shared/config/config';
//import { FileService } from 'app/services/file.service';
import * as fileSaver from 'file-saver';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
//import { DetalleArchivoSalida, RespuestasEjecucion } from 'app/models/detalle-archivo-salida';
import {MatTableDataSource} from '@angular/material/table';
import { Config } from '../../../shared/config/config';
import { DetalleArchivoSalida, RespuestasEjecucion } from '../../../models/detalle-archivo-salida';
import { FileService } from '../../../services/file.service';

@Component({
    selector: 'app-archivo-cliente',
    templateUrl: './archivo-cliente.component.html',
    styleUrls: ['./archivo-cliente.component.scss']
})
export class ArchivoClienteComponent implements OnInit {
    selectedFile: any;
    selectedFileName: string;
    uploadPercentage: any;
    bandera:boolean;
    banderaBtnCargar:boolean;
    banderaPlaceHolder:boolean;
    //Mensaje
    iconSel: string;
    mensajeSel: string;
    tipoMensajeSel: string;
    showMensaje: boolean;
    //Archivo descarga instructivo
    myFileName = Config.NOMBRE_ARCHIVO_INSTRUCTIVO;
    fileUrl = Config.RUTA_ARCHIVO_INSTRUCTIVO;
   //Intrucciones
    myFileName1 = Config.NOMBRE_ARCHIVO_DEFINICION;
    fileUrl1 = Config.RUTA_ARCHIVO_DEFINICION;

    ///
    doClean = false;
    selectedType: string | null = null;
    types: string[] = ['individual', 'massive'];
    //
    positionOptions: TooltipPosition[] = [ 'above', 'below', 'left', 'right','after', 'before'];
    position = new FormControl(this.positionOptions[0]);
    //
    detalleArchivoSalida: DetalleArchivoSalida;
    respuestasEjecucion:RespuestasEjecucion[];
    //
    cargando:boolean=false;
    errorHttp = false;
    //tabla Temporal
    dataSource: MatTableDataSource<RespuestasEjecucion>;
    headers: string[] = ['linea', 'detalleEjecucion'];
    constructor(private http: HttpClient,private fileService: FileService) {

    }
    ngOnInit() {
      this.showMensaje = false;
      this.banderaBtnCargar =true;
      this.banderaPlaceHolder = true;
    }
    onFileSelected(event) {
       this.showMensaje = false;
       this.detalleArchivoSalida= null;
       this.dataSource = null;
        this.bandera=true;
        this.showMensaje = false;
        if(event != undefined) {
        this.selectedFile = event.target.files[0];
        this.selectedFileName = this.selectedFile.name;
        let extensionArchivo = this.selectedFileName.split('.');
        let extension =extensionArchivo[1];
        let formatoArchivoCliente =  this.selectedFileName.substring(0,3);
        let formatoDia =  this.selectedFileName.substring(3,5);
        let formatoMes =  this.selectedFileName.substring(5,7);
        let formatoAno =  this.selectedFileName.substring(7,11);
        let tamanoArchivo = this.selectedFile.size;

        this.validarArchivo(formatoArchivoCliente,extension,tamanoArchivo,formatoDia,formatoMes,formatoAno);

        /*if(this.bandera == true) {
          let mensaje ="El Archivo fue cargado con éxito"
          this.banderaBtnCargar = false;
          this.setError(Config.SUCCESS, mensaje, Config.SUCCESS_ICON);
        }*/
}

    }

    validarArchivo (formatoArchivoCliente:string,extension:string, tamanoArchivo:number,formatoDia:string,formatoMes:string,formatoAno:string) {
       if (extension!= 'txt') {
        let mensaje =" El Archivo no fue cargado extensión inválida"
        this.setError(Config.ERROR, mensaje, Config.ERROR_ICON);
        this.bandera = false;
      }  else if (tamanoArchivo==0) {
        let mensaje ="El Archivo no fue cargado tamaño 0"
        this.setError(Config.ERROR, mensaje, Config.ERROR_ICON);
        this.bandera = false;
      }  else if (tamanoArchivo>=Config.TAMANOARCHIVOCLIENTES) {
        let mensaje ="El Archivo ingresado debe ser menor a 3M"
        this.setError(Config.ERROR, mensaje, Config.ERROR_ICON);
        this.bandera = false;
      } else if (formatoArchivoCliente != Config.INICIALNOMBREARCHIVOCLIENTES || this.validarFecha(formatoDia,formatoMes,formatoAno) ==false ||this.selectedFileName.length>15 ) {
        let mensaje =" El nombre del archivo es incorrecto"
        this.setError(Config.ERROR, mensaje, Config.ERROR_ICON);
        this.bandera = false;
      } else {
        let mensaje ="El Archivo fue cargado con éxito"
        this.banderaBtnCargar = false;
        this.setError(Config.SUCCESS, mensaje, Config.SUCCESS_ICON);
        this.bandera=true;

      }
      return this.bandera;
    }

    onCanceled () {
      this.selectedFile = null;
      this.selectedFileName = "";
      this.showMensaje = false;
      this.bandera=false;
      this.banderaBtnCargar=true;
      this.banderaPlaceHolder=true;
      this.detalleArchivoSalida=null;
    }

    onFileUpload() {

    }
    /*consultarResumenDetalle(codigoLineaCredito: string) {
      this.entrada = new DetalleMacEntrada();
      this.entrada.bodyIn.codigoLineaCredito = codigoLineaCredito;
      return this.http.post<DetalleMacSalida>(SERVICE_URL_CONFIG.BASE_URL + SERVICE_URL_CONFIG.CONSULTAR_LINEA_INTERVINIENTE, this.entrada)
        .pipe(
          map(respuesta => {
            return respuesta;
          })
        );
    }*/
validarFecha ( formatoDia:string,formatoMes:string,formatoAno:string) {

  let banderaFormato:boolean = true;
  if (isNaN(parseInt(formatoDia)) || isNaN(parseInt(formatoMes))  || isNaN(parseInt(formatoAno)) ) {
    banderaFormato=  false;
    console.log("banderaFormato 0:  "+banderaFormato);
  } else if (parseInt(formatoDia) > 31 || parseInt(formatoDia) <=0 ) {
    banderaFormato=  false;
    console.log("banderaFormato 1:  "+banderaFormato);
  } else if (parseInt(formatoMes)>12 || parseInt(formatoMes) <=0  )  {
    banderaFormato= false;
    console.log("banderaFormato 2:  "+banderaFormato);
  } else if ((parseInt(formatoAno) <1900) ){
    banderaFormato= false;
  }
  /*else {
    banderaFormato= true;
  }*/
  console.log("banderaFormato:"+banderaFormato);
  return banderaFormato;
}
    setError(tipoError: string, mensaje: string, icon: string) {
      console.log("tipoError:"+tipoError +"mensaje:"+ mensaje+ "icon:"+icon);
      if (!mensaje && tipoError === Config.ERROR) {
        mensaje = 'Existe un inconveniente. Por favor intente mas tarde.';
      }
      console.log("mensaje:"+mensaje);
      this.iconSel = icon;
      this.mensajeSel = mensaje;
      this.tipoMensajeSel = tipoError;
      this.showMensaje = true;
    }
    closeMensajeEvent() {
      this.showMensaje = false;
    }

    download() {
       this.fileService.downloadFile().subscribe((response: any) => { //when you use stricter type checking
        this.dercargarFile(this.fileUrl,this.fileUrl1,this.myFileName,this.myFileName1, response);
      }), (error: any) =>  console.log('Error downloading the file:') //when you use stricter type checking


    }

    dercargarFile(fileUrl:string,fileUrl1:string,myFileName:string,myFileName1:string, response:Blob) {
        let blob:any = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        fileSaver.saveAs(this.fileUrl, this.myFileName);
        fileSaver.saveAs(this.fileUrl1, this.myFileName1);
        this.mensajedescargaInstructivo();
    }

    mensajedescargaInstructivo() {
      let mensaje ="La descarga se realizó con éxito"
      this.setError(Config.SUCCESS, mensaje, Config.SUCCESS_ICON);

    }
    selectType(type: string | null): void {
      this.selectedType = type;
    }
    clean(clean: boolean): void {
      this.doClean = clean;
      this.selectedType = null;
    }
}
