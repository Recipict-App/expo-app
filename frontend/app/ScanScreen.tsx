import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import React from "react";
import { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { SheetManager } from "react-native-actions-sheet";

const CloudFunctionURL: string =
  process.env.CLOUD_FUNCTION_DOCUMENT_AI_URL || "";

export default function ScanScreen() {
  const [CameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [galleryPermission, requestgalleryPermission] =
    MediaLibrary.usePermissions();
  const [imagePickerPermission, requestimagePickerPermission] =
    ImagePicker.useCameraPermissions();

  const cameraRef = React.useRef<Camera>(null);

  const [pickedImage, setPickedImage] = useState<String | null>(null);
  const [torch, setTorch] = useState<FlashMode>(FlashMode.off);

  if (!CameraPermission || !galleryPermission || !imagePickerPermission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!CameraPermission.granted) {
    requestCameraPermission();
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
      </View>
    );
  }

  if (!galleryPermission.granted) {
    requestgalleryPermission();
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to access the gallery
        </Text>
      </View>
    );
  }

  if (!imagePickerPermission.granted) {
    requestimagePickerPermission();
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to pick an image
        </Text>
      </View>
    );
  }

  const retrieveItems = async (imageURI: string) => {
    // convert image to base64
    const base64ImageData = await FileSystem.readAsStringAsync(imageURI, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const requestBody = {
      base64ImageData: base64ImageData, // goes to the cloud function
    };

    const response = await fetch(CloudFunctionURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // access items from response data
    const items = data.document.entities.map((item: any) => {
      let date = "";
      if (item.type == "date") {
        date = item.mentionText;
      } else if (item.type == "item_name") {
        if (date) {
          return {
            name: item.mentionText,
            quantity: "",
            duration: date,
          };
        } else {
          return {
            name: item.mentionText,
            quantity: "",
            duration: "",
          };
        }
      }
    });

    const filteredItems = items.filter((item: any) => item !== undefined);

    // create a new object
    const newObject = { items: filteredItems };

    console.log(newObject);

    console.log("------------------");
    console.log(
      data.document.entities.map((item: any) => {
        console.log(item.mentionText);
      })
    );
    console.log("------------------");

    return newObject;
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      // uri will be passed to model
      console.log("Captured an image ✅");

      // Save the image to the gallery
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      await MediaLibrary.createAlbumAsync("Recipict", asset, false);

      console.log("Image saved to gallery ✅");

      // pass image to backend
      // const items = await retrieveItems(photo.uri);

      // show gallery
      await handleGallery();

      // show popup [SHOULD BE IN THE BOTTOM OF THIS METHOD]
      // SheetManager.show("scanned-items-sheet"); // will pass items to the sheet
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

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      console.log("Picked an image from gallery ✅");

      // pass image to backend
      const items = await retrieveItems(result.assets[0].uri);

      SheetManager.show("scanned-items-sheet", {
        payload: items,
      });
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
                contentFit="contain"
                source={require("../assets/icons/Gallery.svg")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCapture}>
              <Image
                className="w-[36px] h-[30px]"
                contentFit="contain"
                source={require("../assets/icons/Camera.svg")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleTorch}>
              <Image
                className="w-[20px] h-[20px]"
                contentFit="contain"
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
