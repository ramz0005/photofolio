
import { useState } from "react"
import "./Image.css"
export default function Image(props) {
    const { image, index, handleImageDelete, handleImageEdit, openLightbox } = props
    const [currentHoverIndex, setCurrentHoverIndex] = useState(null)
    return (
        <>
            <div className="image">
                <div className="image-image"
                    onMouseOver={() => {
                        setCurrentHoverIndex(index)
                    }}
                    onMouseLeave={() => {
                        setCurrentHoverIndex(null);
                    }}
                    >
                    <div className={currentHoverIndex===index?("image-update active"):("image-update")}>
                        <img src={require("../../assets/edit.png")} alt="update" onClick={() => {handleImageEdit(image)}}></img>
                    </div>
                    <div className={currentHoverIndex===index?("image-delete active"):("image-delete")}>
                        <img src={require("../../assets/trash-bin.png")} alt="delete" onClick={() => {handleImageDelete(image)}}></img>
                    </div>
                    <img src={image.imageUrl} alt={image.title} onClick={() => {openLightbox(index)}}></img>
                    <span>{image.title}</span>
                </div>
            </div>
        </>
    )
}