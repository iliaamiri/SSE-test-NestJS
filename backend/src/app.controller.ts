import {
  Controller,
  Get,
  Res,
  Sse,
  MessageEvent,
  OnModuleInit,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, Subject, fromEvent, interval, map } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  private eventSubject: Subject<any>;

  constructor(
    private readonly appService: AppService,
    private eventEmitter: EventEmitter2,
  ) {
    this.eventSubject = new Subject();
  }

  onModuleInit() {
    this.eventEmitter.onAny((eventName, payload) => {
      console.log('eventEmitter.onAny', eventName, payload);
      this.eventSubject.next({ eventName, payload });
    });
  }

  @Get()
  getHello(): string {
    this.appService.sse();
    return this.appService.getHello();
  }

  @Sse('/sse')
  async sse(@Res() res: Response): Promise<Observable<MessageEvent>> {
    return fromEvent(this.eventEmitter, 'sse.event').pipe(
      map((payload) => ({
        data: JSON.stringify(payload),
      })),
    );
  }
}
