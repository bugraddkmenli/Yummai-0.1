import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, Button, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function TermsAndConditionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <Text variant="headlineMedium" style={styles.title}>Kullanım Koşulları</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Surface style={styles.section} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Yummai Kullanım Koşulları
          </Text>
          
          <Text variant="bodyMedium" style={styles.paragraph}>
            Son Güncelleme: 1 Haziran 2023
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Yummai uygulamasını kullanarak aşağıdaki kullanım koşullarını kabul etmiş olursunuz. 
            Lütfen bu koşulları dikkatlice okuyun.
          </Text>

          <Text variant="titleSmall" style={styles.subTitle}>
            1. Hizmet Kullanımı
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Yummai uygulamasını kullanabilmek için 18 yaşından büyük olmanız gerekmektedir. 
            Uygulama içerisinde yasa dışı, tehdit edici, zararlı, taciz edici, karalayıcı, 
            küfürlü, müstehcen, kötüye kullanım içeren veya başka şekilde sakıncalı içerik 
            paylaşmamayı kabul edersiniz.
          </Text>

          <Text variant="titleSmall" style={styles.subTitle}>
            2. Hesap Güvenliği
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Hesabınızın güvenliğinden siz sorumlusunuz. Güçlü bir şifre kullanmanızı ve 
            hesap bilgilerinizi kimseyle paylaşmamanızı öneririz. Hesabınızda gerçekleşen 
            tüm etkinliklerden siz sorumlusunuz.
          </Text>

          <Text variant="titleSmall" style={styles.subTitle}>
            3. Fikri Mülkiyet Hakları
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Yummai uygulaması ve içeriği, fikri mülkiyet hakları ile korunmaktadır. 
            Uygulama içeriğini kopyalamak, değiştirmek, dağıtmak veya ticari amaçla 
            kullanmak yasaktır.
          </Text>

          <Text variant="titleSmall" style={styles.subTitle}>
            4. Kullanıcı İçeriği
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Uygulama içerisinde paylaştığınız içeriklerden (yorumlar, fotoğraflar, vb.) 
            siz sorumlusunuz. Bu içeriklerin telif hakkı size ait olmalıdır veya paylaşma 
            hakkına sahip olmalısınız.
          </Text>

          <Text variant="titleSmall" style={styles.subTitle}>
            5. Hizmet Değişiklikleri
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Yummai, herhangi bir zamanda ve herhangi bir nedenle uygulamayı değiştirme, 
            askıya alma veya sonlandırma hakkını saklı tutar. Önemli değişiklikler 
            hakkında kullanıcıları bilgilendirmek için makul çaba göstereceğiz.
          </Text>

          <Text variant="titleSmall" style={styles.subTitle}>
            6. Sorumluluk Reddi
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Yummai uygulaması "olduğu gibi" sunulmaktadır. Uygulama içeriğinin doğruluğu, 
            güvenilirliği veya kullanılabilirliği konusunda hiçbir garanti vermiyoruz. 
            Uygulama kullanımından doğabilecek herhangi bir zarardan sorumlu değiliz.
          </Text>

          <Text variant="titleSmall" style={styles.subTitle}>
            7. İletişim
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Kullanım koşulları hakkında sorularınız varsa, lütfen support@yummai.com 
            adresinden bizimle iletişime geçin.
          </Text>
        </Surface>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => router.back()}
          style={styles.button}
        >
          Anladım
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
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
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#f4511e',
  },
});