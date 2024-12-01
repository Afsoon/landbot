import type { Meta, StoryObj } from '@storybook/react';
import { TypingChatbot as TypingChatbotComponent } from './chatbotTyping';

const meta: Meta<typeof TypingChatbotComponent> = {
    component: TypingChatbotComponent,
    parameters: {
        layout: 'centered',
    },
    title: 'Loading/Chatbot Typing',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TypingChatbot: Story = {};

