import AuthForm from './AuthForm';
// The React.memo function performs a shallow comparison of the previous props and the new props. If the props haven't changed (based on the shallow comparison), React reuses the previously rendered result, effectively skipping the rendering process for that component. This can be especially beneficial for performance optimization in situations where a component's rendering is expensive and doesn't need to be recomputed unless its props change.
import {memo} from 'react';

export default memo(AuthForm);