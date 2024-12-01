import "./ChatbotLayout.css"

export const ChatbotLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section id="landbot-app">
			<div className="chat-container">
				<div className="landbot-chat">
					<div className="landbot-header">
						<h1 className="subtitle">Landbot core example</h1>
					</div>
					{children}
				</div>
			</div>
		</section>
	)
}
