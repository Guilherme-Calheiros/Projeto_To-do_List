const Button = ({ text, onClick, type = "button", w, h}) => {
    return <button
        className="px-6 py-2 bg-primary-300 hover:bg-primary-200 rounded-xl text-white text-base font-bold transition-all"
        onClick={onClick}
        type=""
        style={{width: w, height: h}}
    >
        {text}
    </button>
}

export default Button