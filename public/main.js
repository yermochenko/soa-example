// views

import { noteList } from '/view/note-list.js';
import { noteForm } from '/view/note-form.js';


// models

import { model as noteModel } from '/model.js';


// controllers

let content = null;

function init() {
    content = document.getElementById('content');
}

async function onLoad() {
    let notes = await noteModel.getNotes();
    replaceContent(noteList(notes, onEditButtonClick));
}

function onEditButtonClick(id) {
    return async function() {
        let note = null;
        if(id) {
            note = await noteModel.getNote(id);
        }
        replaceContent(noteForm(note, onEditFormSubmit, onLoad));
    }
}

function onEditFormSubmit(event) {
    event.preventDefault();
    console.log(this);
}

window.addEventListener('load', init);
window.addEventListener('load', onLoad);

function replaceContent(child) {
    if(content) {
        while(content.firstChild) {
            content.removeChild(content.firstChild);
        }
        content.appendChild(child);
    }
}
