import type { Meta, StoryObj } from '@storybook/react';
import { TypingChatbot as TypingChatbotComponent } from './chatbotTyping';

const meta: Meta<typeof TypingChatbotComponent> = {
    component: TypingChatbotComponent,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    title: 'Loading/Chatbot Typing',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TypingChatbot: Story = {};

