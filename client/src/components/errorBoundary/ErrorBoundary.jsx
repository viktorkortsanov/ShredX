import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        window.history.replaceState({}, "", "/404")
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <div>Something went wrong.</div>
        }

        return this.props.children;
    }
}