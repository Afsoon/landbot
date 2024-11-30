import Core from "@landbot/core"
import type { Message, ConfigProperties } from "@landbot/core/dist/src/types"
import { useState, useRef, useEffect } from "react"
import type { ChatMessage, LandbotState } from "./types";

export const useLandbot = () => {
	const core = useRef<Core | null>(null)

	const [landbotState, setLandbotState] = useState<LandbotState>({
		messages: [],
		state: "LOADING",
		config: null,
	})

	useEffect(() => {
		fetch("https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json")
			.then((res) => res.json())
			.then((config: ConfigProperties) => {
				setLandbotState({
					messages: [],
					state: "CONFIG_LOADED",
					config,
				})
			})
	}, [])

	useEffect(() => {
		if (landbotState.state === "CONFIG_LOADED") {
			core.current = new Core(landbotState.config)
			core.current.pipelines.$readableSequence.subscribe((data: Message) => {
				setLandbotState((chatBotState) => {
                    if (chatBotState.state !== "READY") {
                        return chatBotState;
                    }

					return {
						...chatBotState,
						messages: [...chatBotState.messages, parseMessage(data)].filter(messagesFilter).sort((a, b) => a.timestamp - b.timestamp),
					}
				})
			})

			core.current.init().then((data) => {
				setLandbotState((state) => {
					return {
						...state,
                        state: "READY",
                        config: landbotState.config,
						messages: parseMessages(Object.values(data.messages)).filter(messagesFilter).sort((a, b) => a.timestamp - b.timestamp),
					}
				})
			})
		}
	}, [landbotState.state, landbotState.config])

	return {
		landbotState,
		client: core.current,
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
	return messages.map(parseMessage);
}

function messagesFilter(data: ChatMessage) {
    /** Support for basic message types */
    return ["text", "dialog"].includes(data.type);
  }
