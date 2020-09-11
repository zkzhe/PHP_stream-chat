
let client, channel, username;

async function generateToken(username) {
  const { token } = (
    await axios.get(`/server.php?create-token=${username}`)
  ).data;
  return token;
}

// Initialize the JavaScript chat SDK
client = new StreamChat('k98ge8cknrsz');

async function initializeClient(username) {
  const token = await generateToken(username);

  // Set the current logged user
  client.setUser(
    {
      id: username,
      name: 'Jon Snow', // Update this name dynamically
      image: 'https://bit.ly/2u9Vc0r'
    },
    token
  ); // token generated from our PHP server

  // create or initialize the channel
  channel = client.channel('messaging', 'general-channel1', {
    name: 'General Room for platform',
    image: 'https://bit.ly/2F3KEoM',
    members: [],
    session: 8 // custom field, you can add as many as you want
  });

  // Watch the channel for events
  await channel.watch();
  channel.on('message.new', event => {
  appendMessage(event.message);
});

channel.state.messages.forEach(message => {
  appendMessage(message);
});
}

function checkAuthState() {
  if (!user.value) {
    document.getElementById('login-block').style.display = 'grid';
    document.getElementsByClassName('message-container')[0].style.display =
      'none';
  } else {
    document.getElementsByClassName('message-container')[0].style.display =
      'grid';
    document.getElementById('login-block').style.display = 'none';
    username = user.value;

    initializeClient(username);
  }
}

const user = document.getElementById('user-login-input');
user.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    checkAuthState();
  }
});

checkAuthState();

// [...]
function appendMessage(message) {
  const messageContainer = document.getElementById('messages');

  // Create and append the message div
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${
    message.user.id === username ? 'message-right' : 'message-left'
  }`;

  // Create the username div
  const usernameDiv = document.createElement('div');
  usernameDiv.className = 'message-username';
  usernameDiv.textContent = `${message.user.id}:`;
  // Append the username div to the MessageDiv
  messageDiv.append(usernameDiv);

  // Create the main message text div
  const messageTextDiv = document.createElement('div');
  messageTextDiv.textContent = message.text;
  // Append the username div to the MessageDiv
  messageDiv.append(messageTextDiv);

  // Then, append the messageDiv to the "messages" div
  messageContainer.appendChild(messageDiv);
}
async function sendMessage(message) {
  return await channel.sendMessage({
    text: message
  });
}

const inputElement = document.getElementById('message-input');
inputElement.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage(inputElement.value);
    inputElement.value = '';
  }
});
