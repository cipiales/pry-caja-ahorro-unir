import { async, ComponentFixture, inject,TestBed, } from '@angular/core/testing';

import { HttpClientTestingModule,HttpTestingController } from '@Angular/common/http/testing';
import {ArchivoClienteComponent } from './archivo-cliente.component';
import { Config } from 'app/shared/config/config';
import { FileService } from 'app/services/file.service';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


describe('ArchivoClienteComponent', () => {
    let component: ArchivoClienteComponent;
    let fixture: ComponentFixture<ArchivoClienteComponent>;
    
    let httpClientSpy: { get: jasmine.Spy };
    //let service = new FileService(httpClientSpy as any);

    let service: FileService;
    let httpMock: HttpTestingController;

    beforeEach(
      
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ArchivoClienteComponent],
                imports: [HttpClientTestingModule,MaterialFileInputModule],
                providers: [FileService]
            }).compileComponents();

            service = TestBed.get(FileService);
            httpMock = TestBed.get(HttpTestingController);
        }
 
        )

        
    );

    beforeEach(() => {
     // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
       

        fixture = TestBed.createComponent(ArchivoClienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set submitted to true', async(() => {
      component.onCanceled(); //  Llame directamente a la función onSubmit internamente, el envío se cambia atrue
      expect(component.selectedFile).toEqual(null);
    }));

    it('#onCanceled() should clean', () => {
      //const comp = new ArchivoClienteComponent();    
      component.onCanceled();
      expect(component.selectedFileName).toBe('');
      expect(component.bandera).toBe(false);
      expect(component.banderaBtnCargar).toBe(true);
 
    });


    it('#clean deberia limpiar Tooltip', () => {      
      let clean:boolean;
      component.clean(clean);
      expect(component.doClean ).toBe(clean);
      expect(component.selectedType ).toBe(null); 
    });

    it('#selectType deberia Seleccionar el tipo del ToolTip', () => {      
      let type:string;
      component.selectType(type );
      expect(component.selectedType  ).toBe(type); 
    });

    it('#descargar Instrictivo', () => {      
      let mensaje ="La descarga se realizó con éxito"
      component.mensajedescargaInstructivo();

      expect(component.setError(Config.SUCCESS,mensaje,Config.SUCCESS_ICON)  ); 
    });

    it('#closeMensajeEvent deberia cerrar el mensaje', () => {           
      component.closeMensajeEvent();
      expect(component.showMensaje).toBe(false); 
    });

    it("Validar Año menor a 1900", () => {
      expect(component.validarFecha("10", "09", "1600")).toEqual(false);            
    });
    
    it("Validar Dia mayor a 31", () => {
      expect(component.validarFecha("32", "09", "1900")).toEqual(false);            
    });
    it("Validar mes mayor a 12", () => {
      expect(component.validarFecha("10", "14", "1900")).toEqual(false);            
    });

   it("Validar dia mes año  indefinidos", () => {
      expect(component.validarFecha("NaN", "NaN", "NaN")).toEqual(false);            
    });


    it('#onFileSelected deberia seleccionar el archivo ', () => {         
       const mockFile = new File([''], 'filename', { type: 'text/html' });      
       const mockEvt = { target: { files: [mockFile] } };
       component.bandera = true;  
       component.banderaBtnCargar  = false;    
       let mensaje ="El Archivo fue cargado con éxito"               
       expect( component.onFileSelected(mockEvt));         
     });
 

     it("Validar extension txt", () => {      
      expect(component.validarArchivo("CLI","doc",null,"10","20","1500")).toEqual(false);            
    });
    it("Validar tamaño  archivo 0", () => {            
      expect(component.validarArchivo("CLI","txt",0,"10","20","1500")).toEqual(false);            
    });
  
    
    it("Validar tamaño mayor a  3M", () => {            
      expect(component.validarArchivo("CLI","txt",4000000,"10","20","1500")).toEqual(false);            
    });

    it("Validar Formato del Archivo", () => {            
      expect(component.validarArchivo("CLIXXX","txt",400,"10","20","1500")).toEqual(false);            
    });

    it("Validar Archivo exitoso", () => {     
      component.selectedFileName ="CLI31082021";   
      expect(component.validarArchivo("CLI","txt",400,"02","02","2021")).toEqual(true);            
    });

     it(`should fetch posts as an Observable`, async(inject([HttpTestingController, FileService],
      (httpClient: HttpTestingController, service: FileService) => {
  
    

        let response = new Blob();
        
  
        service.downloadFile()
          .subscribe((get: any) => {
            expect(get).toBe(response);
          });
         // component.download();
  
        let req = httpMock.expectOne('http://localhost:4200');
        expect(req.request.method).toBe("GET");
  
        req.flush(response);
        httpMock.verify();
  
      })));

       it('#download deberia descargar el instructivo', () => {      
      
      let myFileName = Config.NOMBRE_ARCHIVO_INSTRUCTIVO;
      let  fileUrl = Config.RUTA_ARCHIVO_INSTRUCTIVO;
      //Intrucciones
       let myFileName1 = Config.NOMBRE_ARCHIVO_DEFINICION;
       let fileUrl1 = Config.RUTA_ARCHIVO_DEFINICION;

       
             
       let response = new Blob();
       let blob:any = new Blob([response], { type: 'application/octet-stream' });

       const url = window.URL.createObjectURL(blob);
       component.download();
    
       expect(response).toEqual(blob);
     });


     it('#Deberia retornar error ', () => {      
       const errorResponse = new HttpErrorResponse ({
         error:'test 404 error',
         status:404,
         statusText:'Not Found'
       });
  
       expect(component.download()).toBeUndefined();
     });

     it("Validar descarga de File", () => {    
       
      let myFileName = Config.NOMBRE_ARCHIVO_INSTRUCTIVO;
      let  fileUrl = Config.RUTA_ARCHIVO_INSTRUCTIVO;
      //Intrucciones
       let myFileName1 = Config.NOMBRE_ARCHIVO_DEFINICION;
       let fileUrl1 = Config.RUTA_ARCHIVO_DEFINICION;      
       let blob:Blob;
      expect(component.dercargarFile(fileUrl,fileUrl1,myFileName,myFileName1,blob));            
    });


    it('Deberia validar el error', () => {      
      let mensaje =null
      let tipoError =Config.ERROR;      
      expect(component.setError(tipoError,mensaje,Config.ERROR_ICON)  ); 
    });


});
