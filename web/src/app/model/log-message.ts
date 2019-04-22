import * as Moment from 'moment';
export class LogMessage {
  // console or request
  type: string;
  message: any;
  simpleMessage: string;

  constructor(payload: {message: any, type: string}) {
    this.message = payload.message;
    this.type = payload.type;

    this.simpleMessage = this.generateSimpleMessage();
  }

  private generateSimpleMessage(): string {
    if (this.type === 'request') {
      return this.generateRequestSimpleMsg();
    } else {
      return this.generateConsoleSimpleMsg();
    }
  }

  private generateRequestSimpleMsg(): string {
    return `[${Moment().format('YYYY-MM-DD HH:mm:ss')}] 请求：${this.message.request.url} | 状态码：${this.message.res.statusCode}`;
  }

  private generateConsoleSimpleMsg(): string {
    return `[${Moment().format('YYYY-MM-DD HH:mm:ss')}] ${this.message.toString().substring(0, 50)}`;
  }
}
