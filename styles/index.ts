import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#eee',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '88%',
    padding: 16,
    height: 50,
    borderWidth: 2,
    borderColor: '#555',
    fontSize: 16,
    backgroundColor: '#333',
    color: '#fff',
    marginHorizontal: 20,
    borderRadius: 8,
  },
  button: {
    width: '88%',
    backgroundColor: '#00ccbfff',
    height: 40,
    marginVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
  },
    card_title: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#fff' 
    },
    card_text: {
        marginTop: 10,
        fontSize: 16,
        color: '#fff' // Slightly larger text
  },
  button_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#4a4a4aff',
    borderRadius: 12,
    padding: 20,
    marginTop: 0,
    width: '80%',
    borderWidth: 1,
    borderColor: '#656565ff',
    },
  image: {
    width: '80%',
    height: 200,
    borderRadius: 12,
    marginTop: 20,
  },
})