import Button from "./Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAuthContext from "../hooks/UseAuthContext.jsx";

const Delete = () => {

    const [isVisible, setIsVisible] = useState(false)
    const { deleteUser , signout } = UseAuthContext()
    const navigate = useNavigate()

    const deleteUserById = () => {
        deleteUser()
        signout()
        navigate("/")
    }

    return (
        <div>
            {!isVisible && (
                <Button text="Excluir usuário" onClick={() => setIsVisible(true)} w="100px"/>
            )}
            {isVisible && (
                <div>
                    <p className="font-extrabold my-4">Você tem certeza? Essa ação é irreversivel</p>
                    <div className="flex justify-center items-center gap-6">
                        <Button text="Sim" onClick={deleteUserById}/>
                        <Button text="Nâo" onClick={() => setIsVisible(false)}/>
                    </div>
                </div>
                )}
        </div>
    )
};

export default Delete;