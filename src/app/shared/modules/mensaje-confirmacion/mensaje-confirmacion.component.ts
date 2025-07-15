import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.scss']
})
export class MensajeConfirmacionComponent implements OnInit {
  @Input()
  mensaje: string;

  @Input()
  tipoMensaje: string;

  @Input()
  icon: string;

  @Output()
  disableMensaje = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {

  }


  cerrar() {
    this.disableMensaje.emit();
  }

}

