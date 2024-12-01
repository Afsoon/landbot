import type { Meta, StoryObj } from "@storybook/react"
import { ChatbotTyping as ChatbotTypingComponent } from "./ChatbotTyping"

const meta: Meta<typeof ChatbotTypingComponent> = {
	component: ChatbotTypingComponent,
	parameters: {
		layout: "centered",
	},
	title: "Loading/Chatbot Typing",
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const ChatbotTyping: Story = {}
