import type { ReactNode } from "react"
import type { LandbotState } from "../../useLandbot/types"
import { ChatbotError } from "../loading/ChatbotError"
import { ChatbotLoading } from "../loading/ChatbotLoading"
import { ChatbotTyping } from "../loading/ChatbotTyping"


import "./ChatbotMessages.css"

type ChatbotProps = {
	state: LandbotState["state"]
	children: ReactNode
}

export const ChatbotMessages = ({ state, children }: ChatbotProps) => {
	if (state === "LOADING") {
		return (
			<div className="landbot-messages-container" id="landbot-messages-container">
				<ChatbotLoading />
			</div>
		)
	}

	if (state === "ERROR") {
		return (
			<div className="landbot-messages-container" id="landbot-messages-container">
				<ChatbotError />
			</div>
		)
	}

	return (
		<div
			className="landbot-messages-container"
			id="landbot-messages-container"
			ref={(node) => node?.scrollTo({ behavior: "smooth", top: node.scrollHeight })}
		>
			{children}
			{state === "WAITING_FOR_BOT_INPUT" ? <ChatbotTyping /> : null}
		</div>
	)
}
