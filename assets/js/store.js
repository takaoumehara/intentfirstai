/**
 * Global State Manager (Pub/Sub Event Bus)
 * Enables cross-communication between the 5 Agent workstreams.
 */

class Store {
  constructor() {
    this.state = {
      dials: {
        disclosure: 50,
        autonomy: 20
      },
      signals: {
        identity: 'unknown',
        history: 'none',
        environment: 'desktop',
        urgency: 'normal',
        capability: 'basic',
        sentiment: 'neutral'
      },
      activePattern: 'escalate'
    };
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  getState() {
    return this.state;
  }

  updateDial(dialId, value) {
    if (this.state.dials[dialId] !== undefined) {
      this.state.dials[dialId] = value;
      this.notify();
    }
  }

  updateSignal(signalId, value) {
    if (this.state.signals[signalId] !== undefined) {
      this.state.signals[signalId] = value;
      this.notify();
    }
  }

  setActivePattern(patternId) {
    if (this.state.activePattern !== patternId) {
      this.state.activePattern = patternId;
      this.notify();
    }
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const globalStore = new Store();
