import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Chip, Surface, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetupDislikesScreen() {
  const router = useRouter();
  const [selectedDislikes, setSelectedDislikes] = useState<string[]>([]);
  const [customDislike, setCustomDislike] = useState('');
  const [isReady, setIsReady] = useState(false);
  
  // Make sure component is mounted before any navigation
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  const commonDislikes = [
    'Soğan', 'Sarımsak', 'Acı', 'Deniz Ürünleri', 'Mantar', 
    'Patlıcan', 'Kabak', 'Brokoli', 'Karnabahar', 'Kereviz',
    'Kişniş', 'Kırmızı Et', 'Tavuk', 'Mayonez', 'Hardal'
  ];

  const toggleDislike = (dislike: string) => {
    if (selectedDislikes.includes(dislike)) {
      setSelectedDislikes(selectedDislikes.filter(item => item !== dislike));
    } else {
      setSelectedDislikes([...selectedDislikes, dislike]);
    }
  };

  const addCustomDislike = () => {
    if (customDislike.trim() && !selectedDislikes.includes(customDislike.trim())) {
      setSelectedDislikes([...selectedDislikes, customDislike.trim()]);
      setCustomDislike('');
    }
  };

  const handleNext = async () => {
    if (!isReady) return;
    
    // Save selected dislikes
    await AsyncStorage.setItem('dislikes', JSON.stringify(selectedDislikes));
    router.push('/setup/4');
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={0}>
        <Text variant="headlineSmall" style={styles.title}>Sevmediğiniz Malzemeler</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Hangi malzemeleri sevmiyorsunuz? Tariflerinizde bunları önermeyeceğiz.
        </Text>
      </Surface>

      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Sevmediğiniz bir malzeme ekleyin"
            value={customDislike}
            onChangeText={setCustomDislike}
            mode="outlined"
            right={
              <TextInput.Icon 
                icon="plus" 
                onPress={addCustomDislike}
                disabled={!customDislike.trim()}
              />
            }
            style={styles.input}
          />
        </View>

        <View style={styles.chipContainer}>
          {commonDislikes.map((dislike) => (
            <Chip
              key={dislike}
              selected={selectedDislikes.includes(dislike)}
              onPress={() => toggleDislike(dislike)}
              style={styles.chip}
              selectedColor="#fff"
              showSelectedOverlay
              mode="outlined"
              selectedBackgroundColor="#f4511e"
            >
              {dislike}
            </Chip>
          ))}
          
          {selectedDislikes
            .filter(dislike => !commonDislikes.includes(dislike))
            .map((dislike) => (
              <Chip
                key={dislike}
                selected={true}
                onPress={() => toggleDislike(dislike)}
                style={styles.chip}
                selectedColor="#fff"
                showSelectedOverlay
                mode="outlined"
                selectedBackgroundColor="#f4511e"
              >
                {dislike}
              </Chip>
            ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={handleNext}
          style={styles.button}
        >
          İleri
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f4511e',
  },
  subtitle: {
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    margin: 4,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 8,
  },
});