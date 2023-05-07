import BotBase from './botBase';
import { saveMessage } from '../utils/localStorage';
import { renderMessages } from '../components/messages';

class Pokebot extends BotBase {
  constructor() {
    super('Pokébot', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png');
  }

  help() {
    return `Available commands: 
    <br><strong>greet</strong>: let the robot introduce itself
    <br><strong>help</strong>: list the different commands
    <br><strong>random</strong>: get a random Pokémon
    <br><strong>byName [name]</strong>: get pokémon info by name
    <br><strong>byId [number]</strong>: get pokémon info by id
    <br><strong>chatGpt [question]</strong>: ask a question to the bot
    <br><strong>gpt [question]</strong>: alias for chatGpt command
    `;
  }

  async random() {
    const id = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return `A wild ${data.name} appeared! (ID: ${data.id})`;
  }

  async getByName(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      return `#${data.id}: ${data.name}<br>
      type: ${data.types[0].type.name ?? ''} ${data.types[1]?.type.name ?? ''}
      <br>
      <br>hp         : ${data.stats[0].base_stat ?? ''}
      <br>attack     : ${data.stats[1].base_stat ?? ''}
      <br>defense    : ${data.stats[2].base_stat ?? ''}
      <br>sp attack  : ${data.stats[3].base_stat ?? ''}
      <br>sp defense : ${data.stats[4].base_stat ?? ''}
      <br>speed      : ${data.stats[5].base_stat ?? ''}`;
    } catch (error) {
      console.log('error:', error);
      return `Could not find a Pokémon with the name "${name}".`;
    }
  }

  async chatGpt(question) {
    try {
      const openaiApiKey = process.env.OPENAI_API_KEY;
      const prompt = `I am Pokébot, a chatbot designed to provide information about Pokémon, their abilities, moves, and other related topics. I am knowledgeable about different types of Pokémon, their stats, evolutions, and strengths/weaknesses. I am friendly, helpful, and always happy to answer your questions about the Pokémon universe.

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

  async getById(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return `#${data.id}: ${data.name}<br>
      type: ${data.types[0].type.name ?? ''} ${data.types[1]?.type.name ?? ''}
      <br>
      <br>hp         : ${data.stats[0].base_stat ?? ''}
      <br>attack     : ${data.stats[1].base_stat ?? ''}
      <br>defense    : ${data.stats[2].base_stat ?? ''}
      <br>sp attack  : ${data.stats[3].base_stat ?? ''}
      <br>sp defense : ${data.stats[4].base_stat ?? ''}
      <br>speed      : ${data.stats[5].base_stat ?? ''}`;
    } catch (error) {
      console.log('error:', error);
      return `Could not find a Pokémon with the ID "${id}".`;
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
      case 'byName':
        message.text = await this.getByName(args[0]);
        break;
      case 'byId':
        message.text = await this.getById(args[0]);
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

export default Pokebot;
