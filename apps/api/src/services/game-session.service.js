import { PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../config/aws';
const TABLE_NAME = 'game-sessions';
export class GameSessionService {
    /**
     * Create a new game session
     */
    static async createSession(session) {
        await docClient.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: session,
        }));
    }
    /**
     * Get a game session by ID
     */
    static async getSession(sessionId) {
        const result = await docClient.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { sessionId },
        }));
        return result.Item;
    }
    /**
     * Update session score
     */
    static async updateScore(sessionId, score) {
        await docClient.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { sessionId },
            UpdateExpression: 'SET score = :score, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ':score': score,
                ':updatedAt': new Date().toISOString(),
            },
        }));
    }
    /**
     * Delete a game session
     */
    static async deleteSession(sessionId) {
        await docClient.send(new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { sessionId },
        }));
    }
}
