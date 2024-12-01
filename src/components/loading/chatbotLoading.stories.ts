import type { Meta, StoryObj } from '@storybook/react';
import { LoadingChatbot as LoadingChatbotComponent } from './chatbotLoading';

const meta: Meta<typeof LoadingChatbotComponent> = {
    component: LoadingChatbotComponent,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    title: 'Loading/Chatbot Loading',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ChatbotLoading: Story = {};

