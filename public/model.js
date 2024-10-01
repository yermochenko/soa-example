export const model = {
    "url-note": 'http://localhost:3000/note',

    getNoteList: async function() {
        let resp = await fetch(this["url-note"], { method: 'GET' });
        return resp.json();
    }
};
