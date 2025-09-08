import { Component, OnInit,Input } from '@angular/core';
import { MessageService } from '../../../shared/services/message-services/message.service';


@Component({
  selector: 'sca-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  constructor(public messageService: MessageService) {


  }

  ngOnInit() {


  }

}


