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
            <div className="space-y-1">
                {!isVisible && (
                    <>
                        <button className="text-white text-xl font-bold hidden md:block" onClick={() => setIsVisible(true)}>{username}</button>
                        <button className="flex flex-col gap-1 md:hidden" onClick={() => setIsVisible(true)} >
                            <div className="w-6 h-1 bg-white"></div>
                            <div className="w-6 h-1 bg-white"></div>
                            <div className="w-6 h-1 bg-white"></div>
                        </button>
                    </>
                )}

                {isVisible && (
                    <ul className="bg-white w-full md:w-1/3 pb-10 absolute md:top-1 md:right-1 top-0 right-0 duration-150 flex flex-col space-y-3 justify-end items-center rounded border-black shadow-lg z-10">
                        <button className="px-10 py-8 relative ml-auto" onClick={() => setIsVisible(false)}>
                            <div className="w-6 h-1 rotate-45 absolute bg-black"></div>
                            <div className="w-6 h-1 -rotate-45 absolute bg-black"></div>
                        </button>
                        <li className="text-black text-lg font-bold">{username}</li>
                        <SignoutButton />
                        <Delete />
                    </ul>
                )}
            </div>
            
        </div>
    )
}

export default Header