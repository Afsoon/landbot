import type { Meta, StoryObj } from "@storybook/react"
import { ChatbotMessage } from "./chatbotMessage"
import type { ComponentProps } from "react"
import type { ChatMessage } from "../../useLandbot/types"
import { ChatbotMessages } from "./chatbotMessages"

type CustomPropsStory = ComponentProps<typeof ChatbotMessage> & {author: ComponentProps<typeof ChatbotMessage>["message"]["author"]}

const meta: Meta<CustomPropsStory> = {
	component: ChatbotMessage,
	render: ({author}: CustomPropsStory) => {

        const defaultMessage: ChatMessage = {
            key: "1",
            author,
            text: "Hello World",
            timestamp: new Date().getTime(),
            type: "text",
        }   
        return <ChatbotMessage message={defaultMessage}>
            Hello World
        </ChatbotMessage>
    },
	parameters: {
		layout: "centered",
	},
	argTypes: {
		author: {
			options: ["user", "bot"],
			control: { type: "radio" },
		},
	},
	title: "Chatbot/Message",
	tags: ["autodocs"],   
}

export default meta
type Story = StoryObj<typeof meta>

export const MultipleMessages: Story = {
    render: () => {
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
        
        return <ChatbotMessages state="READY">
            <ChatbotMessage message={botMessage}>
                {botMessage.text}
            </ChatbotMessage>
            <ChatbotMessage message={botMessage}>
                {botMessage.text}
            </ChatbotMessage>
            <ChatbotMessage message={userMessage}>
                {userMessage.text}
            </ChatbotMessage>
            <ChatbotMessage message={userMessage}>
                {userMessage.text}
            </ChatbotMessage>
        </ChatbotMessages>
    },
    argTypes: {
        message: {
            control: false,
        },
        children: {        
            control: false,
        },
        author: {
            control: false,
        },
    }
};

export const ChatbotMessageByBot: Story = {
	args: {
		author: "bot",
	},
    argTypes: {
        message: {
            control: false,
        },
        children: {        
            control: false,
        },
    }
}

export const ChatbotMessageByUser: Story = {
    args: {
        author: "user"
    },
    argTypes: {
        message: {
            control: false,
        },
        children: {        
            control: false,
        },
    }
};
