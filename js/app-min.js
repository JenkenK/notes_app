document.addEventListener("DOMContentLoaded",()=>{document.querySelector("#new-note-form").addEventListener("submit",handleNewNoteFormSubmit);document.querySelector("#delete-all").addEventListener("click",handleDeleteAllClick);const e=localStorage.getItem("notes");if(e){const t=JSON.parse(e),n=document.querySelector("#notes-list");Object.keys(t).forEach(e=>{n.appendChild(createNote(t[e]))})}else localStorage.setItem("notes",JSON.stringify({}))});const createNote=function({noteTitle:e,noteText:t,noteColour:n,noteID:o}){const l=document.createElement("li");l.classList.add("note-list-item");const c=document.createElement("h2");c.textContent=e,l.appendChild(c);const r=document.createElement("p");r.textContent=t,l.appendChild(r);const a=document.createElement("div");return a.textContent=n,l.appendChild(a),l.setAttribute("id",o),l},handleNewNoteFormSubmit=function(e){e.preventDefault();const{target:{noteTitle:{value:t},noteText:{value:n},noteColour:{value:o}}}=e,l=(new Date).toString(),c={noteTitle:t,noteText:n,noteColour:o,noteID:l},r=createNote(c);document.querySelector("#notes-list").appendChild(r);const a=JSON.parse(localStorage.getItem("notes"));localStorage.setItem("notes",JSON.stringify({...a,[l]:c})),e.target.reset()},handleDeleteAllClick=function(){const e=document.querySelector("#notes-list");localStorage.setItem("notes",JSON.stringify({})),e.innerHTML=""};