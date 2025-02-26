import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "./API";

initializeApp(firebaseConfig);

const firestore = getFirestore()

const GROCERIES = 'groceries'

export {
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  GROCERIES,
  query,
  onSnapshot,
  deleteDoc,
  doc
}
