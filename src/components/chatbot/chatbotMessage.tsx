import type { ReactNode } from "react"
import type { ChatMessage } from "../../useLandbot/types"

import "./chatbotMessage.css"

export const ChatbotMessage = ({ message, children }: { message: ChatMessage; children: ReactNode }) => {
	return (
		<article className="media landbot-message" data-author={message.author}>
			<div className="landbot-message-content">
				{children}
				<span className="landbot-message-time">
					{Intl.DateTimeFormat("es-ES", {
						hour: "numeric",
						minute: "numeric",
					}).format(new Date(message.timestamp))}
				</span>
			</div>
		</article>
	)
}
