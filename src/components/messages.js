function scrollMessagesToBottom() {
  const container = document.getElementById('messages-container');
  container.scrollTop = container.scrollHeight;
}

function renderMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${message.sender === 'You' ? 'sent' : 'received'}`;
  messageElement.innerHTML = `
    <div class="message-header">
      <img class="avatar" src="${message.avatar}" alt="${message.sender} Avatar">
      <div class="sender">${message.sender}</div>
      <div class="time">${message.time}</div>
    </div>
    <div class="text">${message.text}</div>
  `;
  return messageElement;
}

export function renderMessages(messages) {
  const messagesContainer = document.getElementById('messages');
  const messageElements = messages.map(renderMessage);

  messageElements.forEach((messageElement) => {
    messagesContainer.appendChild(messageElement);
  });
  scrollMessagesToBottom();
}
