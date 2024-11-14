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
        let noteEditForm = null;
        if(id) {
            let note = await noteModel.getNote(id);
            noteEditForm = noteForm(note, onEditFormSubmit, onLoad, onDelete(id));
        } else {
            noteEditForm = noteForm(null, onEditFormSubmit, onLoad);
        }
        replaceContent(noteEditForm);
    }
}

async function onEditFormSubmit(event) {
    event.preventDefault();
    let note = {};
    if(this["id-input"]) {
        note.id = parseInt(this["id-input"].value);
    }
    if(this["text"].value.match(/\S+/g)) {
        note.text = this["text"].value.trim();
    } else {
        alert('Поле «Описание» не заполнено');
        return;
    }
    if(this["date"].value.trim().match(/\d{2}\.\d{2}\.\d{4}/g)) {
        let date = this["date"].value.trim().split('.').map(e => parseInt(e));
        const isLeapYear = (y) => !(y % 400) ? true : !(y % 100) ? false : !(y % 4);
        const rules = [{
            months: [1, 3, 5, 7, 8, 10, 12],
            lastDay: 31
        }, {
            months: [4, 6, 9, 11],
            lastDay: 30
        }, {
            months: [2],
            lastDay: isLeapYear(date[2]) ? 29 : 28
        }];
        let rule = rules.find(r => r.months.some(m => m === date[1]));
        if(rule) {
            if(date[0] <= rule.lastDay) {
                note.date = this["date"].value.trim();
            } else {
                alert('Некорректный день в поле «Дата»');
                return;
            }
        } else {
            alert('Некорректный месяц в поле «Дата»');
            return;
        }
    } else {
        alert('Поле «Дата» не соответствует формату dd.MM.yyyy');
        return;
    }
    note.done = this["done"].checked;
    await noteModel.saveNote(note);
    await onLoad();
}

function onDelete(id) {
    return async function() {
        await noteModel.deleteNote(id);
        await onLoad();
    }
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
