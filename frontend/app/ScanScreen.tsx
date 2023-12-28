import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

import React from "react";
import { useState } from "react";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { SheetManager } from "react-native-actions-sheet";

import RNFS from "react-native-fs";

const { DocumentProcessorServiceClient } =
  require("@google-cloud/documentai").v1;
const client = new DocumentProcessorServiceClient();

const projectId = "recipicttest";
const locationId = "us"; // Format is 'us' or 'eu'
const processorId = "9f398eb111a3ed90"; // Create processor in Cloud Console

export default function App() {
  const [CameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [galleryPermission, requestgalleryPermission] =
    MediaLibrary.usePermissions();
  const [imagePickerPermission, requestimagePickerPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const cameraRef = React.useRef<Camera>(null);

  const [pickedImage, setPickedImage] = useState<String | null>(null);
  const [torch, setTorch] = useState<FlashMode>(FlashMode.off);

  if (!CameraPermission || !galleryPermission || !imagePickerPermission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (
    !CameraPermission.granted ||
    !galleryPermission.granted ||
    !imagePickerPermission.granted
  ) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
      </View>
    );
  }

  const sendDatatoBackend = async (imageURI: string) => {
    const client = new DocumentProcessorServiceClient();

    // Convert the image to a base64 string
    const base64Image = await RNFS.readFile(imageURI, "base64");

    const request = {
      name: `projects/${projectId}/locations/${locationId}/processors/${processorId}`,
      rawDocument: {
        content: base64Image, // pass to API
        mimeType: "image/jpeg",
      },
    };

    try {
      const [result] = await client.processDocument(request);
      console.log(result);
      // res.json(result);
      // console.log(result);
    } catch (error) {
      // res.status(500).send(error.message);
      // console.log(error.message);
    }

    // // Call to backend
    // const response = await fetch("http://192.168.1.231:3000/process-image", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     imageURI: imageURI, // THIS GOES TO BACKEND ---
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error("HTTP error " + response.status);
    // }

    // const result = await response.json();
    // console.log(result);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const imageURI = photo.uri;

      console.log("Captured image URI: " + imageURI + "\n");

      // Save the image to the gallery
      const asset = await MediaLibrary.createAssetAsync(imageURI);
      await MediaLibrary.createAlbumAsync("Recipict", asset, false);

      // send to backend
      sendDatatoBackend(imageURI);

      // show popup [SHOULD BE IN THE BOTTOM OF THIS METHOD]
      SheetManager.show("scanned-items-sheet");
    }
  };

  const handleGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    // wii be passed to model
    console.log(result);

    if (!result.canceled) {
      const imageURI = result.assets[0].uri;
      console.log("\npicked image URI: " + imageURI) + "\n";

      sendDatatoBackend(imageURI);
    }
  };

  const handleTorch = () => {
    setTorch(torch === FlashMode.off ? FlashMode.torch : FlashMode.off);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        ref={cameraRef}
        flashMode={torch}
      >
        {/* Inside camera */}
        <View style={styles.buttonContainer}>
          {/* Control bar */}
          <View className="bg-[#F4F4F4] rounded-xl w-fit px-4 h-[38] flex items-center justify-center flex-row space-x-8">
            {/* Gallery */}
            <TouchableOpacity onPress={handleGallery}>
              <Image
                className="w-[20px] h-[20px]"
                style={{ resizeMode: "contain" }}
                source={require("../assets/icons/Gallery.svg")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCapture}>
              <Image
                className="w-[36px] h-[30px]"
                style={{ resizeMode: "contain" }}
                source={require("../assets/icons/Camera.svg")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleTorch}>
              <Image
                className="w-[20px] h-[20px]"
                style={{ resizeMode: "contain" }}
                source={require("../assets/icons/Flash.svg")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 64,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
