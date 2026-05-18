function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function initChatbot() {
  // Check if chatbot already exists
  if (document.getElementById('as-chatbot')) return;

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn('OpenRouter API key missing. Chatbot disabled.');
    return;
  }

  // Create chatbot container
  const container = document.createElement('div');
  container.id = 'as-chatbot';
  container.className = 'chatbot-container closed';

  container.innerHTML = `
    <div class="chatbot-toggle" id="chatbot-toggle">
      <svg class="icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg class="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
    <div class="chatbot-window">
      <div class="chatbot-header">
        <div class="chatbot-avatar">
          <img src="/assets/logo.png" alt="AS Performance" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'%23fff\\'%3E%3Cpath d=\\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z\\'/%3E%3C/svg%3E'" />
        </div>
        <div class="chatbot-title">
          <h4>AS Assistant</h4>
          <span>Online</span>
        </div>
      </div>
      <div class="chatbot-messages" id="chatbot-messages">
        <div class="chat-message bot">
          <div class="message-content">Hi there! I'm your AS Performance assistant. How can I help you today?</div>
        </div>
      </div>
      <div class="chatbot-input">
        <input type="text" id="chatbot-text" placeholder="Type your question..." autocomplete="off" />
        <button id="chatbot-send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Logic
  const toggleBtn = document.getElementById('chatbot-toggle');
  const sendBtn = document.getElementById('chatbot-send');
  const inputEl = document.getElementById('chatbot-text');
  const messagesEl = document.getElementById('chatbot-messages');

  let messageHistory = [
    { role: "system", content: "You are a helpful customer support assistant for AS Performance Chiptuning. You help clients with questions about ECU tuning, services, pricing, and how the platform works. Keep responses concise, professional, and friendly." }
  ];

  let lastSendTime = 0;
  const RATE_LIMIT_MS = 2000;

  toggleBtn.addEventListener('click', () => {
    container.classList.toggle('closed');
    if (!container.classList.contains('closed')) {
      inputEl.focus();
    }
  });

  function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${role}`;
    msgDiv.innerHTML = `<div class="message-content">${role === 'user' ? escapeHtml(text) : text}</div>`;
    messagesEl.appendChild(msgDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function appendTypingIndicator() {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message bot typing-indicator';
    msgDiv.id = 'typing-indicator';
    msgDiv.innerHTML = `
      <div class="message-content">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>
    `;
    messagesEl.appendChild(msgDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTypingIndicator() {
    const ind = document.getElementById('typing-indicator');
    if (ind) ind.remove();
  }

  async function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;

    // Rate limiting — prevent API credit drain
    if (Date.now() - lastSendTime < RATE_LIMIT_MS) {
      return;
    }
    lastSendTime = Date.now();

    inputEl.value = '';
    appendMessage('user', text);
    messageHistory.push({ role: 'user', content: text });

    appendTypingIndicator();

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-OpenRouter-Title': 'AS Performance Chiptuning',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-v4-flash:free',
          messages: messageHistory
        })
      });

      if (response.status === 429) {
        // Rate limited — wait 3s and retry once
        await new Promise(r => setTimeout(r, 3000));
        const retry = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-OpenRouter-Title': 'AS Performance Chiptuning',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-v4-flash:free',
            messages: messageHistory
          })
        });
        if (!retry.ok) {
          removeTypingIndicator();
          appendMessage('bot', 'I\'m getting a lot of requests right now. Please wait a moment and try again.');
          return;
        }
        const retryData = await retry.json();
        removeTypingIndicator();
        const botResp = retryData.choices[0].message.content;
        appendMessage('bot', botResp);
        messageHistory.push({ role: 'assistant', content: botResp });
        return;
      }

      removeTypingIndicator();

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      appendMessage('bot', botResponse);
      messageHistory.push({ role: 'assistant', content: botResponse });

    } catch (err) {
      removeTypingIndicator();
      console.error('Chatbot error:', err);
      appendMessage('bot', 'Sorry, I am having trouble connecting right now. Please try again later.');
    }
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
