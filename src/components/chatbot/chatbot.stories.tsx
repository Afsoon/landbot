import type { Meta, StoryObj } from "@storybook/react"
import { ChatbotLayout } from "./chatbotLayout"
import { ChatbotMessages } from "./chatbotMessages"
import { ChatbotMessage } from "./chatbotMessage"
import type { ComponentProps } from "react"
import type { ChatMessage } from "../../useLandbot/types"

const meta: Meta<typeof ChatbotMessages> = {
	component: ChatbotMessages,
	render: (props: ComponentProps<typeof ChatbotMessages>) => {
		const botMessage: ChatMessage = {
			key: "1",
			author: "bot",
			text: "Bot text",
			timestamp: new Date().getTime(),
			type: "text",
		}

		const userMessage: ChatMessage = {
			key: "2",
			author: "user",
			text: "User text",
			timestamp: new Date().getTime() + 1000,
			type: "text",
		}

		return (
			<ChatbotLayout>
				<ChatbotMessages state={props.state}>
					<ChatbotMessage message={botMessage}>{botMessage.text}</ChatbotMessage>
					<ChatbotMessage message={userMessage}>{userMessage.text}</ChatbotMessage>
				</ChatbotMessages>
			</ChatbotLayout>
		)
	},
	parameters: {
		layout: "centered",
	},
	argTypes: {
		state: {
			options: ["LOADING", "ERROR", "READY", "WAITING_FOR_BOT_INPUT"],
			control: { type: "radio" },
		},
        children: {
            control: false,
        },
	},
	title: "Chatbot",
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const ChatbotReady: Story = {
	args: {
		state: "READY",
	},
}

export const ChatbotLoading: Story = {
	args: {
		state: "LOADING",
	},
}

export const ChatbotLoadingFailed: Story = {
	args: {
		state: "ERROR",
	},
}

export const ChatbotWaitingResponseFromBot: Story = {
	args: {
		state: "WAITING_FOR_BOT_INPUT",
	},
}
