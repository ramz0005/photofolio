import "./Lightbox.css"

export default function Lightbox(props) {
    const{ imageList, currentImageIndex, setCurrentImageIndex, setImageOpen } = props;

    function handleNext(e){
        e.preventDefault();
        if(currentImageIndex === imageList.length-1){
            setCurrentImageIndex(0);
        }
        else{
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }


    function handlePrev(e){
        e.preventDefault();
        if(currentImageIndex === 0){
            setCurrentImageIndex(imageList.length-1);
        }
        else{
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }

    return (
        <>
            <div class="lightbox">
                <button onClick={()=>{setImageOpen(false)}}>x</button>
                <button onClick={handlePrev}>&lt;</button>
                <img src={imageList[currentImageIndex].imageUrl} alt={imageList[currentImageIndex].title}></img>
                <button onClick={handleNext}>&gt;</button>
            </div>
        </>
    )
}