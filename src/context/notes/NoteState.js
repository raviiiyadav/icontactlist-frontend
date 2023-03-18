import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    //   Add aLL note
    const getNotes = async () => {
        // Use API call: 63f4767d328280c708cb65cc
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    //   Add a note
    const addNote = async (title, description, tag) => {
        // Use API call: 63f4767d328280c708cb65cc
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note))
    }

    //   Delete a note
    const deleteNote = async (id) => {
        // Use API call: 63f4767d328280c708cb65cc
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        // eslint-disable-next-line
        const json = response.json();

        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }

    //   Edit a note
    const editNote = async (id, title, description, tag) => {
        // Use API call: 63f4767d328280c708cb65cc
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            // eslint-disable-next-line
            body: JSON.stringify({ title, description, tag })
        });
        // eslint-disable-next-line
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;