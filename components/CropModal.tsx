import { ImageEditor } from "@tahsinz21366/expo-crop-image";
import React, { useState } from "react";
import { Alert, Button, Image, View } from "react-native";

interface CropModalProps {
  pickedImageURI: string | null;
  setPickedImageURI: any;
}

export default function CropModal({
  pickedImageURI,
  setPickedImageURI,
}: CropModalProps) {
  const [editorVisible, setEditorVisible] = useState<boolean>(true);

  return (
    <View className="w-full h-full">
      <ImageEditor
        isVisible={editorVisible}
        imageUri={pickedImageURI}
        fixedAspectRatio={777}
        minimumCropDimensions={{
          width: 100,
          height: 100,
        }}
        onEditingCancel={() => setEditorVisible(false)}
        onEditingComplete={(result) => {
          setPickedImageURI(result);
        }}
      />
    </View>
  );
}
type EditorOptions = {
  backgroundColor?: string;
  controlBar?: {
    position?: "top" | "bottom";
    backgroundColor?: string;
    height?: number;
    cancelButton?: IconProps;
    cropButton?: IconProps;
    backButton?: IconProps;
    saveButton?: IconProps;
  };
  coverMarker?: {
    show?: boolean;
    color?: string;
  };
  gridOverlayColor?: string;
  overlayCropColor?: string;
};

type IconProps = {
  color: string;
  text: string;
  // iconName: FeatherIconNames | MaterialIconNames
};
