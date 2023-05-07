export function initMessageForm(submitCallback) {
  const messageForm = document.getElementById('message-form');
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;

    if (messageText.trim()) {
      submitCallback(messageText);
      messageInput.value = '';
    }
  });
}
