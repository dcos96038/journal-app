import {collection, getDocs} from "@firebase/firestore";

import {db} from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
  const notesDoc = await getDocs(collection(db, `${uid}/journal/notes`));
  const notes = [];

  notesDoc.forEach((child) => {
    notes.push({
      id: child.id,
      ...child.data(),
    });
  });

  return notes;
};
