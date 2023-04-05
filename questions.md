1. The difference between Component and PureComponent is in their default implementation of the shouldComponentUpdate lifecycle method. Component does not have any built-in optimization, while PureComponent implements a shallow comparison of props and state. If the comparison returns false, the component will not re-render, improving performance. However, this might break your app if you have complex data structures like nested objects or arrays, as PureComponent's shallow comparison will not detect changes in the nested data.

2. Combining Context with shouldComponentUpdate can be dangerous because context updates may be blocked by shouldComponentUpdate. If a component implementing shouldComponentUpdate is part of the component tree using the Context, it may prevent the updated context value from being passed down to child components if shouldComponentUpdate returns false.

3. To pass information from a component to its parent, you can:

- Use callback functions: Pass a function from the parent component as a prop to the child component. The child component can call this function with the necessary data.
- Lift state up to the parent who needs the state
- Use a state management library like Redux to manage shared state between components.

4. Two ways to prevent components from re-rendering are:

- Implementing shouldComponentUpdate and returning false when a re-render is not necessary.
- Using React.memo for functional components, which is a higher-order component that performs a shallow comparison of props to prevent unnecessary re-renders.

5. A fragment is a lightweight wrapper for multiple elements without adding an extra DOM node. We need fragments to group elements together without adding unnecessary markup, which could affect styling and accessibility. Fragments might break your app if you rely on a specific DOM structure, or if you use certain CSS selectors that expect a particular parent-child relationship between elements.

6. Three examples of the HOC pattern are:

- withLoading: A HOC that shows a loading spinner while data is being fetched.
- withErrorHandling: A HOC that catches errors and displays an error message.
- withAuthentication: A HOC that checks for user authentication and redirects unauthenticated users to a login page.

7. Handling exceptions in promises, callbacks, and async-await:

- Promises: Use the .catch() method or the second argument of .then() to handle errors.
- Callbacks: Handle errors by passing an error argument as the first parameter to the callback function.
- Async-await: Use try-catch blocks to handle errors within async functions.

8. The useState hook takes one argument, the initial state, which can either be a value of any type or a function. If a function is provided, it will be treated as an initializer function and will be called when initializing the component.

- Initial state: const [state, setState] = useState(initialState);
- Initialize function (only on component initialize) useState(() => doSomethingHeavyHere)
- Update state setState(nextState)
- Update state based on previous setState((actualValue) => actualValue + 1)

- The setState function returned by the useState hook is asynchronous, similar to the class-based setState. React may batch multiple setState calls together to optimize performance and avoid unnecessary re-renders. This behavior allows React to coalesce multiple state updates into a single render, improving the overall performance of the application.

9. Steps to migrate a Class Component to a Function Component:

- Convert the class component to a functional component with the same props.
- Replace the state initialization in the constructor with the useState hook.
- Replace lifecycle methods with useEffect hooks (e.g., componentDidMount, componentDidUpdate, componentWillUnmount).
- Replace any instance methods with either useCallback or useMemo hooks, depending on the use case.
- Update any references to this with the appropriate hook or prop.

10. A few ways styles can be used with components include:

- Inline styles: Apply styles directly to components as an object with camelCased properties.
- CSS modules: Import and use scoped CSS classes that are locally scoped to the component.
- Styled-components: Use a library like styled-components to define and apply styled components with tagged template literals.
- External stylesheets: Import external CSS files and use the class names defined in the stylesheet.

11. To render an HTML string coming from the server, you can use the dangerouslySetInnerHTML prop. This allows you to inject raw HTML directly into the DOM. However, we need to sanitize with caution the html to prevent cross-site scripting.
