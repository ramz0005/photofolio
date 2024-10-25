import { useState, useEffect } from "react";
import "./ImageList.css";
import ImageForm from "../ImageForm/ImageForm";
import Image from "../Image/Image";
import Lightbox from "../Lightbox/Lightbox";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../../FirebaseInit";
import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";

export default function ImageList(props) {
    const { openAlbum, setOpenAlbum } = props;
    const [showImageForm, setShowImageForm] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageSearch, setImageSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [imageList, setImageList] = useState([]);
    const [updateImage, setUpdateImage] = useState(null);


    async function handleImageDelete(image) {
        await updateDoc(doc(db, "albums", openAlbum.albumId), {
            imageList: arrayRemove(image)
        });
        toast.success("Image Successfully Deleted from your Album!");
    }

    function handleImageEdit(image) {
        setUpdateImage(image);
        setShowImageForm(true);
    }

    function openLightbox(index){
        setCurrentImageIndex(index);
        setImageOpen(true);
    }

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "albums", openAlbum.albumId), (doc) => {
            const data = doc.data().imageList || [];
            setImageList(data);
        });

        return () => unsub(); // Cleanup the listener when component unmounts
    }, [openAlbum.albumId]);

    return (
        <>
            <ToastContainer />
            <div className="imageList-container">
                <div>
                    {imageOpen && <Lightbox imageList={imageList} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} setImageOpen={setImageOpen} />}
                    {showImageForm && <ImageForm
                        albumName={openAlbum.albumName}
                        albumId={openAlbum.albumId}
                        updateImage={updateImage}
                        setUpdateImage={setUpdateImage}
                        setShowImageForm={setShowImageForm} />}
                    <div className="imageList-top">
                        <span onClick={() => setOpenAlbum({ albumId: "", albumName: "", open: false })}> {/* Handle back navigation */}
                            <img src={require("../../assets/back.png")} alt="back" />
                        </span>
                        <h3>Images in {openAlbum.albumName}</h3>
                        {!imageSearch ? (
                            <div className="imageList-search">
                                <img
                                    src={require("../../assets/search.png")}
                                    alt="search"
                                    onClick={() => setImageSearch(true)}
                                />
                            </div>
                        ) : (
                            <div className="imageList-search">
                                <input
                                    placeholder="Search by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <img
                                    src={require("../../assets/clear.png")}
                                    alt="clear"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setImageSearch(false);
                                    }}
                                />
                            </div>
                        )}
                        <button className={showImageForm ? "imageForm-active" : "imageForm-notActive"} onClick={() => setShowImageForm(!showImageForm)}>
                            {!showImageForm ? "Add image" : "Cancel"}
                        </button>
                    </div>
                    <div className="imageList">
                        {imageList.length > 0 ? (
                            imageList.filter((image) => {
                                return searchQuery.toLocaleLowerCase() === ''
                                    ? image
                                    : image.title.toLocaleLowerCase().includes(searchQuery);
                                // map function to map over each image and show them inside a card
                            }).map((image, i) => <Image
                            key={i}
                            image={image}
                            index={i}
                            handleImageDelete={handleImageDelete}
                            handleImageEdit={handleImageEdit}
                            openLightbox={openLightbox}
                            />)
                        ) : (
                            <p>No images found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
