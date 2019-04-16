import { Injectable } from '@angular/core';
import nanoid from 'nanoid';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  public generateConnectId(): string {
    return nanoid();
  }
}
