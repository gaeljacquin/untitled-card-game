import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  private endpoint = process.env.AWS_LAMBDA_URL;

  constructor() {}

  async abCheckLambda(word: string): Promise<object> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word }),
    });
    const data = await response.json();

    return data;
  }
}
