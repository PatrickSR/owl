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

  public connectSocketIO(key): Observable<LogMessage> {
    this.socket = io(`http://134.175.178.149:3000?roomId=${key}&from=web`);
    return new Observable(observer => {

      this.socket.on('connect', () => {
        observer.next(new LogMessage({
          message: '连接成功',
          type: 'console'
        }));
      });

      this.socket.on('notification', payload => {
        // if (!payload.message) { return; }
        observer.next(new LogMessage(payload));
      });

    });
  }
}
