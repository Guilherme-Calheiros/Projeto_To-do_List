const Input = ({ type, placeholder, value, onChange }) => {
    return <input
        className="bg-slate-100 p-2 rounded-xl outline-none shadow w-5/6"
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
    />
}

export default Input