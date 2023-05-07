class BotBase {
  constructor(name, avatar) {
    this.name = name;
    this.avatar = avatar;
  }

  getInfo() {
    return {
      name: this.name,
      avatar: this.avatar
    };
  }

  greet() {
    return `Hi, I am ${this.name}. Nice to meet you!`;
  }

  handleAction(action, args) {
    console.warn(`handleAction not implemented for ${this.name}`);
  }
}

export default BotBase;
