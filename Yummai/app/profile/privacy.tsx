import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Gizlilik Politikası</Text>
      </View>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Yummai Gizlilik Politikası
        </Text>
        
        <Text variant="bodyMedium" style={styles.paragraph}>
          Son Güncelleme: 1 Haziran 2023
        </Text>

        <Text variant="bodyMedium" style={styles.paragraph}>
          Yummai uygulamasını kullandığınız için teşekkür ederiz. Gizliliğiniz bizim için önemlidir. 
          Bu gizlilik politikası, kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.
        </Text>

        <Text variant="titleSmall" style={styles.subTitle}>
          Topladığımız Bilgiler
        </Text>

        <Text variant="bodyMedium" style={styles.paragraph}>
          Yummai, size kişiselleştirilmiş yemek tarifleri sunmak için aşağıdaki bilgileri toplayabilir:
        </Text>

        <View style={styles.bulletList}>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Hesap bilgileri (ad, e-posta, profil fotoğrafı)</Text>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Diyet tercihleri ve kısıtlamalar</Text>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Yemek alışkanlıkları ve tercihler</Text>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Cihaz bilgileri ve kullanım verileri</Text>
        </View>

        <Text variant="titleSmall" style={styles.subTitle}>
          Bilgilerin Kullanımı
        </Text>

        <Text variant="bodyMedium" style={styles.paragraph}>
          Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
        </Text>

        <View style={styles.bulletList}>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Size kişiselleştirilmiş tarifler sunmak</Text>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Uygulama deneyiminizi iyileştirmek</Text>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Yeni özellikler geliştirmek</Text>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Teknik sorunları çözmek</Text>
        </View>

        <Text variant="titleSmall" style={styles.subTitle}>
          Veri Paylaşımı
        </Text>

        <Text variant="bodyMedium" style={styles.paragraph}>
          Kişisel verilerinizi üçüncü taraflarla paylaşmayız, ancak aşağıdaki durumlarda paylaşım yapabiliriz:
        </Text>

        <View style={styles.bulletList}>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Yasal zorunluluk durumunda</Text>
          <Text variant="bodyMedium" style={styles.bulletItem}>• Hizmet sağlayıcılarımızla (veri depolama, analiz)</Text>
          <Text variant="bodyMedium" style={styles.bulletItem}>• İzniniz olduğunda</Text>
        </View>

        <Text variant="titleSmall" style={styles.subTitle}>
          Veri Güvenliği
        </Text>

        <Text variant="bodyMedium" style={styles.paragraph}>
          Verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz. Ancak, internet üzerinden hiçbir veri iletimi %100 güvenli değildir.
        </Text>

        <Text variant="titleSmall" style={styles.subTitle}>
          Haklarınız
        </Text>

        <Text variant="bodyMedium" style={styles.paragraph}>
          Kişisel verilerinize erişme, düzeltme, silme veya taşıma hakkına sahipsiniz. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
        </Text>

        <Text variant="titleSmall" style={styles.subTitle}>
          İletişim
        </Text>

        <Text variant="bodyMedium" style={styles.paragraph}>
          Gizlilik politikamız hakkında sorularınız varsa, lütfen support@yummai.com adresinden bizimle iletişime geçin.
        </Text>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => router.back()}
          style={styles.button}
        >
          Anladım
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
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subTitle: {
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 20,
  },
  bulletList: {
    marginLeft: 8,
    marginBottom: 16,
  },
  bulletItem: {
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#f4511e',
  },
});