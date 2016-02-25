import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
  	this.bindActions(NoteActions);

    this.notes = [];

    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this)
    });
  }

  getNotesByIds(ids) {
    /* 1. Make sure we are operating on an array and map over the ids
    [id, id, id, ...] -> [[Note], [], [Note], ...] */
    return (ids || []).map(id =>
      // 2. Extract matching notes
      this.notes.filter(note => note.id === id)
      // 3. filter out possible empty arrays and get notes
    ).filter(a => a.length).map(a => a[0]);
  }

  create(note) {
    const notes = this.notes;

    note.id = uuid.v4();

    this.setState({
      notes: notes.concat(note)
    });

    return note;
  }

  update(updatedNote) {
    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        return Object.assign({}, note, updatedNote);
      }

      return note;
    });

    this.setState({notes});
  }

  delete(id) {
    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }
}

export default alt.createStore(NoteStore, 'NoteStore');