import "./ChatbotTyping.css"

export const ChatbotTyping = () => {
	return (
		<>
			<span className="sr-only">Chatbot is typing, please wait...</span>
			<div className="typing" aria-hidden="true">
				<div className="typing-dot" />
				<div className="typing-dot" />
				<div className="typing-dot" />
			</div>
		</>
	)
}
