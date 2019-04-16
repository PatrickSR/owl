export class LogMessage {
  type?: string;
  payload: string;

  constructor(message: string, type: string = 'log') {
    this.payload = message;
    this.type = type;
  }
}
