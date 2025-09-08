import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { Config } from 'app/shared/config/config';
import { ViewChild,ElementRef } from '@angular/core';
//import { FileService } from 'app/services/file.service';
//import * as fileSaver from 'file-saver';
import { RegistrarEventoService } from '../../../shared/services/registrar-evento.service';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import { Config } from '../../../shared/config/config';
import { FileService } from '../../../services/file.service';
@Component({
    selector: 'app-blank-page',
    templateUrl: './archivo-operaciones.component.html',
    styleUrls: ['./archivo-operaciones.component.scss']
})
export class ArchivoOperacionesComponent implements OnInit {
    selectedFile: any;
    selectedFileName: string;
    uploadPercentage: any;
    bandera:boolean;
    banderaBtnCargar:boolean;
    //Mensaje
    iconSel: string;
    mensajeSel: string;
    tipoMensajeSel: string;
    showMensaje: boolean;
    //Archivo descarga instructivo
    myFileName = Config.NOMBRE_ARCHIVO_INSTRUCTIVO_OPERACIONES;
    fileUrl = Config.RUTA_ARCHIVO_INSTRUCTIVO_OPERACIONES;

       //Intrucciones
       myFileName1 = Config.NOMBRE_ARCHIVO_DEFINICION_OPERACIONES;
       fileUrl1 = Config.RUTA_ARCHIVO_DEFINICION_OPERACIONES;
    //Prueba PlaceHolder
    myplaceHolder: string ='Buscar archivo'
    //

      //Intrucciones


    //
    positionOptions: TooltipPosition[] = [ 'above', 'below', 'left', 'right','after', 'before'];
    position = new FormControl(this.positionOptions[0]);
    //

    constructor(private http: HttpClient,private fileService: FileService,private registrarEventoService: RegistrarEventoService) {
    }
    ngOnInit() {
      this.showMensaje = false;
      this.banderaBtnCargar=true;
    }
    onFileSelected(event) {

        console.log("Ingresa a seleccionar el archivo");
        this.bandera=true;
        this.showMensaje = false;
        this.selectedFile = event.target.files[0];
        this.selectedFileName = this.selectedFile.name;
        let extensionArchivo = this.selectedFileName.split('.');
        let extension = extensionArchivo[1];
        let formatoArchivoCliente =  this.selectedFileName.substring(0,3);
        let formatoDia =  this.selectedFileName.substring(3,5);
        let formatoMes =  this.selectedFileName.substring(5,7);
        let formatoAno =  this.selectedFileName.substring(7,11);
        console.log("Tamaño Mombre*********:"+this.selectedFileName.length);

        if (formatoArchivoCliente != Config.INICIALNOMBREARCHIVOOPERACIONES || this.validarFecha(formatoDia,formatoMes,formatoAno) ==false ||this.selectedFileName.length>15 ) {
          let mensaje =" El nombre del archivo es incorrecto"
          this.setError(Config.ERROR, mensaje, Config.ERROR_ICON);
          this.bandera=false;
        } else if (extension!= 'txt') {
          let mensaje =" El archivo no fue cargado extensión inválida"
          this.setError(Config.ERROR, mensaje, Config.ERROR_ICON);
          this.bandera=false;
        } else if (this.selectedFile.size==0) {
          let mensaje =" El archivo no fue cargado tamaño 0, corrija y vuelva a cargar"
          this.setError(Config.ERROR, mensaje, Config.ERROR_ICON);
          this.bandera=false;
        }  else if (this.selectedFile.size>=Config.TAMANOARCHIVOOPERACIONES) {
          let mensaje =" El archivo ingresado debe ser menor a 3M"
          this.setError(Config.ERROR, mensaje, Config.ERROR_ICON);
          this.bandera=false;
        } else if(this.bandera == true) {
          let mensaje =" El archivo fue cargado con éxito"
          this.banderaBtnCargar=false;
          this.setError(Config.SUCCESS, mensaje, Config.SUCCESS_ICON);
        }
        this.checkPlaceHolder();

        //llama al servicio registrarEventoService
        this.registrarEventoService.registroEvento(event.identificacion, 'CBusqueda').subscribe();
    }

    onCanceled (event) {
      this.selectedFileName="";
      this.showMensaje = false;
      this.bandera=false;
      this.banderaBtnCargar=true;
      this.myplaceHolder = 'Buscar archivo'
    }



    onFileUpload(event) {
    //  this.selectedFile.console.log(event);
        const formData: FormData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        // formData.append('file', 'dfsdfsdf');
        formData.append('something', 'dsfsdfsdfsdf');
        const header  = new HttpHeaders();
        header.append( 'Content-Type', 'multipart/form-data');
        const req = new HttpRequest('POST', 'http://10.0.176.247:8080/fileupload', formData, {
            reportProgress: true,
            headers: header
          });
          this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              // calculate the progress percentage
              const percentDone = Math.round(100 * event.loaded / event.total);
                console.log('upload percentage==> ' + percentDone);
                this.uploadPercentage = percentDone;
            } else if (event instanceof HttpResponse) {
              // Close the progress-stream if we get an answer form the API
              // The upload is complete
              console.log('upload done ==|');
            }
          });
    }


validarFecha ( formatoDia:string,formatoMes:string,formatoAno:string) {
let banderaFormato:boolean;
if (isNaN(parseInt(formatoDia))||isNaN(parseInt(formatoMes))||  isNaN(parseInt(formatoAno))) {
  banderaFormato=  false;
} else if (parseInt(formatoDia) > 31 || parseInt(formatoDia) <=0 ) {
    banderaFormato=  false;
    console.log("banderaFormato 1:  "+banderaFormato);
  } else if (parseInt(formatoMes)>12 || parseInt(formatoMes) <=0  )  {
    banderaFormato= false;
    console.log("banderaFormato 2:  "+banderaFormato);
  } else if ((parseInt(formatoAno) <1900)  ){
    banderaFormato= false;
    console.log("banderaFormato 3:  "+banderaFormato);
  }
  else {
    banderaFormato= true;
  }
  console.log("banderaFormato: "+banderaFormato);
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
    checkPlaceHolder() {
      if (this.myplaceHolder) {
        this.myplaceHolder = null
        return;
      } else {
        this.myplaceHolder = 'Buscar archivo'
        return
      }
    }

    download() {

      console.log("Ingresa a la descarga");
      this.fileService.downloadFile().subscribe((response: any) => { //when you use stricter type checking
        let blob:any = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        //fileSaver.saveAs(this.fileUrl1, this.myFileName1);
        //fileSaver.saveAs(this.fileUrl, this.myFileName);

        this.descargaInstructivo();

      }), (error: any) => console.log('Error downloading the file') //when you use stricter type checking
                  // () =>this.descargaInstructivo();// console.info('File downloaded successfully');


    }

    descargaInstructivo() {
      console.log("Descargar Instructivo");
      let mensaje ="La descarga se realizó con éxito"
      //this.banderaBtnCargar=false;
      this.setError(Config.SUCCESS, mensaje, Config.SUCCESS_ICON);

    }





}
