import type { ReactNode } from "react"
import type { LandbotState } from "../../useLandbot/types"
import { ChatbotError } from "../loading/chatbotError"
import { LoadingChatbot } from "../loading/chatbotLoading"

import "./chatbotMessages.css"

type ChatbotProps = {
	state: LandbotState["state"]
	children: ReactNode
}

export const ChatbotMessages = ({ state, children }: ChatbotProps) => {
	if (state === "LOADING") {
		return (
			<div className="landbot-messages-container" id="landbot-messages-container">
				<LoadingChatbot />
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
		<div className="landbot-messages-container" id="landbot-messages-container">
			{children}
		</div>
	)
}
