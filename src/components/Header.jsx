import { useState } from "react"
import Delete from "./Delete"
import Image from "./Image"
import Logo from "../assets/Logo.png"
import SignoutButton from "./SignoutButton"

const Header = ({ username }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="w-full bg-primary-300 h-20 flex items-center py-3 px-10 justify-between">
            <div className="hidden md:block">
                <Image src={Logo} alt="Imagem da logo To-do" w="230px" />
            </div>
            <div className="md:hidden">
                <Image src={Logo} alt="Imagem da logo To-do" w="150px" />
            </div>
            <div className=" hidden space-y-1 md:block">
                {!isVisible && (
                    <button className="text-white text-xl font-bold" onClick={() => setIsVisible(true)}>{username}</button>
                )}

                {isVisible && (
                    <ul className="bg-white w-1/3 pb-10 absolute top-1 right-1 duration-150 flex flex-col space-y-3 justify-end items-center rounded border-black shadow-lg z-10">
                        <button className="px-10 py-8 relative ml-auto" onClick={() => setIsVisible(false)}>
                            <div className="w-6 h-1 rotate-45 absolute bg-black"></div>
                            <div className="w-6 h-1 -rotate-45 absolute bg-black"></div>
                        </button>
                        <li className="text-black text-lg font-bold">{username}</li>
                        <SignoutButton />
                        <Delete/>
                    </ul>
                )}
            </div>
            <button className="space-y-1 group md:hidden">
                <div className="w-6 h-1 bg-white"></div>
                <div className="w-6 h-1 bg-white"></div>
                <div className="w-6 h-1 bg-white"></div>

                <ul className="bg-white w-screen pb-10 absolute -top-full group-focus:-top-1 right-0 duration-150 flex flex-col space-y-3 justify-end items-center shadow-lg z-10">
                    <button className="px-10 py-8 relative ml-auto">
                        <div className="w-6 h-1 rotate-45 absolute bg-black"></div>
                        <div className="w-6 h-1 -rotate-45 absolute bg-black"></div>
                    </button>
                    <li className="text-black text-lg font-bold">{username}</li>
                    <SignoutButton />
                    <Delete/>
                </ul>
            </button>
        </div>
    )
}

export default Header