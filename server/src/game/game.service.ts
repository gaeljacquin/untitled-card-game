import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  private endpoint = process.env.AWS_LAMBDA_URL;

  constructor() {}

  async abCheckLambda(wordMap: { [key: string]: unknown }): Promise<object> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wordMap }),
    });
    const data = await response.json();

    return data;
  }
}
