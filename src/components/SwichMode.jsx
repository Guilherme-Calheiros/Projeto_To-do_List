import { useEffect } from "react"
import { useState } from "react"
import ThemeImage from "../assets/thememode.png"

function SwitchMode() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

    useEffect(() => {
        localStorage.setItem("theme", theme)

        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const handleThemeSwitch = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
    }

    return (
        <img src={ThemeImage} alt="Botão de alterar tema" className="h-6 w-6 hover:cursor-pointer" onClick={handleThemeSwitch}/>
    )
}

export default SwitchMode