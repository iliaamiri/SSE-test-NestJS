import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sse() {
    setInterval(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.eventEmitter.emit('sse.event', {
        allowhim: 'Hello world' + Math.random(),
      });
    }, 4000);
  }
}
