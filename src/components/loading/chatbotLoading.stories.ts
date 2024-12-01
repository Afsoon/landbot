import type { Meta, StoryObj } from "@storybook/react"
import { ChatbotLoading as ChatbotLoadingComponent } from "./ChatbotLoading"

const meta: Meta<typeof ChatbotLoadingComponent> = {
	component: ChatbotLoadingComponent,
	parameters: {
		layout: "centered",
	},
	title: "Loading/Chatbot Loading",
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const ChatbotLoading: Story = {}
