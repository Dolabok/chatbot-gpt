// Handles contact click events
function contactClickHandler(contactName) {
  const chatInput = document.getElementById('message-input');
  chatInput.value = `@${contactName} `;
  chatInput.focus();
}

// Renders a single contact element
export function renderContact(contact) {
  const contactElement = document.createElement('div');
  contactElement.className = 'contact';
  contactElement.innerHTML = `
    <div class="list-group-item">
      <img class="avatar" src="${contact.avatar}" alt="${contact.name} Avatar">
      <div class="name">${contact.name}</div>
    </div>
  `;
  contactElement.addEventListener('click', () => contactClickHandler(contact.name));
  return contactElement;
}

// Renders a list of contact elements
export function renderContacts(contacts) {
  const contactsList = document.querySelector('.list-group');
  contactsList.innerHTML = '';
  contacts.forEach((contact) => {
    contactsList.appendChild(renderContact(contact));
  });
}

// Initializes the contact selection functionality
export function initContactSelection(contactCallback) {
  const contactsList = document.querySelector('.list-group');
  contactsList.addEventListener('click', (event) => {
    const contactItem = event.target.closest('.list-group-item');
    if (contactItem) {
      // Deselect previously selected contact
      const selectedContact = contactsList.querySelector('.active');
      if (selectedContact) {
        selectedContact.classList.remove('active');
      }

      // Select the clicked contact
      contactItem.classList.add('active');
      const contactName = contactItem.textContent;
      contactCallback(contactName);
    }
  });
}

// Retrieves the avatar URL by contact name
export function getAvatarByName(name, contacts) {
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // Replace with your default avatar URL

  const selectedContact = contacts.find((contact) => contact.name === name);
  return selectedContact ? selectedContact.avatar : defaultAvatar;
}
