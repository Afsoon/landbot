import { useRef } from "react"
import "./App.css"
import { ChatbotLayout } from "./components/chatbot/ChatbotLayout"
import { ChatbotMessage } from "./components/chatbot/ChatbotMessage"
import { ChatbotMessages } from "./components/chatbot/ChatbotMessages"
import { useLandbot } from "./useLandbot"
import { ChatbotForm } from "./components/chatbot/ChatbotForm"

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
					<ChatbotMessage key={message.key} message={message}>
						<p>{message.text}</p>
					</ChatbotMessage>
				))}
			</ChatbotMessages>
			<ChatbotForm state={landbotState.state} onSubmit={handleSubmit} ref={formRef} />
		</ChatbotLayout>
	)
}

export default App
