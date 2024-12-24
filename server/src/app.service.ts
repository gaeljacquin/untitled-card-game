import { Injectable } from '@nestjs/common';
import { SUITS } from '@annabelle/shared/dist/types/suit';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(SUITS);
    return 'Hello World!';
  }
}
