import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Surface, Button, Divider, List, Avatar } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  
  // Mock user data - in a real app, this would come from Supabase
  const user = {
    displayName: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    avatarUrl: 'https://via.placeholder.com/150',
    dietaryPreferences: {
      isVegan: false,
      isVegetarian: true,
      isGlutenFree: false,
      isLactoseFree: true,
      allergies: ['Fındık', 'Kabuklu Deniz Ürünleri'],
      cuisinePreferences: ['Türk', 'İtalyan', 'Akdeniz'],
      favoriteIngredients: ['Domates', 'Zeytinyağı', 'Fesleğen']
    },
    favoriteRecipes: 3,
    savedRecipes: 12,
    isPremium: false
  };

  const handleLogout = () => {
    // TODO: Implement actual logout with Supabase
    console.log('Logging out...');
    router.replace('/auth/login');
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.profileHeader} elevation={2}>
        <Avatar.Image 
          size={100} 
          source={{ uri: user.avatarUrl }} 
          style={styles.avatar}
        />
        <Text variant="headlineSmall" style={styles.displayName}>{user.displayName}</Text>
        <Text variant="bodyMedium" style={styles.email}>{user.email}</Text>
        
        <View style={styles.actionsContainer}>
          <Link href="/profile/edit" asChild>
            <Button mode="contained" style={styles.editButton}>
              Profili Düzenle
            </Button>
          </Link>
          
          <Link href="/profile/dietary-preferences" asChild>
            <Button mode="outlined" style={styles.preferencesButton}>
              Beslenme Tercihleri
            </Button>
          </Link>
        </View>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Beslenme Bilgileri</Text>
        <Divider style={styles.divider} />
        
        <View style={styles.dietaryInfo}>
          <View style={styles.dietaryItem}>
            <Text variant="bodyMedium">Vejetaryen:</Text>
            <Text variant="bodyMedium" style={user.dietaryPreferences.isVegetarian ? styles.positive : styles.negative}>
              {user.dietaryPreferences.isVegetarian ? 'Evet' : 'Hayır'}
            </Text>
          </View>
          
          <View style={styles.dietaryItem}>
            <Text variant="bodyMedium">Vegan:</Text>
            <Text variant="bodyMedium" style={user.dietaryPreferences.isVegan ? styles.positive : styles.negative}>
              {user.dietaryPreferences.isVegan ? 'Evet' : 'Hayır'}
            </Text>
          </View>
          
          <View style={styles.dietaryItem}>
            <Text variant="bodyMedium">Glutensiz:</Text>
            <Text variant="bodyMedium" style={user.dietaryPreferences.isGlutenFree ? styles.positive : styles.negative}>
              {user.dietaryPreferences.isGlutenFree ? 'Evet' : 'Hayır'}
            </Text>
          </View>
          
          <View style={styles.dietaryItem}>
            <Text variant="bodyMedium">Laktozsuz:</Text>
            <Text variant="bodyMedium" style={user.dietaryPreferences.isLactoseFree ? styles.positive : styles.negative}>
              {user.dietaryPreferences.isLactoseFree ? 'Evet' : 'Hayır'}
            </Text>
          </View>
        </View>
        
        <Text variant="bodyMedium" style={styles.subSectionTitle}>Alerjiler:</Text>
        <View style={styles.tagsContainer}>
          {user.dietaryPreferences.allergies.map((allergy, index) => (
            <View key={index} style={styles.tag}>
              <Text variant="bodySmall">{allergy}</Text>
            </View>
          ))}
        </View>
        
        <Text variant="bodyMedium" style={styles.subSectionTitle}>Tercih Edilen Mutfaklar:</Text>
        <View style={styles.tagsContainer}>
          {user.dietaryPreferences.cuisinePreferences.map((cuisine, index) => (
            <View key={index} style={styles.tag}>
              <Text variant="bodySmall">{cuisine}</Text>
            </View>
          ))}
        </View>
        
        <Text variant="bodyMedium" style={styles.subSectionTitle}>Favori Malzemeler:</Text>
        <View style={styles.tagsContainer}>
          {user.dietaryPreferences.favoriteIngredients.map((ingredient, index) => (
            <View key={index} style={styles.tag}>
              <Text variant="bodySmall">{ingredient}</Text>
            </View>
          ))}
        </View>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Tariflerim</Text>
        <Divider style={styles.divider} />
        
        <List.Item
          title="Favori Tarifler"
          description={`${user.favoriteRecipes} tarif`}
          left={props => <List.Icon {...props} icon="heart" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => router.push('/favorites')}
        />
        
        <List.Item
          title="Kaydedilen Tarifler"
          description={`${user.savedRecipes} tarif`}
          left={props => <List.Icon {...props} icon="bookmark" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => router.push('/favorites')}
        />
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Hesap</Text>
        <Divider style={styles.divider} />
        
        <List.Item
          title="Premium Üyelik"
          description={user.isPremium ? 'Aktif' : 'Ücretsiz Sürüm'}
          left={props => <List.Icon {...props} icon="crown" />}
          right={props => (
            user.isPremium ? 
              <List.Icon {...props} icon="check" /> : 
              <Button mode="contained-tonal" onPress={() => console.log('Upgrade to premium')}>Yükselt</Button>
          )}
        />
        
        <List.Item
          title="Ayarlar"
          left={props => <List.Icon {...props} icon="cog" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Navigate to settings')}
        />
        
        <List.Item
          title="Yardım & Destek"
          left={props => <List.Icon {...props} icon="help-circle" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Navigate to help')}
        />
        
        <Button 
          mode="outlined" 
          icon="logout" 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          Çıkış Yap
        </Button>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    marginBottom: 16,
  },
  displayName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#666',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  editButton: {
    marginRight: 8,
    backgroundColor: '#f4511e',
  },
  preferencesButton: {
    marginLeft: 8,
    borderColor: '#f4511e',
    color: '#f4511e',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 12,
  },
  dietaryInfo: {
    marginBottom: 16,
  },
  dietaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  positive: {
    color: 'green',
    fontWeight: 'bold',
  },
  negative: {
    color: '#666',
  },
  subSectionTitle: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  logoutButton: {
    marginTop: 16,
    borderColor: 'red',
    color: 'red',
  },
});