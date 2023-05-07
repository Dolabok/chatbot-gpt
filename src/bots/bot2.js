import BotBase from './botBase';
import { saveMessage } from '../utils/localStorage';
import { renderMessages } from '../components/messages';

class FactBot extends BotBase {
  constructor() {
    super('FactBot', 'https://www.onlygfx.com/wp-content/uploads/2018/03/fact-stamp-1.png');
  }

  async random() {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await response.json();
    return data.text;
  }

  async randomByLanguage(language) {
    try {
      const response = await fetch(`https://uselessfacts.jsph.pl/random.json?language=${language}`);
      const data = await response.json();
      return data.text;
    } catch (error) {
      return 'Could not find a fact for the specified language.';
    }
  }

  async factOfDay() {
    const response = await fetch('https://uselessfacts.jsph.pl/today.json?language=en');
    const data = await response.json();
    return data.text;
  }

  help() {
    return `Available commands: 
    <br><strong>greet</strong>: let the robot introduce itself
    <br><strong>help</strong>: list the different commands
    <br><strong>random</strong>: get a random fact
    <br><strong>randomByLanguage [language]</strong>: get a random fact in a specific language (e.g. "en" for English)
    <br><strong>factOfDay</strong>: get the fact of the day
    <br><strong>chatGpt [question]</strong>: ask a question to the bot
    <br><strong>gpt [question]</strong>: alias for chatGpt command`;
  }

  async chatGpt(question) {
    try {
      const openaiApiKey = process.env.OPENAI_API_KEY;
      const prompt = `I am FactBot, a chatbot designed to provide interesting and informative facts on a wide range of topics. I am knowledgeable about history, science, geography, and many other subjects. I am friendly, helpful, and always happy to share fascinating facts with you.

      Question: ${question}

      Answer:`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      return 'Could not get ChatGpt response, did you set your OpenAi Token?';
    }
  }

  async handleAction(action, args) {
    const message = {
      sender: this.name,
      time: new Date().toLocaleTimeString(),
      text: '',
      avatar: this.avatar
    };
    switch (action) {
      case 'getInfo':
        message.text = this.getInfo();
        break;
      case 'greet':
        message.text = this.greet();
        break;
      case 'help':
        message.text = this.help();
        break;
      case 'random':
        message.text = await this.random();
        break;
      case 'factOfDay':
        message.text = await this.factOfDay();
        break;
      case 'randomByLanguage':
        message.text = await this.randomByLanguage(args[0]);
        break;
      case 'chatGpt':
      case 'gpt':
        message.text = await this.chatGpt(args.join(' '));
        break;
      default:
        console.warn(`Unknown action "${action}" for ${this.name}`);
        message.text = `Unknown action "${action}" for ${this.name}`;
        break;
    }
    saveMessage(message);
    renderMessages([message]);
  }
}

export default FactBot;
