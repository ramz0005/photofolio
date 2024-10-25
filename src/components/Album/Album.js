import "./Album.css";

export default function Album(props) {

    let{info,setOpenAlbum} = props;

    function handleClick(){
        setOpenAlbum({albumId:info.id, albumName:info.albumName, open:true});
    }

    return (
        <>
            <div className="album" onClick={handleClick}>
                <img src={require("../../assets/photos.png")} alt="images"></img>
                <span>{info.albumName}</span>
            </div>
        </>
    );

}