export type ChatMessage = {
	key: string
	text?: string
	author: "bot" | "user"
	timestamp: number
	type: string
}

export type LandbotState =
	| {
			messages: []
			state: "LOADING"
	  }
	| {
			messages: Array<ChatMessage>
			state: "READY"
	  }
	| {
			messages: Array<ChatMessage>
			state: "WAITING_FOR_BOT_INPUT"
	  }
	| {
			messages: []
			state: "ERROR"
	  }
