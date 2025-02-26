import { StyleSheet, Button, Text, TextInput, View, FlatList, ScrollView, Pressable } from 'react-native';
import { firestore, doc, deleteDoc, GROCERIES, addDoc, collection, serverTimestamp, onSnapshot, query } from './firebase/Config';
import { Styles } from './style/Style';
import { useEffect, useState } from 'react';
import { orderBy } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Entypo';

export default function App() {
  const [userInput, setUserInput] = useState('')
  const [apiGroceries, setApiGroceries] = useState([])

  useEffect(() => {
    const q = query(collection(firestore, GROCERIES), orderBy('created', 'desc'))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempGroceries = []
      querySnapshot.forEach((doc) => {
        //console.log(doc.id)
        //console.log(doc.data().created)
        // firestore "knows" to put these in right order even though returning value is an object ex. {"nanoseconds": 923000000, "seconds": 1740577996}
        tempGroceries.push({...doc.data(), id: doc.id, created: doc.data().created})
      })
      setApiGroceries(tempGroceries)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const save = async () => {
    const docRef = await addDoc(collection(firestore, GROCERIES), {
      text: userInput,
      created: serverTimestamp(),
    }).catch(error => console.log(error))

    setUserInput('')
    console.log("Message saved.")
  }

  const groceryDelete = async(id) => {
    const docRef = await deleteDoc(
      doc(
        firestore,
        GROCERIES,
        id
      )
    ).catch(error => console.log(error))

    console.log("Message deleted.")
  }

  return (
    <View style={[Styles.container, {paddingTop: 60}]}>
      <Text>Shopping list</Text>
      <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, justifyContent: 'center'}}>
        <TextInput
          style={Styles.inputArea}
          placeholder='Add new item...'
          value={userInput}
          onChangeText={setUserInput}
          maxLength={40}
        />
        <Button
          title="Save"
          onPress={() => {save();console.log("AIGHT")}}
        />
      </View>
      <ScrollView>
        {
          apiGroceries.map((groceries) => {
            return(
              <View key={groceries.id} style={Styles.grocetyItem}>
                <Text>{groceries.text}</Text>
                <Pressable
                  onPress={() => {
                    console.log('press', groceries.id)
                    groceryDelete(groceries.id)
                  }}

                >
                  <Icon name="trash" size={30} />
                </Pressable>

              </View>
            )
          })
        }
      </ScrollView>
    </View>
  );
}
