import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputArea: {
    borderColor: "#f5f5f5",
    borderRadius: 2,
    borderWidth: 2,
    width: '50%',
  },
  grocetyItem: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 50,
    justifyContent: 'center',
    margin: 10,
    padding:  10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  }
});

export { Styles }
