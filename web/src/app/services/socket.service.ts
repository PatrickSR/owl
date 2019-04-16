import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { LogMessage } from '../model/log-message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: SocketIOClient.Socket;
  logMessageArray: LogMessage[];

  constructor() {
    this.logMessageArray = [];
  }

  public connectSocketIO(token): Observable<LogMessage[]> {
    this.socket = io(`http://134.175.178.149:3000?token=${token}`);
    return new Observable(observer => {

      this.socket.on('connect', () => {
        this.logMessageArray.push(new LogMessage('连接成功'));
        observer.next(this.logMessageArray);
      });

      this.socket.on('notification', payload => {
        if (!payload.message) { return; }
        this.logMessageArray.push(new LogMessage(payload.message, payload.type));
        observer.next(this.logMessageArray);
      });

    });
  }
}
