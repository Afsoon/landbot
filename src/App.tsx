import { useRef } from "react"
import "./App.css"
import { useLandbot } from "./useLandbot"
import { TypingChatbot } from "./components/loading/chatbotTyping"
import { ChatbotMessages } from "./components/chatbot/chatbotMessages"
import { ChatbotLayout } from "./components/chatbot/chatbotLayout"

function App() {
	const { client, landbotState } = useLandbot()
	const formRef = useRef<HTMLFormElement>(null)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (e.currentTarget.userInput.value !== "" && client != null) {
			client.sendMessage({ message: e.currentTarget.userInput.value })
			formRef.current?.reset()
		}
	}

	return (
		<ChatbotLayout>
			<ChatbotMessages state={landbotState.state}>
				{landbotState.messages.map((message) => (
					<article className="media landbot-message" data-author={message.author} key={message.key}>
						<figure className="media-left landbot-message-avatar">
							<p className="image is-64x64">
								<img alt="" className="is-rounded" src="http://i.pravatar.cc/100" />
							</p>
						</figure>
						<div className="media-content landbot-message-content">
							<div className="content">
								<p>{message.text}</p>
							</div>
						</div>
					</article>
				))}
				{landbotState.state === "WAITING_FOR_BOT_INPUT" ? <TypingChatbot /> : null}
			</ChatbotMessages>
			<form ref={formRef} onSubmit={handleSubmit} className="landbot-input-container">
				<div className="field">
					<div className="control">
						<label className="sr-only" htmlFor="userInput">
							Type your message here
						</label>
						<input id="userInput" required name="userInput" className="landbot-input" type="text" />
						<button className="button landbot-input-send" type="submit" disabled={landbotState.state !== "READY"}>
							<span className="sr-only">Send message</span>
							<span aria-hidden="true" className="icon is-large" style={{ fontSize: 25 }}>
								➤
							</span>
						</button>
					</div>
				</div>
			</form>
		</ChatbotLayout>
	)
}

export default App
