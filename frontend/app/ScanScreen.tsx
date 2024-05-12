import { Camera, CameraType, FlashMode } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import React from "react";
import { useState } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Image } from "expo-image";

import { SheetManager } from "react-native-actions-sheet";

import { useContext } from "react";
import { ScannedIngredientsContext } from "../providers/ScannedItemProvider";

import { ImageToItems } from "../api/IngredientsFunctions";

export default function App() {
  const isFocused = useIsFocused();
  const [CameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] =
    MediaLibrary.usePermissions();
  const [imagePickerPermission, requestImagePickerPermission] =
    ImagePicker.useCameraPermissions();
  let { height, width } = useWindowDimensions();
  const { setScannedIngredients } = useContext(ScannedIngredientsContext);

  const cameraRef = React.useRef<Camera>(null);
  const [pickedImage, setPickedImage] = useState<String | null>(null);
  const [torch, setTorch] = useState<FlashMode>(FlashMode.off);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const [isRatioSet, setIsRatioSet] = useState(false);

  /* guards */
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[rgba(0, 0, 0, 1)]">
        <ActivityIndicator
          size="large"
          color="#00ff00"
          className="opacity-100"
        />
        <Text className="text-center font-pps mt-4">
          🫣👀 at what you just 🛒🛍️
        </Text>
      </View>
    );
  }
  if (!CameraPermission || !galleryPermission || !imagePickerPermission)
    return <View />;
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
    requestGalleryPermission();
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
    requestImagePickerPermission();
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to pick an image
        </Text>
      </View>
    );
  }

  /** Button handlers */
  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      // uri will be passed to model
      console.log("Captured an image ✅");

      // Save the image to the gallery
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      await MediaLibrary.createAlbumAsync("Recipict", asset, false);

      console.log("Image saved to gallery ✅");

      // show gallery
      await handleGallery();

      // Todo: fix error when passing photo.uri in base64 format
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
      console.log("Picked an image from gallery ✅");

      // convert image into base64
      const imageURI = result.assets[0].uri;
      setPickedImage(imageURI);
      const base64ImageData = await FileSystem.readAsStringAsync(imageURI, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // get items from image
      try {
        setIsLoading(true);

        const startTime = performance.now();

        const items = await ImageToItems(base64ImageData);

        const endTime = performance.now();
        console.log(
          "Execution time:",
          ((endTime - startTime) / 1000).toFixed(2),
          "seconds"
        );

        setScannedIngredients(items);
        SheetManager.show("scanned-items-sheet");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTorch = () => {
    setTorch(torch === FlashMode.off ? FlashMode.torch : FlashMode.off);
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android" && cameraRef) {
      const ratios: any = await cameraRef.current?.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances: any = {};
      let realRatios: any = {};
      let minDistance = null;
      const screenRatio = height / width;

      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = distance;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={[styles.camera]}
          type={CameraType.back}
          ref={cameraRef}
          flashMode={torch}
          ratio={ratio}
          onCameraReady={setCameraReady}
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
      )}
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
