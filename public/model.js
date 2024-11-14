export const model = {
    "url-note": 'http://localhost:3000/note',

    getNotes: async function() {
        let resp = await fetch(this["url-note"], { method: 'GET' });
        return resp.json();
    },

    getNote: async function(id) {
        let resp = await fetch(this["url-note"] + "?id=" + id, { method: 'GET' });
        return resp.json();
    },

    saveNote: async function(note) {
        return fetch(
            this["url-note"], {
                method: note.id ? 'PUT' : 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(note)
            }
        );
    },

    deleteNote: async function(id) {
        return fetch(this["url-note"] + "?id=" + id, { method: 'DELETE' });
    }
};
