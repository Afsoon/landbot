import { useState } from 'react';
import './App.css'
import { type ChatMessage, useLandbot } from './useLandbot';

function messagesFilter(data: ChatMessage) {
  /** Support for basic message types */
  return ["text", "dialog"].includes(data.type);
}

function App() {
  const { client, landbotState} = useLandbot();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input !== "" && client != null) {
      client.sendMessage({ message: input });
      setInput("");
    }
  }

  return (
    <section id="landbot-app">
      <div className="chat-container">
        <div className="landbot-chat">
          <div className="landbot-header">
            <h1 className="subtitle">Landbot core example</h1>
          </div>

          <div
            className="landbot-messages-container"
            id="landbot-messages-container"
          >
            {Object.values(landbotState.messages)
              .filter(messagesFilter)
              .sort((a, b) => a.timestamp - b.timestamp)
              .map((message) => (
                <article
                  className="media landbot-message"
                  data-author={message.author}
                  key={message.key}
                >
                  <figure className="media-left landbot-message-avatar">
                    <p className="image is-64x64">
                      <img
                        alt=""
                        className="is-rounded"
                        src="http://i.pravatar.cc/100"
                      />
                    </p>
                  </figure>
                  <div className="media-content landbot-message-content">
                    <div className="content">
                      <p>{message.text}</p>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          <div className="landbot-input-container">
            <div className="field">
              <div className="control">
                <input
                  className="landbot-input"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Type here..."
                  type="text"
                  value={input}
                />
                <button
                  className="button landbot-input-send"
                  disabled={input === ""}
                  onClick={handleSubmit}
                  type="button"
                >
                  <span className="icon is-large" style={{ fontSize: 25 }}>
                    ➤
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
