import BotBase from './botBase';
import { saveMessage } from '../utils/localStorage';
import { renderMessages } from '../components/messages';

class Bot3 extends BotBase {
  constructor() {
    super('FoodBot', 'https://cdn-icons-png.flaticon.com/512/209/209116.png');
  }

  async randomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return `Random Meal: ${data.meals[0].strMeal}
    ${data.meals[0].strArea ? `<br>area: ${data.meals[0].strArea}` : ''}
    ${data.meals[0].strCategory ? `<br>type: ${data.meals[0].strCategory}` : ''}
    ${data.meals[0].strTags ? `<br>tags: ${data.meals[0].strTags}` : ''}
    ${data.meals[0].strSource ? `<br>source: ${data.meals[0].strSource}` : ''}`;
  }

  async mealByName(name) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      const data = await response.json();
      return `Random Meal: ${data.meals[0].strMeal}
      ${data.meals[0].strArea ? `<br>area: ${data.meals[0].strArea}` : ''}
      ${data.meals[0].strCategory ? `<br>type: ${data.meals[0].strCategory}` : ''}
      ${data.meals[0].strTags ? `<br>tags: ${data.meals[0].strTags}` : ''}
      ${data.meals[0].strSource ? `<br>source: ${data.meals[0].strSource}` : ''}`;
    } catch (error) {
      return 'Could not find a meal with the given name.';
    }
  }

  async mealByCategory(category) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      const meals = data.meals.map((meal) => meal.strMeal).join(', ');
      return `Meals by Category: ${meals}`;
    } catch (error) {
      return 'Could not find any meals for the specified category.';
    }
  }

  help() {
    return `Available commands: 
    <br><strong>greet</strong>: let the robot introduce itself
    <br><strong>help</strong>: list the different commands
    <br><strong>random</strong>: get a random meal
    <br><strong>byName [name]</strong>: get a meal by name
    <br><strong>mealByCategory [category]</strong>: get a list of meals by category
    <br><strong>chatGpt [question]</strong>: ask a question to the bot
    <br><strong>gpt [question]</strong>: alias for chatGpt command`;
  }

  async chatGpt(question) {
    try {
      const openaiApiKey = process.env.OPENAI_API_KEY;
      const prompt = `I am FoodBot, a chatbot designed to provide information about various foods, recipes, and meals. I am knowledgeable about different types of cuisine, ingredients, and cooking techniques. I am friendly, helpful, and always happy to answer your questions.

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
      return 'Could not get ChatGpt response, did you set you OpenAi Token ?';
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
        message.text = await this.randomMeal();
        break;
      case 'byName':
        message.text = await this.mealByName(args[0]);
        break;
      case 'byCategory':
        message.text = await this.mealByCategory(args[0]);
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

export default Bot3;
