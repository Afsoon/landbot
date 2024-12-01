import { type ForwardedRef, forwardRef } from "react"
import type { LandbotState } from "../../useLandbot/types"

import "./chatbotForm.css"

type ChatbotFormProps = {
	state: LandbotState["state"]
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const ChatbotFormNotForwared = ({ state, onSubmit }: ChatbotFormProps, ref: ForwardedRef<HTMLFormElement>) => {
	return (
		<form ref={ref} onSubmit={onSubmit} className="landbot-input-container">
			<div className="field">
				<div className="control">
					<label className="sr-only" htmlFor="userInput">
						Type your message here
					</label>
					<input id="userInput" required name="userInput" className="landbot-input" type="text" />
					<button className="button landbot-input-send" type="submit" disabled={state !== "READY"}>
						<span className="sr-only">Send message</span>
						<span aria-hidden="true" className="icon is-large" style={{ fontSize: 25 }}>
							➤
						</span>
					</button>
				</div>
			</div>
		</form>
	)
}

export const ChatbotForm = forwardRef<HTMLFormElement, ChatbotFormProps>(ChatbotFormNotForwared)
