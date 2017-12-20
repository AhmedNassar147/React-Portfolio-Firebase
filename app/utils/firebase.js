import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCZQsBZRcGBYS4z1CH0gaSl9ro_fbdXH7w',
  authDomain: 'website-adeb9.firebaseapp.com',
  databaseURL: 'https://website-adeb9.firebaseio.com',
  projectId: 'website-adeb9',
  storageBucket: 'website-adeb9.appspot.com',
  messagingSenderId: '673747547656',
};
export default firebase.initializeApp(config);
export const database = firebase.database();
export const storage = firebase.storage();
