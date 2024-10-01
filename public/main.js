// views

import { noteList } from '/view/note-list.js';


// models

import { model as noteModel } from '/model.js';


// controllers

async function onLoad() {
    let notes = await noteModel.getNoteList();
    document.getElementById('content').appendChild(noteList(notes));
}

window.addEventListener('load', onLoad);
