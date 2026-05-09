/**
 * Context Grammar — Data Schema (The Nexus)
 * Represents the structured "8 Tokens", "3 Brain Layers", and "23 AX Patterns"
 * Used by all agents (Simulator, Hero Interactive, Pattern Library)
 */

export const cgSchema = {
  tokens: {
    disclosure: { id: 'disclosure', type: 'dial', min: 0, max: 100, default: 50, label: 'Disclosure' },
    autonomy: { id: 'autonomy', type: 'dial', min: 0, max: 100, default: 20, label: 'Autonomy' },
    // The 6 Context Signals
    identity: { id: 'identity', type: 'signal', options: ['unknown', 'recognized', 'verified'] },
    history: { id: 'history', type: 'signal', options: ['none', 'recent', 'extensive'] },
    environment: { id: 'environment', type: 'signal', options: ['desktop', 'mobile', 'voice', 'api'] },
    urgency: { id: 'urgency', type: 'signal', options: ['low', 'normal', 'high'] },
    capability: { id: 'capability', type: 'signal', options: ['basic', 'pro', 'expert'] },
    sentiment: { id: 'sentiment', type: 'signal', options: ['neutral', 'frustrated', 'delighted'] }
  },
  brain: {
    layers: [
      { id: 'identity', timeframe: 'months', description: 'Core preferences and identity' },
      { id: 'learning', timeframe: 'weeks', description: 'Recent patterns and habits' },
      { id: 'now', timeframe: 'seconds', description: 'Immediate session context' }
    ]
  },
  axPatterns: [
    { id: 'delegate', name: 'Delegate', triggers: { autonomy: 'high', disclosure: 'low' }, description: 'AI acts independently without asking.' },
    { id: 'escalate', name: 'Escalate', triggers: { autonomy: 'low', disclosure: 'high' }, description: 'AI pauses and asks human for confirmation.' },
    { id: 'adapt', name: 'Adapt', triggers: { history: 'extensive' }, description: 'AI changes UI based on past behavior.' }
    // ... 20 more patterns will be populated by Agent 2
  ]
};
