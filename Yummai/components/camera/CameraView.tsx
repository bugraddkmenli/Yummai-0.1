import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

interface CameraViewProps {
  onPictureTaken?: (uri: string) => void;
  onClose?: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  onPictureTaken,
  onClose,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsProcessing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          skipProcessing: false,
        });

        if (onPictureTaken) {
          onPictureTaken(photo.uri);
        } else {
          // Navigate to result screen with the photo URI
          router.push({
            pathname: "/camera/result",
            params: { imageUri: photo.uri },
          });
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Add method to pick images from gallery using the updated API
  const pickImage = async () => {
    try {
      setIsProcessing(true);
      // Using the new MediaType API instead of deprecated MediaTypeOptions
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [ImagePicker.MediaType.Images],
        allowsEditing: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        
        if (onPictureTaken) {
          onPictureTaken(selectedImage.uri);
        } else {
          router.push({
            pathname: "/camera/result",
            params: { imageUri: selectedImage.uri },
          });
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleCameraType = () => {
    setType(current => 
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (router) {
      router.back();
    } else {
      // Fallback if router is undefined
      console.warn('Router is undefined, cannot navigate back');
      // You could implement an alternative navigation method here
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Kamera erişimi reddedildi</Text>
        <TouchableOpacity 
          style={[styles.permissionButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleClose}
        >
          <Text style={styles.permissionButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleClose}
            >
              <MaterialIcons name="close" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.flipButton}
              onPress={toggleCameraType}
            >
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.bottomBar}>
            {/* Add gallery button */}
            <TouchableOpacity 
              style={styles.galleryButton}
              onPress={pickImage}
              disabled={isProcessing}
            >
              <MaterialIcons name="photo-library" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.captureButton, isProcessing && styles.disabledButton]}
              onPress={takePicture}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>
            
            {/* Add a placeholder to balance the layout */}
            <View style={styles.galleryButton} />
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 40,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
  },
  disabledButton: {
    opacity: 0.7,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})