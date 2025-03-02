import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, BackHandler } from 'react-native';
import { Text, Button, Portal, Dialog, Surface, ProgressBar } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function CookingModeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [exitDialog, setExitDialog] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Example recipe data - replace with API call
  const recipe = {
    title: 'Köfte',
    steps: [
      {
        instruction: 'Kıymayı geniş bir kaba alın.',
        timer: null,
      },
      {
        instruction: 'Soğanı ve sarımsağı ince ince doğrayın.',
        timer: null,
      },
      {
        instruction: 'Tüm malzemeleri karıştırın.',
        timer: null,
      },
      {
        instruction: 'Köfte şekli verin.',
        timer: null,
      },
      {
        instruction: 'Izgara veya tavada pişirin.',
        timer: 900, // 15 minutes in seconds
      },
    ],
  };

  useEffect(() => {
    if (voiceEnabled) {
      Speech.speak(recipe.steps[currentStep].instruction, { language: 'tr' });
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setExitDialog(true);
      return true;
    });

    return () => {
      Speech.stop();
      backHandler.remove();
    };
  }, [currentStep, voiceEnabled]);

  const handleNext = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleExit = () => {
    router.back();
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (voiceEnabled) {
      Speech.stop();
    } else {
      Speech.speak(recipe.steps[currentStep].instruction, { language: 'tr' });
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.content} elevation={2}>
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.title}>{recipe.title}</Text>
          <Text variant="titleMedium">
            Adım {currentStep + 1}/{recipe.steps.length}
          </Text>
        </View>

        <ProgressBar 
          progress={(currentStep + 1) / recipe.steps.length} 
          color="#f4511e" 
          style={styles.progress}
        />

        <View style={styles.stepContainer}>
          <Text variant="headlineSmall" style={styles.instruction}>
            {recipe.steps[currentStep].instruction}
          </Text>

          {recipe.steps[currentStep].timer && (
            <Button 
              mode="contained" 
              onPress={() => {}}
              style={styles.timerButton}
              icon="timer"
            >
              Zamanlayıcı Başlat ({recipe.steps[currentStep].timer / 60} dk)
            </Button>
          )}
        </View>

        <View style={styles.controls}>
          <Button 
            mode="outlined" 
            onPress={handlePrevious}
            disabled={currentStep === 0}
            style={styles.controlButton}
            icon="arrow-left"
          >
            Önceki
          </Button>

          <Button
            mode="outlined"
            onPress={toggleVoice}
            style={styles.controlButton}
            icon={voiceEnabled ? "volume-high" : "volume-off"}
          >
            {voiceEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
          </Button>

          <Button 
            mode="contained" 
            onPress={handleNext}
            disabled={currentStep === recipe.steps.length - 1}
            style={[styles.controlButton, styles.nextButton]}
            icon="arrow-right"
          >
            Sonraki
          </Button>
        </View>
      </Surface>

      <Portal>
        <Dialog visible={exitDialog} onDismiss={() => setExitDialog(false)}>
          <Dialog.Title>Tarifi sonlandırmak istiyor musunuz?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              İlerlemeniz kaydedilmeyecek.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setExitDialog(false)}>İptal</Button>
            <Button onPress={handleExit}>Çık</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  content: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progress: {
    height: 8,
    borderRadius: 4,
    marginBottom: 24,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 24,
  },
  timerButton: {
    backgroundColor: '#f4511e',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  controlButton: {
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#f4511e',
  },
});