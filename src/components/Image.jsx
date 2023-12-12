
const Image = ({src, alt, w, h}) => {
    return (
        <div>
            <img src={src} alt={alt} style={{width: w, height: h}}/>
        </div>
    )
}

export default Image