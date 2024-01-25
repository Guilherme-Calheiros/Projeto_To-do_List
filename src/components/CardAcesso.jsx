
const CardAcesso = ({children, text}) => {
    return (
        <div className="bg-white dark:bg-[#2d2d2d] rounded-xl flex flex-col w-80 justify-center items-center gap-4 p-4">
            <h1 className="text-4xl text-primary-300 font-bold mb-8">{text}</h1>
            {children}
        </div>
    )
}

export default CardAcesso