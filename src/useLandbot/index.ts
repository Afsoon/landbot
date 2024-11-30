import Core from "@landbot/core"
import type { Message, ConfigProperties } from "@landbot/core/dist/src/types"
import { useState, useRef, useEffect } from "react"
/**
 * The use of md5 is a temporary solution because the message key is not unique and some messages are duplicated,
 * these duplication are cause due the double render on Strict Mode of React. Depends on how fast the messages arrive and
 * how fast the component is rendered, can happen or not happen. It isn't a problem in production but an smell on how the state is handle.
 */
import { md5 } from "js-md5";

export interface ChatMessage {
	key: string
	text?: string
	author: "bot" | "user"
	timestamp: number
	type: string
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

function parseMessages(messages: Record<string, Message>): Record<string, ChatMessage> {
	return Object.values(messages).reduce(
		(obj, next) => {
            const parsedMessage = parseMessage(next)
			obj[md5(parsedMessage.text ?? "")] = parsedMessage
			return obj
		},
		{} as Record<string, ChatMessage>
	)
}

// TODO: Union types to represent different states
type LandbotState = {
	messages: Record<string, ChatMessage>
	state: "LOADING" | "CONFIG_LOADED" | "READY" | "ERROR"
	config: ConfigProperties | null
}

export const useLandbot = () => {
	const core = useRef<Core | null>(null)

	const [landbotState, setLandbotState] = useState<LandbotState>({
		messages: {},
		state: "LOADING",
		config: null,
	})

	useEffect(() => {
		fetch("https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json")
			.then((res) => res.json())
			.then((config: ConfigProperties) => {
				setLandbotState({
					messages: {},
					state: "CONFIG_LOADED",
					config,
				})
			})
	}, [])

	useEffect(() => {
		if (landbotState.state === "CONFIG_LOADED") {
			// biome-ignore lint/style/noNonNullAssertion: Current our types are very loose, after the refactor should be fixed
			core.current = new Core(landbotState.config!)
			core.current.pipelines.$readableSequence.subscribe((data: Message) => {
				setLandbotState((state) => {
                    const parsedMessage = parseMessage(data);
					return {
						...state,
						messages: {
							...state.messages,
							[md5(parsedMessage.text ?? "")]: parsedMessage,
						},
					}
				})
			})

			core.current.init().then((data) => {
				setLandbotState((state) => {
					return {
						...state,
						state: "READY",
						messages: parseMessages(data.messages),
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
