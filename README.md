# Chatbot Application

This chatbot application is a simple, yet powerful, web-based chat system that allows users to interact with multiple chatbots. Each chatbot specializes in a specific domain, providing users with valuable information and assistance.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [APIs and Libraries](#apis-and-libraries)
- [License](#license)

## Features

- Responsive web-based chat interface
- Multiple chatbots with different functionalities
  - Pokébot: Provides information on Pokémon using the [PokéAPI](https://pokeapi.co/)
  - FactBot: Delivers interesting facts using an [UselessFacts API](https://uselessfacts.jsph.pl)
  - FoodBot: Shares information about food, recipes, and ingredients using [Themealdb API](www.themealdb.com)
- User-friendly command system to interact with chatbots
- ChatGPT integration for advanced natural language understanding
- Local storage support for message history

## Installation

1. Clone this repository:

```bash
git clone https://github.com/Dolabok/chatbot-gpt.git
```

2. Install the necessary dependencies:

```bash
cd chatbot-gpt
npm install
```

3. Create a `.env` file in the project root folder to store your API keys:

```bash
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:

```bash
npm start
```


5. Open your browser and navigate to `http://localhost:9090/` to access the chatbot application.

## Usage

- Type a message in the chat input field and press Enter to send it.
- To interact with a chatbot, start your message with `@BotName` followed by the command and any required arguments.
- For example: `@Pokébot search pikachu` or `@FactBot random`
- Use the `@BotName help` command to get a list of available commands for each chatbot.
- Clic on bot name in contact list to fill chat bar with his name
- Start a command with @bots to start a command on all bots ex: `@bots help`

## Project Structure

- `src/`: Contains all source code files
  - `bots/`: Chatbot classes and implementations
  - `components/`: UI components for rendering chat elements
  - `utils/`: Utility functions and helpers
  - `api/`: API-related functions
  - `styles/`: SCSS files for styling the application
  - `index.js`: Main entry point of the application
- `webpack.config.js`: Webpack configuration file

## APIs and Libraries

- [PokéAPI](https://pokeapi.co/): A RESTful API for Pokémon data
- [OpenAI API](https://beta.openai.com/): GPT-3.5-turbo API for natural language understanding
- [UselessFacts API](https://uselessfacts.jsph.pl): Get random facts
- [Themealdb API](www.themealdb.com) Crowd-sourced database of Recipes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
