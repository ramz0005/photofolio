import { useState, useEffect } from "react";
import Album from "../Album/Album";
import ImageList from "../ImageList/ImageList";
import "./AlbumList.css"

import { db } from "../../FirebaseInit"
import { collection, onSnapshot } from "firebase/firestore";
import AlbumForm from "../AlbumForm/AlbumForm";

export default function AlbumList() {
    const [openAlbum, setOpenAlbum] = useState({ albumId: "", albumName:"", open: false });
    const [albumList, setAlbumList] = useState([]);
    const [showAlbumForm, setShowAlbumForm] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
            const albums = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlbumList(albums);
        });

        // Cleanup listener when the component unmounts
        return () => unsub();
    }, []);

    return (
        <>
            <div className="albumList-container">
                {!openAlbum.open ? (
                    <div>
                        {showAlbumForm && <AlbumForm />}
                        <div className="albumList-top">
                            <h3>Your albums</h3>
                            <button className={showAlbumForm ? "albumForm-active" : "albumForm-notActive"} onClick={() => setShowAlbumForm(!showAlbumForm)}>
                                {!showAlbumForm ? "Add album" : "Cancel"}
                            </button>
                        </div>
                        <div className="albumList">
                            {albumList.map((album, i) => (
                                <Album key={album.id} info={album} setOpenAlbum={setOpenAlbum} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />
                )}
            </div>
        </>
    );
}
