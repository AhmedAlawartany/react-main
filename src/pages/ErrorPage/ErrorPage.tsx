import { ErrorPageContainer } from "./blocks/Theme"

const ErrorPage = () => {
    return (
        <ErrorPageContainer>
            <p>Error Occurred While loading this Page</p>

            <button
                onClick={() => {
                    window.location.href = "/"
                }}
            >
                Go Back to Main Page
            </button>
        </ErrorPageContainer>
    )
}

export default ErrorPage
