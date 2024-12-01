import type { ComponentProps } from "react"
import ContentLoader from "react-content-loader"

type LoadingChatbotProps = Exclude<
	ComponentProps<typeof ContentLoader>,
	"width" | "height" | "viewBox" | "backgroundColor" | "foregroundColor" | "speed"
>

export const LoadingChatbot = (props: LoadingChatbotProps) => {
	return (
		<>
			<span className="sr-only">Loading Chatbot, please wait...</span>
			<ContentLoader
				speed={2}
				width={400}
				height={300}
				viewBox="0 0 400 300"
				backgroundColor="#000000"
				foregroundColor="#ecebeb"
				aria-hidden="true"
				{...props}
			>
				<rect x="0" y="12" rx="5" ry="5" width="220" height="35" />
				<rect x="179" y="58" rx="5" ry="5" width="220" height="35" />
				<rect x="0" y="104" rx="5" ry="5" width="220" height="35" />
			</ContentLoader>
		</>
	)
}
