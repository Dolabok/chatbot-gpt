import { renderContacts, initContactSelection, getAvatarByName } from './components/contacts';
import { renderMessages } from './components/messages';
import { initMessageForm } from './utils/eventHandlers';
import { saveMessage, getMessages } from './utils/localStorage';
import { handleBotCommand } from './bots/botManager';
import Bot1 from './bots/bot1';
import Bot2 from './bots/bot2';
import Bot3 from './bots/bot3';
import { fetchMessagesFromApi } from './api';
import './styles/main.scss';

function handleContactSelection(currentBot, contactName) {
  return contactName;
}

function initContacts(bots) {
  const contacts = [
    { name: 'You', type: 'user', avatar: 'https://www.nicepng.com/png/full/376-3766591_portal-cake-sign.png' },
    ...bots.map((bot) => bot.getInfo())
  ];
  renderContacts(contacts);
  return [contacts, initContactSelection(handleContactSelection)];
}

function initMessages() {
  const messages = getMessages();
  renderMessages(messages);
}

function initBots() {
  return [
    new Bot1(),
    new Bot2(),
    new Bot3()
  ];
}

function handleMessageSubmit(contacts, bots, currentBot, messageText) {
  if (messageText.startsWith('@')) {
    handleBotCommand(messageText, contacts ?? [], bots ?? []);
  } else {
    const userMessage = {
      sender: 'You',
      time: new Date().toLocaleTimeString(),
      text: messageText,
      avatar: getAvatarByName('You', contacts ?? [])
    };
    saveMessage(userMessage);
    renderMessages([userMessage]);
  }
}

async function loadOlderMessages() {
  const messages = getMessages();
  try {
    const oldestMessage = messages[0];
    const oldestTimestamp = oldestMessage ? oldestMessage.timestamp : Date.now();
    const olderMessages = await fetchMessagesFromApi(oldestTimestamp, 15);
    messages.unshift(...olderMessages);
    renderMessages(messages);
  } catch (error) {
    console.error('Failed to fetch older messages:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const bots = initBots();
  const [contacts, setCurrentBot] = initContacts(bots);
  initMessages();
  initMessageForm((messageText) => handleMessageSubmit(contacts, bots, setCurrentBot, messageText));
});

document.getElementById('load-older-messages').addEventListener('click', loadOlderMessages);
