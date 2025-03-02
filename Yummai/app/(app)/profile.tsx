import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, List, Button, Surface, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem('userProfile');
      if (profileData) {
        setUserProfile(JSON.parse(profileData));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      await AsyncStorage.removeItem('isLoggedIn');
      router.replace('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Avatar.Image
          size={80}
          source={userProfile?.profileImage ? { uri: userProfile.profileImage } : require('../../assets/default-avatar.png')}
        />
        <Text variant="headlineSmall" style={styles.name}>
          {userProfile?.firstName} {userProfile?.lastName}
        </Text>
      </Surface>

      <List.Section>
        <List.Subheader>Hesap</List.Subheader>
        <List.Item
          title="Profili Düzenle"
          left={props => <List.Icon {...props} icon="account-edit" />}
          onPress={() => router.push('/profile/edit')}
        />
        <List.Item
          title="Tercihler"
          left={props => <List.Icon {...props} icon="cog" />}
          onPress={() => router.push('/profile/preferences')}
        />
        <Divider />

        <List.Subheader>Yemek Tercihleri</List.Subheader>
        <List.Item
          title="Diyet Tercihleri"
          left={props => <List.Icon {...props} icon="food-apple" />}
          onPress={() => router.push('/profile/diet')}
        />
        <List.Item
          title="Alerjiler ve Kısıtlamalar"
          left={props => <List.Icon {...props} icon="alert-circle" />}
          onPress={() => router.push('/profile/restrictions')}
        />
        <Divider />

        <List.Subheader>Uygulama</List.Subheader>
        <List.Item
          title="Bildirim Ayarları"
          left={props => <List.Icon {...props} icon="bell" />}
          onPress={() => router.push('/profile/notifications')}
        />
        <List.Item
          title="Gizlilik Politikası"
          left={props => <List.Icon {...props} icon="shield-account" />}
          onPress={() => router.push('/profile/privacy')}
        />
        <List.Item
          title="Yardım ve Destek"
          left={props => <List.Icon {...props} icon="help-circle" />}
          onPress={() => router.push('/profile/help')}
        />
      </List.Section>

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={handleLogout}
          style={styles.logoutButton}
          textColor="#f4511e"
        >
          Çıkış Yap
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  name: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  logoutButton: {
    borderColor: '#f4511e',
  },
});