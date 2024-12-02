# Landbot Challenge

My challenge is based on the example provided by [repository of the challenge](https://github.com/hello-umi/frontend-challenge-2). My main focus was to improve issues found in the original repository, such as the following:

- Two `useEffect` calls in the same component to configure the Landbot client. This implmentation is not recommended as it can cause side double render the welcome message.
- One `useEffect` that is executed on every render to scrollTo the bottom of the chatbot messages.
- Lack of loading, error and typing states.
- Implement presKey event to send messages.
- Lack of focus on input field.

Apart of these issues, I also added the following:

- Storybook for the Chatbot components.
- Playwright for UI tests.
- Biome for linting and formatting.
- Github Actions for CI/CD.
- Knip for unused imports.
- No Barrel files.

To see the evolution of the code, checkout the [PRs](https://github.com/Afsoon/landbot/pulls?q=is%3Apr+is%3Aclosed).

## Technical Decisions

### useSyncExternalStore for Landbot state.

See [PR 4](https://github.com/Afsoon/landbot/pull/4) for more details.

To summarize, I used `useSyncExternalStore` to have a clear separation between the Landbot own lifecycle and state management and the React lifecycle and state management. This allowed me to have more control over the Landbot lifecycle and manage the state more effectively without having to worry about the React lifecycle.

### refCallback for scrolling to the bottom.

See [PR 10](https://github.com/Afsoon/landbot/pull/10) for more details.

The main benefit of using `refCallback` is that allow us to colocated the DOM code close to the DOM node that we want to interact with.

### Loading, Error states, focus on input and invalid input.

Improved the UX by adding the user feedback for the different states of the chatbot. All the animations have a hidden label for a11y and testing purpose.

### Form instead of a div with a input, and uncontrolled input.

Modify the DOM to be a form instead of a div with an input. This allowed us to rely on the browser to handle the form submission and the input value. At the same time, migrate our input to a uncontrolled component, this helps us to avoid rerender after each key stroke.

### Storybook for the Chatbot components.

Added Storybook to the project to help us to test and document the components.

### Playwright for UI tests.

Added Playwright to the project to help us to test the UI. The reason to use only playwright is that the test runs on a browser instead of a node environment, which allow us to test the UI in a more real world scenario.

### Biome for linting and formatting.

Biome instead Eslint mostly because of the ease of configuration.

### Github Actions for CI/CD.

Github Actions because the code is hosted on Github.

### No Barrel files.

The lack of barrel files is becoming a recommended practice to reduce the time of loading the project. 

## Future Improvements

A non exhaustive list of future improvements:

- i18n.
- Continuous deployment.
- A better UI/UX. A non exhaustive list is better color palette, contrast, space tokens, typografy sizes.
- A better implementation of bot typing.
- CamelCase the files. I have APFS 
