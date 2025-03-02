import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, Button, Switch, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    dailyRecipes: true,
    weeklyMealPlan: true,
    newFeatures: true,
    cookingReminders: true,
    specialOffers: false,
  });

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('notificationSettings');
      if (settings) {
        setNotifications(JSON.parse(settings));
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const handleToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(notifications));
      router.back();
    } catch (error) {
      console.error('Error saving notification settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Bildirim Ayarları</Text>
      </View>

      <Surface style={styles.section} elevation={1}>
        <View style={styles.settingItem}>
          <View style={styles.settingText}>
            <Text variant="titleMedium">Bildirimleri Etkinleştir</Text>
            <Text variant="bodyMedium" style={styles.settingDescription}>
              Tüm bildirimleri açın veya kapatın
            </Text>
          </View>
          <Switch
            value={notifications.pushEnabled}
            onValueChange={() => handleToggle('pushEnabled')}
            color="#f4511e"
          />
        </View>
        
        <Divider style={styles.divider} />

        <View style={[styles.settingItem, !notifications.pushEnabled && styles.disabledSetting]}>
          <View style={styles.settingText}>
            <Text variant="titleMedium">Günlük Tarifler</Text>
            <Text variant="bodyMedium" style={styles.settingDescription}>
              Her gün yeni tarif önerileri alın
            </Text>
          </View>
          <Switch
            value={notifications.dailyRecipes && notifications.pushEnabled}
            onValueChange={() => handleToggle('dailyRecipes')}
            disabled={!notifications.pushEnabled}
            color="#f4511e"
          />
        </View>

        <Divider style={styles.divider} />

        <View style={[styles.settingItem, !notifications.pushEnabled && styles.disabledSetting]}>
          <View style={styles.settingText}>
            <Text variant="titleMedium">Haftalık Yemek Planı</Text>
            <Text variant="bodyMedium" style={styles.settingDescription}>
              Her hafta kişiselleştirilmiş yemek planı alın
            </Text>
          </View>
          <Switch
            value={notifications.weeklyMealPlan && notifications.pushEnabled}
            onValueChange={() => handleToggle('weeklyMealPlan')}
            disabled={!notifications.pushEnabled}
            color="#f4511e"
          />
        </View>

        <Divider style={styles.divider} />

        <View style={[styles.settingItem, !notifications.pushEnabled && styles.disabledSetting]}>
          <View style={styles.settingText}>
            <Text variant="titleMedium">Pişirme Hatırlatıcıları</Text>
            <Text variant="bodyMedium" style={styles.settingDescription}>
              Planladığınız tarifler için hatırlatıcılar alın
            </Text>
          </View>
          <Switch
            value={notifications.cookingReminders && notifications.pushEnabled}
            onValueChange={() => handleToggle('cookingReminders')}
            disabled={!notifications.pushEnabled}
            color="#f4511e"
          />
        </View>

        <Divider style={styles.divider} />

        <View style={[styles.settingItem, !notifications.pushEnabled && styles.disabledSetting]}>
          <View style={styles.settingText}>
            <Text variant="titleMedium">Yeni Özellikler</Text>
            <Text variant="bodyMedium" style={styles.settingDescription}>
              Uygulama güncellemeleri ve yeni özellikler hakkında bilgi alın
            </Text>
          </View>
          <Switch
            value={notifications.newFeatures && notifications.pushEnabled}
            onValueChange={() => handleToggle('newFeatures')}
            disabled={!notifications.pushEnabled}
            color="#f4511e"
          />
        </View>

        <Divider style={styles.divider} />

        <View style={[styles.settingItem, !notifications.pushEnabled && styles.disabledSetting]}>
          <View style={styles.settingText}>
            <Text variant="titleMedium">Özel Teklifler</Text>
            <Text variant="bodyMedium" style={styles.settingDescription}>
              Özel teklifler ve promosyonlar hakkında bilgi alın
            </Text>
          </View>
          <Switch
            value={notifications.specialOffers && notifications.pushEnabled}
            onValueChange={() => handleToggle('specialOffers')}
            disabled={!notifications.pushEnabled}
            color="#f4511e"
          />
        </View>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          İptal
        </Button>
        <Button 
          mode="contained" 
          onPress={handleSave}
          loading={loading}
          disabled={loading}
          style={styles.saveButton}
        >
          Kaydet
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    flex: 1,
    marginRight: 16,
  },
  settingDescription: {
    color: '#666',
    marginTop: 4,
  },
  disabledSetting: {
    opacity: 0.5,
  },
  divider: {
    backgroundColor: '#e0e0e0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    borderColor: '#f4511e',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#f4511e',
  },
});