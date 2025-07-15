import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
//import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {ChoresService} from '../../services/chores/chores.service';
import {ChoreInterface} from '../../services/chores/choreInterface';
//import {NotifierComponent} from '../../components/notifier/notifier.component';
//import {MatSnackBar} from '@angular/material/snack-bar';
//import {MatDialog} from '@angular/material/dialog';
//import {DialogComponent} from '../../components/dialogs/dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EXP_REGULARES } from '../../shared/exp-regulares/exp-regulares';
import { CuentasService } from '../../services/cuentas.service';
import { Cuenta } from '../../shared/model/cuenta';






@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit , AfterViewInit{

  doClean = false;
  searchError: string | null = null;
  chores: ChoreInterface[] = [];
  selectedType: string | null = null;
  headers: string[] = ['id', 'description', 'status'];
  selection = new SelectionModel<ChoreInterface>(true, []);
  dataSource: MatTableDataSource<ChoreInterface>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})

  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }


    busquedaForm: FormGroup;
    formBusqueda: FormGroup;/////

      cuentas: Cuenta[] = [];


  resultados: Cuenta[] = [];


    constructor(private fb: FormBuilder,private choresService: ChoresService,private constructorBusquedaForm: FormBuilder,private cuentasService:CuentasService) {
      this.dataSource = new MatTableDataSource(this.chores);

      this.busquedaForm = this.constructorBusquedaForm.group({
      numeroCuenta: ["", [Validators.pattern("^[0-9]*$")]],
      cedulaIdentidad: [ "",[Validators.pattern(EXP_REGULARES.SOLO_DIGITOS),],],
      NombreCompleto: ["",[Validators.pattern(EXP_REGULARES.SOLO_TEXTO),],],
      estado: ["",[Validators.pattern(EXP_REGULARES.SOLO_TEXTO),],],

    });

     this.formBusqueda = this.fb.group(
      {
      criterio: ['Todos'],
      valor: [''],
      estado:['']
    });

    }



    ngOnInit() {

    }

    ngAfterViewInit(): void {
      console.log("Llega hasta aqui chores");
      this.choresService.getChores().subscribe(
        (data) => {
          this.chores = data;
          this.dataSource = new MatTableDataSource(this.chores);
        }
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      console.log('filterValue', filterValue);
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    clean(clean: boolean): void {
      this.doClean = clean;
      this.searchError = null;
      this.chores = [];
      this.selection.clear();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean {
      const numSelected = this.selection.selected.length;
      const numRows = this.chores.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    // tslint:disable-next-line:typedef
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.chores);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ChoreInterface): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
    }

  buscarCuentas(estado:string,cedulaIdentidad:string,cuenta:string) {





  //this.appComponent.abrirProgreso();
  //  this.isErrorInServiceHistoria = "";
    //this.dataSourceHistoria = new MatTableDataSource([]);


    this.cuentasService
      .obtenerCuentas(estado,cedulaIdentidad,cuenta)
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

  buscarCuentasFormulario() {

    let criterio = this.formBusqueda.get("criterio").value;
    console.log("criterio:"+criterio);
    let valor = this.formBusqueda.get("valor").value;
    console.log("valor:"+valor);
    let estado = this.formBusqueda.get("estado").value;
    console.log("estado:"+estado);

    if (criterio === 'Todos') {
       this.buscarCuentas(null,null,null);
    } else if  (criterio === 'NumeroCuenta') {


      this.buscarCuentas(null,null,valor);

    } else if  (criterio === 'Cedula') {
      this.buscarCuentas(null,valor,null);

    }
  }

  getErrorMessage(nombreCampo:string) {
  return this.formBusqueda.get(nombreCampo).hasError('required')
    ? 'El campo es obligatorio ingresar.'
    : this.formBusqueda.get(nombreCampo).hasError("pattern")
    ? "El campo permite ingresar unicamente números"
    : this.formBusqueda.get(nombreCampo).hasError("backend")
  ? 'El número de cargas debe ser un número positivo mayor que 0 y menor que 99'
  : this.formBusqueda.get(nombreCampo).hasError("errorFecha")
  ? 'La fecha de nacimiento no puede ser mayor a la fecha del sistema'
  : this.formBusqueda.get(nombreCampo).hasError("maxlength")
  ? 'El campo admite solo 80 caracteres'
  : "";
}

onClickCriterio(){
  console.log("Onclick en Criterio");
   this.formBusqueda.get("valor").setValue("");
   //this.formBusqueda.get("criterio").setValue("");

   let criterio = this.formBusqueda.get("criterio").value;
   console.log("criterio:"+criterio);

   if (criterio === 'Todos') {
    console.log("Ingresa a todos");
       this.formBusqueda.get("valor").setValidators(
  null
);
    } else {
      console.log("Diferente de todos");
      this.formBusqueda.get("valor").setValidators(
  [Validators.required]
);
}


    }




}







