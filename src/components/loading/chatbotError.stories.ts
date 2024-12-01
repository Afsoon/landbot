import type { Meta, StoryObj } from "@storybook/react"
import { ChatbotError as ChatbotErrorComponent } from "./ChatbotError"

const meta: Meta<typeof ChatbotErrorComponent> = {
	component: ChatbotErrorComponent,
	parameters: {
		layout: "centered",
	},
	title: "Loading/Chatbot Error",
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const ChatbotError: Story = {}
