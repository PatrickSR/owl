import { Component, OnInit } from '@angular/core';
import { LogService } from './services/log.service';
import { SocketService } from './services/socket.service';
import { LogMessage } from './model/log-message';
import { Observable, Subscription, of } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  connectQrCodeId: string;

  allMessage$: Observable<LogMessage>;

  // 全部信息
  allMessage: LogMessage[] = [];

  // 只有console的消息
  consoleMessageOnly: LogMessage[] = [];

  // 只有request的消息
  requestMessageOnly: LogMessage[] = [];

  constructor(private logService: LogService, private socketService: SocketService) {

  }


  ngOnInit(): void {
    this.connectQrCodeId =  this.logService.generateConnectId();

    this.allMessage$ = this.socketService.connectSocketIO(this.connectQrCodeId);

    // this.initObservables();

    this.subscibeLogMessage();

  }


  private subscibeLogMessage() {
    // this.allMessage$.
    this.allMessage$.subscribe(logMessage => {
      this.allMessage.push(logMessage);
    });

    this.allMessage$.pipe(
      filter( logMessage => {
        return logMessage.type === 'console';
      }
     )
    ).subscribe(logMessage => {
      this.consoleMessageOnly.push(logMessage);
    });

    this.allMessage$.pipe(
      filter( logMessage => {
        return logMessage.type === 'request';
      }
     )
    ).subscribe(logMessage => {
      this.requestMessageOnly.push(logMessage);
    });

  }

}
