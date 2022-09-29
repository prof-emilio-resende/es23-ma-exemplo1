import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

interface LocalImage {
  defaultUri?: string;
  remoteUri?: string;
}

export default function App() {
  const [selectedImg, setSelectedImg] = useState<LocalImage | null>(null);

  useEffect(() => {
    setSelectedImg({ defaultUri: 'https://reactjs.org/logo-og.png' } as LocalImage)
  }, []);

  const openImagePickerAsync = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permissão não concedida...');
      return;
    }

    const picker = await ImagePicker.launchImageLibraryAsync();
    if (picker.cancelled) return;

    setSelectedImg({remoteUri: picker.uri} as LocalImage);
  }

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>Por favor, selecione uma imagem...</Text>
      </View>
      
      <Image 
        style={styles.image} 
        source={{uri: selectedImg?.remoteUri ?? selectedImg?.defaultUri}} 
        resizeMode="contain" 
      />
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
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
    height: 300,
    width: 300,
  },
  actions: {
    flex: 1,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 10,
    maxHeight: 40,
    ...Platform.select({
      ios: {
        borderRadius: 25,
        backgroundColor: '#333',
      },
      android: {
        borderRadius: 5,
        backgroundColor: '#aaa',
      }
    })
  },
  buttonLabel: {
    ...Platform.select({
      ios: {
        color: '#fff'
      },
      android: {
        color: '#000'
      }
    })
  },
});
