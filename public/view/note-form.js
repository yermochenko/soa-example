function formInputTextElement(labelText, id, name, value) {
    let div = document.createElement('div');
    div.classList.add('form-element');
    let label = document.createElement('label');
    label.htmlFor = id;
    label.appendChild(document.createTextNode(labelText));
    div.appendChild(label);
    let input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.name = name;
    if(value) {
        input.value = value;
    }
    div.appendChild(input);
    return div;
}

function formInputCheckboxElement(labelText, name, checked) {
    let div = document.createElement('div');
    div.classList.add('form-element');
    let label = document.createElement('label');
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = name;
    if(checked) {
        input.checked = checked;
    }
    label.appendChild(input);
    label.appendChild(document.createTextNode(labelText));
    div.appendChild(label);
    return div;
}

function formButtonElement(type, text, onClick) {
    let button = document.createElement('button');
    button.type = type;
    button.appendChild(document.createTextNode(text));
    if(onClick) {
        button.addEventListener('click', onClick);
    }
    return button;
}

export function noteForm(note, onSubmit, onCancel) {
    let div = document.createElement('div');
    let header = document.createElement('h1');
    if(note) {
        header.appendChild(document.createTextNode('Редактирование заметки'));
    } else {
        header.appendChild(document.createTextNode('Добавление новой заметки'));
    }
    div.appendChild(header);
    let form = document.createElement('form');
    form.addEventListener('submit', onSubmit);
    if(note) {
        let idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.name = 'id';
        idInput.value = note.id;
        form.appendChild(idInput);
    }
    form.appendChild(formInputTextElement('Описание:', 'text-id', 'text', note ? note.text : undefined));
    form.appendChild(formInputTextElement('Дата:', 'date-id', 'date', note ? note.date : undefined));
    form.appendChild(formInputCheckboxElement('выполнена', 'done', note ? note.done : false));
    let buttons = document.createElement('div');
    buttons.appendChild(formButtonElement('submit', 'Сохранить'));
    buttons.appendChild(formButtonElement('button', 'Отменить', onCancel));
    form.appendChild(buttons);
    div.appendChild(form);
    return div;
}
