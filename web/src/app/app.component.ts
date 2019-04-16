import { Component, OnInit } from '@angular/core';
import { LogService } from './services/log.service';
import { SocketService } from './services/socket.service';
import { LogMessage } from './model/log-message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  connectQrCodeId: string;
  logMessageArray: Observable<LogMessage[]>;

  constructor(private logService: LogService, private socketService: SocketService) {

  }


  ngOnInit(): void {
    this.connectQrCodeId =  this.logService.generateConnectId();
    this.logMessageArray = this.socketService.connectSocketIO(this.connectQrCodeId);
  }

}
