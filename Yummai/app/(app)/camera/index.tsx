import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView } from '../../../components/camera/CameraView';

export default function CameraScreen() {
  const router = useRouter();
  
  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <CameraView onClose={handleClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});