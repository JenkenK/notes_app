document.addEventListener('DOMContentLoaded', () => {
    const newNoteForm = document.querySelector('#new-note-form');
    newNoteForm.addEventListener('submit', handleNewNoteFormSubmit);

    const deleteAllButton = document.querySelector('#delete-all');
    deleteAllButton.addEventListener('click', handleDeleteAllClick);

    const persistedNotes = localStorage.getItem('notes');

    if (!persistedNotes){
        localStorage.setItem('notes', JSON.stringify({}))
    } else {
        const notes = JSON.parse(persistedNotes)
        const noteList = document.querySelector('#notes-list');
        Object.keys(notes).forEach(key=>{
            noteList.appendChild(createNote(notes[key]));
        })
    }
});

const createNote = function ({noteTitle, noteText, noteColour,noteID}) {
    const noteListItem = document.createElement('li');
    noteListItem.classList.add('note-list-item');
  
    const title = document.createElement('h2');
    title.textContent = noteTitle;
    noteListItem.appendChild(title);
  
    const text = document.createElement('p');
    text.textContent = noteText;
    noteListItem.appendChild(text);
  
    const colour = document.createElement('div');
    colour.textContent = noteColour;
    noteListItem.appendChild(colour);
    noteListItem.setAttribute('id', noteID)
  
    return noteListItem;
}

const handleNewNoteFormSubmit = function (event) {
    event.preventDefault();
    const {target: {
        noteTitle:{
            value: noteTitle
        }, noteText:{value:noteText}, noteColour:{value:noteColour}
    }} = event
    const noteDate = new Date()
    const noteID = noteDate.toString();
    const note = {
        noteTitle, noteText, noteColour, noteID
    }

    const noteListItem = createNote(note);
    const noteList = document.querySelector('#notes-list');
    noteList.appendChild(noteListItem);

    const persistedNotes = JSON.parse(localStorage.getItem('notes'))
    localStorage.setItem('notes', JSON.stringify({...persistedNotes, [noteID]:note}))

    event.target.reset();
}

const handleDeleteAllClick = function () {
    const readingList = document.querySelector('#notes-list');
    localStorage.setItem('notes', JSON.stringify({}))
    readingList.innerHTML = '';
}
