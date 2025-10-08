import { PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../config/aws';

const TABLE_NAME = 'game-sessions';

export interface GameSession {
  sessionId: string;
  playerId: string;
  mode: 'four' | 'five';
  score: number;
  createdAt: string;
  updatedAt: string;
}

export class GameSessionService {
  /**
   * Create a new game session
   */
  static async createSession(session: GameSession): Promise<void> {
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: session,
      })
    );
  }

  /**
   * Get a game session by ID
   */
  static async getSession(sessionId: string): Promise<GameSession | null> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { sessionId },
      })
    );
    return result.Item as GameSession | null;
  }

  /**
   * Update session score
   */
  static async updateScore(sessionId: string, score: number): Promise<void> {
    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { sessionId },
        UpdateExpression: 'SET score = :score, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':score': score,
          ':updatedAt': new Date().toISOString(),
        },
      })
    );
  }

  /**
   * Delete a game session
   */
  static async deleteSession(sessionId: string): Promise<void> {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { sessionId },
      })
    );
  }
}
