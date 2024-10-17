export function noteList(notes, onEditButtonClick) {
    let div = document.createElement('div');
    let header = document.createElement('h1');
    header.appendChild(document.createTextNode('Список заметок'));
    div.appendChild(header);
    let ol = document.createElement('ol');
    ol.classList.add('entity-list');
    notes.forEach(note => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(note.date + ', ' + note.text));
        if(note.done) {
            li.classList.add('done');
        }
        let editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.setAttribute('note-id', note.id);
        editButton.appendChild(document.createTextNode('\u{1F589}'));
        editButton.addEventListener('click', onEditButtonClick(note.id));
        editButton.classList.add('inline-button');
        li.addEventListener('mouseover', () => { editButton.style.display = 'inline-block'; });
        li.addEventListener('mouseout', () => { editButton.style.display = 'none'; });
        li.appendChild(editButton);
    ol.appendChild(li);
    });
    div.appendChild(ol);
    let addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.appendChild(document.createTextNode('Добавить'));
    addButton.addEventListener('click', onEditButtonClick());
    div.appendChild(addButton);
    return div;
}
