import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

interface LocalImage {
  defaultUri?: string;
  remoteUri?: string;
}

export default function App() {
  const [selectedImg, setSelectedImg] = useState<LocalImage | null>(null);

  useEffect(() => {
    fetchRandomImageAsync();
  }, []);

  const openImagePickerAsync = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permissão não concedida...");
      return;
    }

    const picker = await ImagePicker.launchImageLibraryAsync();
    if (picker.cancelled) return;

    setSelectedImg({ remoteUri: picker.uri } as LocalImage);
  };

  const openShareDialogAsync = async () => {
    if ((await Sharing.isAvailableAsync()) && selectedImg?.remoteUri) {
      Sharing.shareAsync(selectedImg.remoteUri);
      return;
    }

    alert("Imagem não selecionada");
    return;
  };

  const fetchRandomImageAsync = async () => {
    const headers = new Headers();
    headers.append(
      "Authorization",
      "ML753BSmTZzdvu7dJgJ05RPoCGRBWRdddRv1FD9bVjQ"
    );
    const parms = {
      method: "GET",
      headers,
    };
    const response = await fetch(
      "https://api.unsplash.com/photos/random?client_id=MBHpyxQMkz8yn9nnolr0rWUZ0lm0FX_n47ZgZ8RBX_I",
      parms
    );
    const contextData = await response.json();
    setSelectedImg({
      defaultUri: contextData['urls']['thumb'],
    } as LocalImage)
  };

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>Por favor, selecione uma imagem...</Text>
      </View>

      <Image
        style={styles.image}
        source={{ uri: selectedImg?.remoteUri ?? selectedImg?.defaultUri }}
        resizeMode="contain"
      />

      <View style={styles.actions}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonLabel}>Selecionar imagem...</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonLabel}>Compartilhar imagem...</Text>
          <Ionicons name="share-outline" size={16} style={styles.buttonLabel} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    display: "flex",
    flexDirection: "row",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    ...Platform.select({
      ios: {
        borderRadius: 25,
        backgroundColor: "#333",
        maxHeight: Dimensions.get("screen").height * 0.05,
      },
      android: {
        borderRadius: 5,
        backgroundColor: "#aaa",
        maxHeight: Dimensions.get("screen").height * 0.06,
      },
    }),
  },
  buttonLabel: {
    ...Platform.select({
      ios: {
        color: "#fff",
      },
      android: {
        color: "#000",
      },
    }),
  },
});
