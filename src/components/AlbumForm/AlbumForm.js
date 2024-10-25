import { useRef } from "react";
import "./AlbumForm.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db } from "../../FirebaseInit"
import { collection, addDoc } from "firebase/firestore";

export default function AlbumForm() {

    // for Album name
    const nameRef = useRef();

    // to clear data from inputbox when user click on clear button
    function clearForm(e) {
        e.preventDefault();
        nameRef.current.value = "";
        nameRef.current.focus();
    }

    // add a new album inside the database
    async function handleSubmit(e) {
        e.preventDefault();

        // Add a new document with a generated id.
        await addDoc(collection(db, "albums"), {
            albumName: nameRef.current.value,
            imageList: [],
        }
        );

        // notification for new album
        toast.success("Album added successfully.");

        // clear values inside form after submission and focusing on input box
        nameRef.current.value = "";
        nameRef.current.focus();
    }

    return (
        <>
            <ToastContainer />
            <div className="albumForm-container">
                <span>Create an album</span>
                <form onSubmit={handleSubmit}>
                    <input required placeholder="Album Name" ref={nameRef}></input>
                    <button type="button" onClick={clearForm}>Clear</button>
                    <button>Create</button>
                </form>
            </div>
        </>
    )
}