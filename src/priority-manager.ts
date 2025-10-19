export class PriorityManager {
  private currentLevel: number = 0;
  private readonly lastPriorityLevel: number;
  private readonly items = new Map<number, string[]>();
  private readonly priorityChangedListeners: ((currentPriority: number) => void)[] = [];

  private readonly freeItemCbs: Record<string, () => void> = {};
  
  constructor(lastPriorityLevel: number = 3) {
    if (lastPriorityLevel < 1) {
      throw new Error(`lastPriorityLevel needs to be >= 1. Got ${lastPriorityLevel}.`);
    }
    this.lastPriorityLevel = lastPriorityLevel;
  }

  registerItem(level: number, identifier: string): () => void {
    if (level < 0 || level > this.lastPriorityLevel) {
      throw new Error(`Priority level needs to be >= 0 and <= ${this.lastPriorityLevel}. Got ${level}.`);
    }
    const subs = this.items.get(level) ?? [];
    const index = subs.indexOf(identifier);
    const CB_KEY = `${level}:${identifier}`;

    if (index === -1) {
      subs.push(identifier);
      this.items.set(level, subs);

      this.freeItemCbs[CB_KEY] = () => {
        const newSubs = this.items.get(level) ?? [];
        const index = newSubs.indexOf(identifier);
        if (index > -1) {
          newSubs.splice(index, 1);
          this.setNextPriority(newSubs);
        }

        delete this.freeItemCbs[CB_KEY];
      };
    }

    return this.freeItemCbs[CB_KEY];
  }

  private getCurrentLevelItems() {
    return this.items.get(this.currentLevel) ?? [];
  }

  private setNextPriority(currentSubs: string[]) {
    if (currentSubs.length === 0 && this.currentLevel < this.lastPriorityLevel) {
      this.currentLevel += 1;
      const newSubs = this.getCurrentLevelItems();
      
      for (const cb of this.priorityChangedListeners) {
        cb(this.currentLevel);
      }

      if (newSubs.length === 0) {
        this.setNextPriority(newSubs);
      }
    }
  }

  onPriorityChanged(cb: (newPriority: number) => void) {
    this.priorityChangedListeners.push(cb);

    return () => { // unsubscribe
      const index = this.priorityChangedListeners.indexOf(cb);
      if (index > -1) {
        this.priorityChangedListeners.splice(index, 1);
      }
    };
  }
}
