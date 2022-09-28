import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import img from "./assets/icon.png";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>Por favor, selecione uma imagem...</Text>
      </View>
      <View style={styles.image}>
        <Image source={img} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => alert('ola!')} style={styles.button}>
          <Text style={styles.buttonLabel}>Selecionar imagem...</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('ola!')} style={styles.button}>
          <Text style={styles.buttonLabel}>Compartilhar imagem...</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  image: {
    flex: 1,
  },
  actions: {
    flex: 1,
    paddingTop: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#333'
  },
  buttonLabel: {
    color: '#fff'
  },
});
