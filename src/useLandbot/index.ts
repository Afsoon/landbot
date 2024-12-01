import Core from "@landbot/core"
import type { ChatMessage, LandbotState } from "./types"
import type { Message } from "@landbot/core/dist/src/types"
import { useSyncExternalStore } from "react"

const createChatStore = () => {
	let landbotState: LandbotState = {
		messages: [],
		state: "LOADING",
	}

	let core: Core | null = null
	const listeners = new Set<() => void>()

	const emitChange = () => {
        for (const listener of listeners) {
            listener()
        }
	}

	fetch("https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json")
		.then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok")
            }
            return res.json()
        })
		.then((data) => {
            if (data.firestore == null) {
                throw new Error("Firestore is not defined")
            }

			core = new Core(data)

			core.pipelines.$readableSequence.subscribe((data: Message) => {
				if (landbotState.state !== "READY" && landbotState.state !== "WAITING_FOR_BOT_INPUT") {
					return landbotState
				}

				const parsedMessage = parseMessage(data)
				landbotState = {
					state: parsedMessage.author === "user" ? "WAITING_FOR_BOT_INPUT" : "READY",
					messages: [...landbotState.messages, parsedMessage]
						.filter(messagesFilter)
						.sort((a, b) => a.timestamp - b.timestamp),
				}
				emitChange()
			})

			core.init().then((data) => {
				landbotState = {
					state: "READY",
					messages: parseMessages(Object.values(data.messages))
						.filter(messagesFilter)
						.sort((a, b) => a.timestamp - b.timestamp),
				}
				emitChange()
			})
		}).catch(() => {
            landbotState = {
                state: "ERROR",
                messages: [],
            }
            emitChange()
        })

	return {
		subscribe(callback: () => void) {
			listeners.add(callback)
			return () => listeners.delete(callback)
		},
		getSnapshot() {
			return landbotState
		},
		getCore() {
			return core
		},
	}
}

const chatStore = createChatStore()

export const useLandbot = () => {
	const chatbotState = useSyncExternalStore(chatStore.subscribe, chatStore.getSnapshot)

	return {
		landbotState: chatbotState,
		client: chatStore.getCore(),
	}
}

function parseMessage(data: Message): ChatMessage {
	return {
		key: data.key,
		text: data.title || data.message,
		author: data.samurai !== undefined ? "bot" : "user",
		timestamp: data.timestamp,
		type: data.type,
	}
}

function parseMessages(messages: Array<Message>): Array<ChatMessage> {
	return messages.map(parseMessage)
}

function messagesFilter(data: ChatMessage) {
	/** Support for basic message types */
	return ["text", "dialog"].includes(data.type)
}
