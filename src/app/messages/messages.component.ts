import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) {/*Angular will inject the singleton MessageService into that property when it creates the MessagesComponent.
    The messageService property must be public because you're about to bind to it in the template.
    Angular only binds to public component properties.
    */
  }
  ngOnInit() {
  }

}
