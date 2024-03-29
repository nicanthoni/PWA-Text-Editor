import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('PUT to the database');
  const editorDB = await openDB('jate', 1);
  const tx = editorDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result);

};

// logic that gets the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the db & version we want to use
  const contactDb = await openDB('jate', 1);
  // Create a new transaction & specify database and data privileges
  const tx = contactDb.transaction('jate', 'readonly');
  // Open up the chosen object store.
  const store = tx.objectStore('jate');
 // .get() method to get data in the database
  const request = store.get(1);
  // Get confirmation of the request`
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
