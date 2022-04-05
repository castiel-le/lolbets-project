import App1 from "./App1";
import { SnackbarContainer } from "./components/Snackbar/SnackbarContext";
import SnackbarAlert from "./components/Snackbar/SnackbarAlert";

function App() {

    return (
        <SnackbarContainer>
            <SnackbarAlert />
            <App1 />
        </SnackbarContainer>
    );
}

export default App;
