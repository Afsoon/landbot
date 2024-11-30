import type { ConfigProperties } from "@landbot/core/dist/src/types"

export type ChatMessage =  {
	key: string
	text?: string
	author: "bot" | "user"
	timestamp: number
	type: string
}

export type LandbotState = |
{
	messages: [];
	state: "LOADING"
	config: null
}
|
{
	messages: Array<ChatMessage>
	state: "CONFIG_LOADED"
	config: ConfigProperties
}
|
{
	messages: Array<ChatMessage>
	state: "READY"
	config: ConfigProperties
}
|
{
	messages: []
	state: "ERROR"
	config: null
}