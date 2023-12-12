import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const UseAuthContext = () => {
    const context = useContext(AuthContext);

    return context
}

export default UseAuthContext