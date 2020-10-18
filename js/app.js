document.addEventListener('DOMContentLoaded', () => {
    const newNoteForm = document.querySelector('#new-note-form');
    newNoteForm.addEventListener('submit', handleNewNoteFormSubmit);

    const deleteAllButton = document.querySelector('#delete-all');
    deleteAllButton.addEventListener('click', handleDeleteAllClick);

    const filterSelect = document.querySelector('#filter-by');
    filterSelect.addEventListener('change', handleFilterChange);

    const persistedNotes = localStorage.getItem('notes');

    if (!persistedNotes){
        localStorage.setItem('notes', JSON.stringify({}))
    } else {
        console.log('persistedNotes', persistedNotes)
        const notes = JSON.parse(persistedNotes)
        console.log('notes', notes)
        const noteList = document.querySelector('#notes-list');
        Object.values(notes).forEach(note=>{
            noteList.appendChild(createNote(note));
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


    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fas fa-times"></i>`
    deleteButton.setAttribute('class', 'delete-button')
    deleteButton.onclick = () => handleDeleteClick(noteID)
    noteListItem.appendChild(deleteButton);


    noteListItem.setAttribute('id', noteID)
    noteListItem.setAttribute('class', 'note')
    noteListItem.setAttribute('data', noteColour)

    return noteListItem;
}

const handleNewNoteFormSubmit = function (event) {
    event.preventDefault();
    const {target: {
        noteTitle:{
            value: noteTitle
        }, 
        noteText:{
            value:noteText
        }, 
        noteColour:{
            value:noteColour
        }
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
    const readingNotesList = document.querySelector('#notes-list');
    localStorage.setItem('notes', JSON.stringify({}))
    readingNotesList.innerHTML = '';
}

const handleDeleteClick = function(noteID){
    const buttonElement = document.getElementById(noteID)
    buttonElement.remove()

    const persistedNotes = JSON.parse(localStorage.getItem('notes'))

    const { [noteID]: deletedNote, ...restOfNotes} = persistedNotes
    localStorage.setItem('notes', JSON.stringify(restOfNotes))
}

const handleFilterChange = (event) => {
    const value = event.target.value;
    const readingNotesList = document.querySelector('#notes-list');
    readingNotesList.innerHTML = '';
    const persistedNotes = JSON.parse(localStorage.getItem('notes'))
    if (value === 'None') {
        return Object.values(persistedNotes).forEach(value=>{
            console.log(value)
            readingNotesList.appendChild(createNote(value));
        })
    }
    Object.values(persistedNotes).filter((note) => note.noteColour === value).forEach(filteredNote=>{
        readingNotesList.appendChild(createNote(filteredNote));
    })
}

const handleFilterByOldNew = function(){
}

const handleFilterByNewOld = function(){
}

const handleFilterByAlphabetical = function(){
}