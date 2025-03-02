import { useState } from 'react';
import { StyleSheet, View, ScrollView, Linking } from 'react-native';
import { Text, Surface, Button, List, Divider, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';

// FAQ data
const FAQ_ITEMS = [
  {
    question: 'Yummai uygulaması nedir?',
    answer: 'Yummai, yapay zeka destekli bir yemek tarifi uygulamasıdır. Fotoğrafını çektiğiniz yemekleri tanıyabilir ve benzer tarifleri önerebilir.'
  },
  {
    question: 'Yemek fotoğrafı nasıl çekerim?',
    answer: 'Ana ekranda "AI Kamera" sekmesine tıklayın, ardından "Fotoğraf Çek" butonuna basarak yemeğin fotoğrafını çekebilirsiniz.'
  },
  {
    question: 'Diyet tercihlerimi nasıl ayarlarım?',
    answer: 'Profil sayfasından "Diyet Tercihleri" seçeneğine tıklayarak vejetaryen, vegan gibi diyet tercihlerinizi belirleyebilirsiniz.'
  },
  {
    question: 'Alerjilerimi nasıl belirtirim?',
    answer: 'Profil sayfasından "Alerjiler ve Kısıtlamalar" seçeneğine tıklayarak alerjilerinizi ve sevmediğiniz malzemeleri belirtebilirsiniz.'
  },
  {
    question: 'Tarif önerileri nasıl çalışır?',
    answer: 'Yapay zeka algoritması, diyet tercihlerinizi, alerjilerinizi ve geçmiş beğenilerinizi dikkate alarak size özel tarifler önerir.'
  },
  {
    question: 'Hesabımı nasıl silerim?',
    answer: 'Profil sayfasından "Hesap Ayarları" seçeneğine tıklayarak hesabınızı silme talebinde bulunabilirsiniz.'
  },
];

export default function HelpSupportScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleFaqToggle = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = FAQ_ITEMS.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@yummai.com?subject=Yummai%20Destek%20Talebi');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Yardım ve Destek</Text>
      </View>

      <Surface style={styles.searchSection} elevation={1}>
        <Searchbar
          placeholder="Soru ara..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Sık Sorulan Sorular
        </Text>

        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => (
            <View key={index}>
              <List.Accordion
                title={item.question}
                expanded={expandedFaq === index}
                onPress={() => handleFaqToggle(index)}
                titleStyle={styles.faqQuestion}
                style={styles.faqItem}
              >
                <View style={styles.faqAnswer}>
                  <Text variant="bodyMedium">{item.answer}</Text>
                </View>
              </List.Accordion>
              {index < filteredFaqs.length - 1 && <Divider />}
            </View>
          ))
        ) : (
          <Text variant="bodyMedium" style={styles.noResults}>
            Aramanızla eşleşen sonuç bulunamadı.
          </Text>
        )}
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Destek Alın
        </Text>
        
        <Text variant="bodyMedium" style={styles.paragraph}>
          Sorunuzu burada bulamadınız mı? Destek ekibimizle iletişime geçin.
        </Text>
        
        <Button 
          mode="contained" 
          onPress={handleContactSupport}
          style={styles.supportButton}
          icon="email"
        >
          E-posta ile İletişime Geçin
        </Button>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Uygulama Bilgileri
        </Text>
        
        <View style={styles.infoItem}>
          <Text variant="bodyMedium" style={styles.infoLabel}>Versiyon</Text>
          <Text variant="bodyMedium">1.0.0</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.infoItem}>
          <Text variant="bodyMedium" style={styles.infoLabel}>Son Güncelleme</Text>
          <Text variant="bodyMedium">1 Haziran 2023</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.infoItem}>
          <Text variant="bodyMedium" style={styles.infoLabel}>Lisans</Text>
          <Text variant="bodyMedium">© 2023 Yummai</Text>
        </View>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          Geri Dön
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
  searchSection: {
    margin: 16,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  searchbar: {
    backgroundColor: '#f5f5f5',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: 'transparent',
  },
  faqQuestion: {
    fontWeight: '500',
  },
  faqAnswer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  noResults: {
    textAlign: 'center',
    padding: 16,
    color: '#666',
  },
  paragraph: {
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: '#f4511e',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoLabel: {
    fontWeight: '500',
  },
  divider: {
    backgroundColor: '#e0e0e0',
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  backButton: {
    borderColor: '#f4511e',
  },
});