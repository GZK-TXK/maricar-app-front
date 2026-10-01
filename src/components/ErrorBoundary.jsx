import { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary:', error, info)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Algo ha ido mal</h2>
                    <p>{this.state.error?.message || 'Error inesperado'}</p>
                    <button className="btn-primary" onClick={this.handleReset}>Reintentar</button>
                </div>
            )
        }
        return this.props.children
    }
}