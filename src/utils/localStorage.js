const MESSAGES_KEY = 'chat_messages';

export function getMessages() {
  const messages = localStorage.getItem(MESSAGES_KEY);
  return messages ? JSON.parse(messages) : [];
}

export function saveMessage(message) {
  const messages = getMessages();
  const updatedMessages = [...messages, message];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages));
}

export function clearMessages() {
  localStorage.removeItem(MESSAGES_KEY);
}
