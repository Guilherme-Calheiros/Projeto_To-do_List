import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import UseAuthContext from "../hooks/UseAuthContext.jsx";

const SignoutButton = () => {

    const { signout } = UseAuthContext()
    const navigate = useNavigate()

    const handleSignout = () => {
        signout()
        navigate("/")
    }

    return (
        <Button text="Sair" onClick={handleSignout} w="100px"/>
    )
};

export default SignoutButton;