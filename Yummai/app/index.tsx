import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { Link } from 'expo-router';

export default function HomePage() {
  // Mock data for daily recommendations
  const dailyRecommendations = [
    {
      id: '1',
      name: 'Beef Wellington',
      image: 'https://via.placeholder.com/150',
      description: 'A classic British dish consisting of a beef fillet wrapped in puff pastry.',
    },
    {
      id: '2',
      name: 'Risotto ai Funghi',
      image: 'https://via.placeholder.com/150',
      description: 'Creamy Italian rice dish with mushrooms and parmesan cheese.',
    },
    {
      id: '3',
      name: 'Coq au Vin',
      image: 'https://via.placeholder.com/150',
      description: 'French chicken stew braised with wine, mushrooms, and garlic.',
    },
  ];

  // Mock data for popular recipes
  const popularRecipes = [
    {
      id: '4',
      name: 'Sushi Rolls',
      image: 'https://via.placeholder.com/150',
      description: 'Japanese dish with vinegared rice and various fillings.',
    },
    {
      id: '5',
      name: 'Paella',
      image: 'https://via.placeholder.com/150',
      description: 'Spanish rice dish with seafood, meat, and vegetables.',
    },
    {
      id: '6',
      name: 'Tiramisu',
      image: 'https://via.placeholder.com/150',
      description: 'Italian coffee-flavored dessert with layers of mascarpone cheese.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Yummai</Text>
        <Text variant="titleMedium">Fine-Dining AI Yemek Uygulaması</Text>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Günlük Öneriler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dailyRecommendations.map((recipe) => (
            <Card key={recipe.id} style={styles.card}>
              <Card.Cover source={{ uri: recipe.image }} />
              <Card.Title title={recipe.name} />
              <Card.Content>
                <Text variant="bodyMedium">{recipe.description}</Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="text" textColor="#f4511e">Detaylar</Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Popüler Tarifler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularRecipes.map((recipe) => (
            <Card key={recipe.id} style={styles.card}>
              <Card.Cover source={{ uri: recipe.image }} />
              <Card.Title title={recipe.name} />
              <Card.Content>
                <Text variant="bodyMedium">{recipe.description}</Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="text" textColor="#f4511e">Detaylar</Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View style={styles.featuresSection}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Özellikler</Text>
        
        <Card style={styles.featureCard}>
          <Card.Content>
            <Text variant="titleMedium">AI Destekli Görsel Tanıma</Text>
            <Text variant="bodyMedium">Yemek fotoğrafını yükleyin, AI tarifini ve besin değerlerini öğrenin.</Text>
          </Card.Content>
          <Card.Actions>
            <Link href="/camera" asChild>
              <Button mode="contained">Kamera</Button>
            </Link>
          </Card.Actions>
        </Card>

        <Card style={styles.featureCard}>
          <Card.Content>
            <Text variant="titleMedium">Chatbot Asistanı</Text>
            <Text variant="bodyMedium">Evdeki malzemelerle neler yapabileceğinizi öğrenin.</Text>
          </Card.Content>
          <Card.Actions>
            <Link href="/chat" asChild>
              <Button mode="contained">Sohbet</Button>
            </Link>
          </Card.Actions>
        </Card>

        <Card style={styles.featureCard}>
          <Card.Content>
            <Text variant="titleMedium">Market & Fiyat Karşılaştırma</Text>
            <Text variant="bodyMedium">Tarifteki malzemelerin fiyatlarını karşılaştırın.</Text>
          </Card.Content>
          <Card.Actions>
            <Link href="/market" asChild>
              <Button mode="contained">Market</Button>
            </Link>
          </Card.Actions>
        </Card>
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
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  card: {
    width: 250,
    marginHorizontal: 8,
    marginLeft: 16,
  },
  featuresSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  featureCard: {
    marginVertical: 8,
  },
});