class StateMachine {
  private state: boolean = false;

  getAndCleanState() {
    const result = this.state;
    this.state = false;
    return result;
  }

  closeState() {
    this.state = false;
  }

  openState() {
    this.state = true;
  }
}

export const stateMachine = new StateMachine();
