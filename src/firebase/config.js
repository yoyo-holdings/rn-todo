import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'
import {
  API_URL,
  AUTHDOM,
  API_KEY,
  PROJ_ID,
  BUCKET,
  SENDERID,
  APPID,
  MEASUREMENTID,
} from '@env'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTHDOM,
  databaseURL: API_URL,
  projectId: PROJ_ID,
  storageBucket: BUCKET,
  messagingSenderId: SENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
