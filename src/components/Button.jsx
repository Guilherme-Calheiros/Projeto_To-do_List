const Button = ({ text, onClick, type = "button" }) => {
    return <button
        className="px-6 py-2 bg-primary-300 hover:bg-primary-200 rounded-xl text-white text-xl font-bold transition-all"
        onClick={onClick}
        type=""
    >
        {text}
    </button>
}

export default Button