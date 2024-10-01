export function noteList(notes, onButtonClick) {
    let ol = document.createElement('ol');
    ol.classList.add('entity-list');
    notes.forEach(note => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(note.date + ', ' + note.text));
        if(note.done) {
            li.classList.add('done');
        }
        ol.appendChild(li);
    });
    return ol;
}
