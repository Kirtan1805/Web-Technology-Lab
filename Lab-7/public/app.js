document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const addNoteForm = document.getElementById('addNoteForm');
    const notesContainer = document.getElementById('notesContainer');
    const editModal = document.getElementById('editModal');
    const editNoteForm = document.getElementById('editNoteForm');
    const closeBtn = document.querySelector('.close-btn');

    // API URL base
    const API_URL = '/notes';

    // Initialize app by fetching notes
    fetchNotes();

    // Event Listeners
    addNoteForm.addEventListener('submit', handleAddNote);
    editNoteForm.addEventListener('submit', handleUpdateNote);
    closeBtn.addEventListener('click', closeEditModal);

    // Close modal if clicked outside of it
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });

    /**
     * Fetch all notes from the server (GET /notes)
     */
    async function fetchNotes() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch notes');

            const notes = await response.json();
            renderNotes(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            notesContainer.innerHTML = '<p class="error">Failed to load notes. Make sure the server and MongoDB are running.</p>';
        }
    }

    /**
     * Render the notes to the DOM
     */
    function renderNotes(notes) {
        notesContainer.innerHTML = '';

        if (notes.length === 0) {
            notesContainer.innerHTML = '<p class="no-notes">No notes found. Add your first study note above!</p>';
            notesContainer.style.display = 'block';
            return;
        }

        notesContainer.style.display = 'grid';

        notes.forEach(note => {
            // Format the date mapping to YYYY-MM-DD
            const createdDate = new Date(note.created_date);
            const formattedDate = createdDate.toISOString().split('T')[0];

            const noteElement = document.createElement('div');
            noteElement.className = 'note-card';
            noteElement.innerHTML = `
                <div class="note-header">
                    <h3 class="note-title">${escapeHTML(note.title)}</h3>
                    <span class="note-subject">${escapeHTML(note.subject)}</span>
                </div>
                <div class="note-body">
                    <p>${escapeHTML(note.description).replace(/\n/g, '<br>')}</p>
                </div>
                <div class="note-footer">
                    <span class="note-date">Added: ${formattedDate}</span>
                    <div class="note-actions">
                        <button class="btn btn-edit" onclick="openEditModal('${note._id}', '${escapeHTML(note.title).replace(/'/g, "\\'")}', '${escapeHTML(note.description).replace(/'/g, "\\'")}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteNote('${note._id}')">Delete</button>
                    </div>
                </div>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    /**
     * Handle adding a new note (POST /notes)
     */
    async function handleAddNote(e) {
        e.preventDefault();

        // Get form values
        const title = document.getElementById('title').value;
        const subject = document.getElementById('subject').value;
        const description = document.getElementById('description').value;

        const newNote = {
            title,
            subject,
            description
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newNote)
            });

            if (!response.ok) throw new Error('Failed to add note');

            // Clear form and refetch notes
            addNoteForm.reset();
            fetchNotes();
        } catch (error) {
            console.error('Error adding note:', error);
            alert('Failed to add note. Check console for details.');
        }
    }

    /**
     * Handle deleting a note (DELETE /notes/:id)
     */
    window.deleteNote = async function (id) {
        if (!confirm('Are you sure you want to delete this note?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete note');

            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note. Check console for details.');
        }
    };

    /**
     * Handle modifying a note (PUT /notes/:id)
     */
    async function handleUpdateNote(e) {
        e.preventDefault();

        const id = document.getElementById('editNoteId').value;
        const title = document.getElementById('editTitle').value;
        const description = document.getElementById('editDescription').value;

        const updatedNote = {
            title,
            description
        };

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedNote)
            });

            if (!response.ok) throw new Error('Failed to update note');

            closeEditModal();
            fetchNotes();
        } catch (error) {
            console.error('Error updating note:', error);
            alert('Failed to update note. Check console for details.');
        }
    }

    /**
     * Modal functions
     */
    window.openEditModal = function (id, title, description) {
        document.getElementById('editNoteId').value = id;
        document.getElementById('editTitle').value = title;
        document.getElementById('editDescription').value = description;
        editModal.classList.add('show');
    };

    function closeEditModal() {
        editModal.classList.remove('show');
    }

    /**
     * Utility function to prevent XSS attacks when injecting user content
     */
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});
