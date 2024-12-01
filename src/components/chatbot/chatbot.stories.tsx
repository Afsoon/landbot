import type { Meta, StoryObj } from "@storybook/react"
import { ChatbotLayout } from "./chatbotLayout"
import { ChatbotMessages } from "./chatbotMessages"
import type { ComponentProps } from "react"

const meta: Meta<typeof ChatbotMessages> = {
	component: ChatbotMessages,
	render: (props: ComponentProps<typeof ChatbotMessages>) => (
		<ChatbotLayout>
			<ChatbotMessages state={props.state}>Placeholder</ChatbotMessages>
		</ChatbotLayout>
	),
	parameters: {
		layout: "centered",
	},
	argTypes: {
		state: {
			options: ["LOADING", "ERROR", "READY", "WAITING_FOR_BOT_INPUT"],
			control: { type: "radio" },
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
        state: "LOADING"
    }
};

export const ChatbotLoadingFailed: Story = {
    args: {
        state: "ERROR"
    }
};

export const ChatbotWaitingResponseFromBot: Story = {
    args: {
        state: "WAITING_FOR_BOT_INPUT"
    }
};
