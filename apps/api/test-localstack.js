import { GameSessionService } from './src/services/game-session.service';
async function test() {
    console.log('🧪 Testing LocalStack integration...\n');
    // Create a test session
    const session = {
        sessionId: 'test-session-' + Date.now(),
        playerId: 'player-123',
        mode: 'four',
        score: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    console.log('📝 Creating session:', session.sessionId);
    await GameSessionService.createSession(session);
    console.log('📖 Reading session...');
    const retrieved = await GameSessionService.getSession(session.sessionId);
    console.log('✅ Retrieved:', retrieved);
    console.log('\n🎉 Test complete! LocalStack is working.');
}
test().catch(console.error);
