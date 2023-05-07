// Stock message definitively in mango api
// replace YOUR_API_URL by your api url
export async function sendMessageToApi(message) {
  const response = await fetch('YOUR_API_URL/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });

  if (!response.ok) {
    throw new Error('Failed to send message to the API');
  }
}

export async function fetchMessagesFromApi(beforeTimestamp = Date.now(), limit = 15) {
  const response = await fetch(`YOUR_API_URL/messages?before=${beforeTimestamp}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch messages from the API');
  }
  const messages = await response.json();
  return messages;
}
