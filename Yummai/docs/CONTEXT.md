# Fine-Dining AI Yemek Uygulaması

## Uygulama Tanımı

Bu uygulama, kullanıcıların fine-dining restoranlarda yedikleri yemeklerin tariflerini öğrenmelerini ve evde yapabilmelerini sağlamak için geliştirilmiştir. AI destekli görsel analiz ile yemeklerin malzemelerini, tariflerini ve besin değerlerini sunarken, restoran ve ev maliyet karşılaştırması yapar. Aynı zamanda, kişiselleştirilmiş tarif önerileri ve chatbot desteği sunar.

## Tech Stack:
Frontend: React Native with TypeScript, Expo, and Expo Router
Backend/Database: Supabase
UI Framework: React Native Paper
AI Processing: DeepSeek

## Uygulama Akışı

### 1. Kayıt & Profil Oluşturma

- **Hesap Oluşturma:** Kullanıcılar e-posta, telefon numarası veya sosyal medya hesapları ile kayıt olabilir.
- **Profil Bilgileri:** Kullanıcıların damak tadı, favori malzemeler, sevdiği mutfak türleri gibi bilgiler alınır.
- **Beslenme Tercihleri:** Vegan, laktozsuz, alerji bilgileri gibi özel beslenme tercihleri belirlenir.
- **Kişiselleştirilmiş Öneriler:** Kayıt tamamlandığında kullanıcının tercihlerine uygun öneriler sunulur.

### 2. Ana Sayfa & Keşfet

- **Günlük Öneriler:** Kullanıcının tercihlerine göre günlük yemek önerileri sunulur.
- **Popüler Tarifler:** Uygulama içinde en çok beğenilen tarifler gösterilir.
- **Trend Yemekler:** Güncel trend yemekler ve tarifler listelenir.
- **Favori Tarifler:** Kullanıcılar beğendikleri tarifleri kaydedebilir ve daha sonra kolayca erişebilir.

### 3. AI Destekli Görsel Tanıma

- **Fotoğraf Yükleme:** Kullanıcı bir yemeğin fotoğrafını çeker veya galeriden yükler.
- **AI Analizi:** AI modeli yemeği analiz eder ve aşağıdaki bilgileri sunar:
  - **Yemek Adı ve İçeriği:** Yemeğin adı ve içerdiği malzemeler.
  - **Besin Değerleri:** Kalori, protein, karbonhidrat gibi besin değerleri.
  - **Adım Adım Tarif:** AI destekli adım adım tarif.
  - **Maliyet Karşılaştırması:** Restoranda ortalama maliyet ve evde yapma maliyeti.
  - **Malzeme Fiyatları:** Market ve pazar fiyat karşılaştırması.
  - **Alternatif Tarifler:** Benzer yemekler için alternatif tarif önerileri.

### 4. Market & Fiyat Karşılaştırma

- **Malzeme Listesi:** Tarifteki malzemelerin güncel market/pazar fiyatları listelenir.
- **Sepet Oluşturma:** Kullanıcı sepetine malzemeleri ekleyebilir ve fiyat karşılaştırması yapabilir.
- **Fiyat Takibi:** Malzemelerin fiyat değişiklikleri takip edilir ve kullanıcıya bildirilir.

### 5. Chatbot (AI Destekli Yemek Asistanı)

- **Malzeme Girişi:** Kullanıcı evdeki malzemeleri girerek "Ne yapabilirim?" sorusuna yanıt alır.
- **Kişiselleştirilmiş Öneriler:** Tarif önerileri kullanıcının beslenme tercihlerine uygun olur.
- **Adım Adım Rehberlik:** Kullanıcı tarifleri adım adım sesli veya yazılı komutlarla takip edebilir.
- **Pişirme İpuçları:** Chatbot, kullanıcıya pişirme sürecinde ipuçları ve öneriler sunar.
- **Diyet Uygunluğu Kontrolü:** Kullanıcı yemeğin fotoğrafını yüklediğinde veya ismini yazdığında, chatbot yemeğin kullanıcının diyetine uygun olup olmadığını söyler. Örneğin, vegan bir kullanıcı için yemeğin içeriğinde hayvansal ürün olup olmadığını kontrol eder ve bilgilendirir.

### 6. Tarif Defteri & Favoriler

- **Favori Tarifler:** Kullanıcılar beğendikleri tarifleri kaydedebilir.
- **Özel Tarifler:** Kullanıcılar kendi özel tariflerini oluşturabilir ve toplulukla paylaşabilir.
- **Sosyal Paylaşım:** Tarifler sosyal medya platformlarında paylaşılabilir.

### 7. Bildirimler & Hatırlatıcılar

- **Günlük Öneriler:** Kullanıcıya günlük yemek önerileri ve popüler tarifler gönderilir.
- **Yeni Tarifler:** Kullanıcının sevdiği malzemelerle ilgili yeni tarifler bildirilir.
- **Fiyat Değişiklikleri:** Malzemeler için indirimler ve fiyat değişiklikleri bildirilir.
- **Beslenme İpuçları:** Sağlıklı beslenme ipuçları ve beslenme planları sunulur.

## Teknik Özellikler

### AI Destekli Görsel Tanıma

- **Makine Öğrenmesi & Bilgisayarlı Görü:** Yemek türünü ve içeriğini tespit etme.
- **Besin Değeri Hesaplama:** Kullanılan malzemelere göre kalori ve makro besin analizleri.

### Fiyat Karşılaştırma API

- **Market Veritabanları:** Marketlerin online veritabanlarından anlık fiyat çekme.
- **Fiyat Karşılaştırması:** Malzeme bazlı market/pazar fiyat karşılaştırması.

### AI Chatbot

- **Doğal Dil İşleme (NLP):** Kullanıcıdan aldığı girdilere uygun yemek önerileri sunar.
- **Kişiselleştirilmiş Tarifler:** Kullanıcının tercihlerine göre tarifler ve pişirme ipuçları verir.
- **Diyet Uygunluğu Kontrolü:** Yemeğin kullanıcının diyetine uygun olup olmadığını kontrol eder ve bilgilendirir.

## Entegrasyonlar

- **Google Vision / OpenAI API:** Görsel tanıma ve AI tarif önerileri için.
- **Online Market API’leri:** Güncel fiyat karşılaştırmaları için.
- **Besin Değeri API’leri:** Kalori ve makro hesaplamaları için.
- **Sosyal Medya Paylaşım API’leri:** Tariflerin sosyal medyada paylaşılması için.

## Geliştirme Süreci

### 1. Planlama

- **İhtiyaç Analizi:** Kullanıcı ihtiyaçları ve beklentileri belirlenir.
- **Proje Yönetimi:** Agile metodolojisi kullanılarak proje yönetimi yapılır.

### 2. Tasarım

- **Kullanıcı Arayüzü (UI):** Kullanıcı dostu ve modern bir arayüz tasarlanır.
- **Kullanıcı Deneyimi (UX):** Kullanıcıların uygulamayı kolayca kullanabilmesi için UX tasarımı yapılır.

### 3. Geliştirme

- **Frontend Geliştirme:** React Native veya Flutter kullanılarak mobil uygulama geliştirilir.
- **Backend Geliştirme:** Node.js veya Django kullanılarak backend geliştirilir.
- **Veritabanı:** MongoDB veya PostgreSQL kullanılarak veritabanı yönetimi yapılır.

### 4. Test

- **Birim Testleri:** Her bir modül için birim testleri yapılır.
- **Entegrasyon Testleri:** Modüller arası entegrasyon testleri yapılır.
- **Kullanıcı Testleri:** Beta kullanıcıları ile uygulama test edilir ve geri bildirimler alınır.

### 5. Lansman

- **App Store & Google Play:** Uygulama App Store ve Google Play'de yayınlanır.
- **Pazarlama:** Sosyal medya, influencer pazarlama ve reklam kampanyaları ile uygulama tanıtılır.

## Sonuç

Fine-Dining AI Yemek Uygulaması, kullanıcıların restoranlarda yedikleri yemekleri evde yapabilmelerini sağlayan kapsamlı bir çözüm sunar. AI destekli görsel tanıma, kişiselleştirilmiş öneriler, fiyat karşılaştırması ve diyet uygunluğu kontrolü gibi özelliklerle kullanıcı deneyimini en üst düzeye çıkarır. Bu uygulama, yemek tutkunları için vazgeçilmez bir araç olmayı hedeflemektedir.

## Veritabanı Şeması

Supabase üzerinde oluşturulacak veritabanı tabloları ve ilişkileri aşağıdaki gibidir:

### 1. users
- id: uuid (primary key)
- email: string (unique)
- phone: string (nullable)
- created_at: timestamp
- updated_at: timestamp
- auth_provider: string (email, google, facebook, apple)
- avatar_url: string (nullable)
- is_premium: boolean

### 2. user_profiles
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- display_name: string
- bio: string (nullable)
- preferred_cuisine_types: string[] (array)
- favorite_ingredients: string[] (array)
- created_at: timestamp
- updated_at: timestamp

### 3. dietary_preferences
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- is_vegan: boolean
- is_vegetarian: boolean
- is_gluten_free: boolean
- is_lactose_free: boolean
- allergies: string[] (array)
- other_restrictions: string (nullable)
- created_at: timestamp
- updated_at: timestamp

### 4. recipes
- id: uuid (primary key)
- name: string
- description: string
- cuisine_type: string
- prep_time: integer (minutes)
- cook_time: integer (minutes)
- difficulty_level: string (easy, medium, hard)
- serving_size: integer
- image_url: string
- restaurant_price: decimal (nullable)
- home_price: decimal (nullable)
- is_verified: boolean
- created_at: timestamp
- updated_at: timestamp
- created_by: uuid (foreign key -> users.id, nullable)

### 5. recipe_ingredients
- id: uuid (primary key)
- recipe_id: uuid (foreign key -> recipes.id)
- ingredient_id: uuid (foreign key -> ingredients.id)
- quantity: decimal
- unit: string
- notes: string (nullable)

### 6. ingredients
- id: uuid (primary key)
- name: string
- category: string
- is_animal_product: boolean
- is_allergen: boolean
- allergen_type: string (nullable)
- image_url: string (nullable)

### 7. recipe_steps
- id: uuid (primary key)
- recipe_id: uuid (foreign key -> recipes.id)
- step_number: integer
- instruction: string
- image_url: string (nullable)
- video_url: string (nullable)
- tips: string (nullable)

### 8. nutritional_info
- id: uuid (primary key)
- recipe_id: uuid (foreign key -> recipes.id)
- calories: integer
- protein: decimal (grams)
- carbs: decimal (grams)
- fat: decimal (grams)
- fiber: decimal (grams)
- sugar: decimal (grams)
- sodium: decimal (mg)

### 9. ingredient_prices
- id: uuid (primary key)
- ingredient_id: uuid (foreign key -> ingredients.id)
- store_id: uuid (foreign key -> stores.id)
- price: decimal
- unit: string
- quantity: decimal
- last_updated: timestamp

### 10. stores
- id: uuid (primary key)
- name: string
- type: string (market, bazaar, online)
- location: geography (nullable)
- website: string (nullable)

### 11. user_favorites
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- recipe_id: uuid (foreign key -> recipes.id)
- created_at: timestamp

### 12. user_recipe_history
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- recipe_id: uuid (foreign key -> recipes.id)
- viewed_at: timestamp
- cooked_at: timestamp (nullable)
- rating: integer (nullable, 1-5)
- notes: string (nullable)

### 13. ai_image_logs
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- image_url: string
- detected_food: string
- confidence_score: decimal
- created_at: timestamp
- recipe_suggestion_id: uuid (foreign key -> recipes.id, nullable)

### 14. chat_sessions
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- started_at: timestamp
- ended_at: timestamp (nullable)
- topic: string (nullable)

### 15. chat_messages
- id: uuid (primary key)
- session_id: uuid (foreign key -> chat_sessions.id)
- message: string
- is_user: boolean
- created_at: timestamp
- related_recipe_id: uuid (foreign key -> recipes.id, nullable)

## Optimal Klasör Yapısı

React Native (Expo) ve TypeScript kullanarak oluşturulacak uygulamanın klasör yapısı:

```
/yummai
  ├── app/                      # Expo Router sayfaları
  │   ├── _layout.tsx           # Ana layout dosyası
  │   ├── index.tsx             # Ana sayfa
  │   ├── auth/                 # Kimlik doğrulama sayfaları
  │   │   ├── login.tsx
  │   │   ├── register.tsx
  │   │   └── forgot-password.tsx
  │   ├── profile/              # Profil sayfaları
  │   │   ├── index.tsx
  │   │   ├── edit.tsx
  │   │   └── dietary-preferences.tsx
  │   ├── discover/             # Keşfet sayfaları
  │   │   ├── index.tsx
  │   │   └── [recipeId].tsx    # Dinamik tarif detay sayfası
  │   ├── camera/               # Kamera ve görsel tanıma
  │   │   ├── index.tsx
  │   │   └── result.tsx
  │   ├── market/               # Market ve fiyat karşılaştırma
  │   │   ├── index.tsx
  │   │   └── compare.tsx
  │   ├── chat/                 # AI Chatbot
  │   │   └── index.tsx
  │   └── favorites/            # Favoriler
  │       └── index.tsx
  ├── assets/                   # Statik dosyalar
  │   ├── images/
  │   ├── fonts/
  │   └── icons/
  ├── components/               # Yeniden kullanılabilir bileşenler
  │   ├── common/               # Genel bileşenler
  │   │   ├── Button.tsx
  │   │   ├── Card.tsx
  │   │   ├── Input.tsx
  │   │   └── ...
  │   ├── recipe/               # Tarif ile ilgili bileşenler
  │   │   ├── RecipeCard.tsx
  │   │   ├── IngredientList.tsx
  │   │   └── ...
  │   ├── camera/               # Kamera ile ilgili bileşenler
  │   │   ├── CameraView.tsx
  │   │   └── ...
  │   ├── market/               # Market ile ilgili bileşenler
  │   │   ├── PriceComparison.tsx
  │   │   └── ...
  │   └── chat/                 # Chat ile ilgili bileşenler
  │       ├── ChatBubble.tsx
  │       └── ...
  ├── hooks/                    # Custom React hooks
  │   ├── useAuth.ts
  │   ├── useRecipes.ts
  │   ├── useCamera.ts
  │   └── ...
  ├── services/                 # API ve servis fonksiyonları
  │   ├── supabase.ts           # Supabase istemcisi
  │   ├── auth.ts               # Kimlik doğrulama servisleri
  │   ├── recipes.ts            # Tarif servisleri
  │   ├── ai.ts                 # AI ve görsel tanıma servisleri
  │   ├── market.ts             # Market ve fiyat servisleri
  │   └── chat.ts               # Chatbot servisleri
  ├── utils/                    # Yardımcı fonksiyonlar
  │   ├── formatters.ts         # Formatlama fonksiyonları
  │   ├── validators.ts         # Doğrulama fonksiyonları
  │   └── helpers.ts            # Diğer yardımcı fonksiyonlar
  ├── types/                    # TypeScript tipleri
  │   ├── supabase.ts           # Veritabanı tipleri
  │   ├── api.ts                # API yanıt tipleri
  │   └── app.ts                # Uygulama tipleri
  ├── constants/                # Sabit değerler
  │   ├── theme.ts              # Tema sabitleri
  │   ├── config.ts             # Yapılandırma sabitleri
  │   └── api.ts                # API sabitleri
  ├── contexts/                 # React Context'leri
  │   ├── AuthContext.tsx       # Kimlik doğrulama context'i
  │   ├── ThemeContext.tsx      # Tema context'i
  │   └── ...
  ├── navigation/               # Navigasyon yapılandırması
  │   └── linking.ts            # Deep linking yapılandırması
  ├── .gitignore
  ├── app.json                  # Expo yapılandırması
  ├── babel.config.js
  ├── eas.json                  # EAS Build yapılandırması
  ├── package.json
  ├── tsconfig.json
  └── README.md
```

Bu klasör yapısı, uygulamanın ölçeklenebilirliğini ve bakımını kolaylaştıracak şekilde tasarlanmıştır. Expo Router kullanılarak sayfa tabanlı bir yapı oluşturulmuş ve bileşenler, servisler ve yardımcı fonksiyonlar mantıksal olarak ayrılmıştır.



# Uygulama Akışı ve Sayfa Bağlantıları (Güncellenmiş)

## Tech Stack:
Frontend: React Native with TypeScript, Expo, and Expo Router
Backend/Database: Supabase
UI Framework: React Native Paper
AI Processing: DeepSeek

## 1. Splash Screen (Başlangıç Ekranı)
- **Tasarım:**
  - Uygulamanın logosu ve ismi ekranın ortasında yer alır.
  - Arka plan renkli veya gradient olabilir.
  - 2-3 saniye sonra otomatik olarak **Bilgilendirme Ekranı 1**'e yönlendirir.
- **Bağlantılar:**
  - **Splash Screen** → **Bilgilendirme Ekranı 1**

---

## 2. Bilgilendirme Ekranları (Onboarding Screens)
### **Bilgilendirme Ekranı 1: Learn to Cook**
- **Tasarım:**
  - "Learn to Cook" başlığı ve uygulamanın temel özelliklerini anlatan bir cümle.
  - İleri butonu ile bir sonraki ekrana geçiş yapılır.
- **Bağlantılar:**
  - **Bilgilendirme Ekranı 1** → **Bilgilendirme Ekranı 2**

### **Bilgilendirme Ekranı 2: Become a Master Chef**
- **Tasarım:**
  - "Become a Master Chef" başlığı ve uygulamanın gelişmiş özelliklerini anlatan bir cümle.
  - İleri butonu ile bir sonraki ekrana geçiş yapılır.
- **Bağlantılar:**
  - **Bilgilendirme Ekranı 2** → **Bilgilendirme Ekranı 3**

### **Bilgilendirme Ekranı 3: Uygulama Hakkında**
- **Tasarım:**
  - Uygulamanın amacını ve kullanıcıya sağladığı avantajları anlatan bir cümle.
  - "Get Started" butonu ile **Create Account Sayfası**'na geçiş yapılır.
- **Bağlantılar:**
  - **Bilgilendirme Ekranı 3** → **Create Account Sayfası**

---

## 3. Create Account Sayfası (Hesap Oluştur)
- **Tasarım:**
  - **E-posta ile Kayıt:**
    - E-posta ve şifre giriş alanları.
    - "Kayıt Ol" butonu.
  - **Google ile Giriş:**
    - Google hesabı ile giriş yapma butonu.
  - **Apple ile Giriş:**
    - Apple hesabı ile giriş yapma butonu.
  - **Already Login (Zaten Üyeyseniz):**
    - "Zaten üyeyseniz giriş yapın" bağlantısı.
- **Bağlantılar:**
  - **Create Account Sayfası** → **Account Set Up Sayfası 1** (başarılı kayıt sonrası)
  - **Create Account Sayfası** → **Login Sayfası** ("Zaten üyeyseniz giriş yapın" bağlantısı ile)

---

## 4. Login Sayfası (Giriş)
- **Tasarım:**
  - E-posta ve şifre giriş alanları bulunur.
  - "Giriş Yap" butonu ve "Kayıt Ol" butonu yer alır.
  - "Şifremi Unuttum" bağlantısı bulunur.
- **Bağlantılar:**
  - **Login Sayfası** → **Ana Sayfa** (başarılı giriş sonrası)
  - **Login Sayfası** → **Create Account Sayfası** ("Kayıt Ol" butonu ile)
  - **Login Sayfası** → **Reset Password Sayfası** ("Şifremi Unuttum" bağlantısı ile)

---

## 5. Reset Password Sayfası (Şifre Sıfırlama)
- **Tasarım:**
  - Telefon numarası veya e-posta giriş alanı.
  - "Doğrulama Kodu Gönder" butonu.
  - Doğrulama kodu girildikten sonra yeni şifre oluşturma alanı.
  - "Şifreyi Sıfırla" butonu.
- **Bağlantılar:**
  - **Reset Password Sayfası** → **Login Sayfası** (şifre sıfırlama başarılı olduğunda)

---

## 6. Account Set Up Sayfaları (Hesap Kurulumu)
### **Account Set Up Sayfası 1: Preferred Country Food**
- **Tasarım:**
  - Kullanıcının tercih ettiği ülke mutfağını seçebileceği bir liste veya çoklu seçim alanı.
  - "İleri" butonu ile bir sonraki sayfaya geçiş yapılır.
- **Bağlantılar:**
  - **Account Set Up Sayfası 1** → **Account Set Up Sayfası 2**

### **Account Set Up Sayfası 2: Preferred Cuisines**
- **Tasarım:**
  - Kullanıcının tercih ettiği mutfak türlerini seçebileceği bir liste veya çoklu seçim alanı.
  - "İleri" butonu ile bir sonraki sayfaya geçiş yapılır.
- **Bağlantılar:**
  - **Account Set Up Sayfası 2** → **Account Set Up Sayfası 3**

### **Account Set Up Sayfası 3: Any Dislikes**
- **Tasarım:**
  - Kullanıcının sevmediği malzemeleri veya yemek türlerini seçebileceği bir liste.
  - "İleri" butonu ile bir sonraki sayfaya geçiş yapılır.
- **Bağlantılar:**
  - **Account Set Up Sayfası 3** → **Account Set Up Sayfası 4**

### **Account Set Up Sayfası 4: Diet Preferences**
- **Tasarım:**
  - Kullanıcının diyet tercihlerini (vegan, vejetaryen, glütensiz vb.) seçebileceği bir liste.
  - "İleri" butonu ile bir sonraki sayfaya geçiş yapılır.
- **Bağlantılar:**
  - **Account Set Up Sayfası 4** → **Account Set Up Sayfası 5**

### **Account Set Up Sayfası 5: Personal Information**
- **Tasarım:**
  - İsim, soyisim, yaş, kilo, boy gibi kişisel bilgilerin girilebileceği form alanları.
  - Profil fotoğrafı yükleme seçeneği.
  - "Hesabı Tamamla" butonu.
- **Bağlantılar:**
  - **Account Set Up Sayfası 5** → **Ana Sayfa** (hesap kurulumu tamamlandığında)

---

## 7. Ana Sayfa (Home)
- **Tasarım:**
  - Üst kısımda arama çubuğu (search bar) yer alır.
  - Arama çubuğunun altında kategoriler veya filtreler (örneğin, "Popüler Tarifler", "Trend Yemekler").
  - Ana içerik alanında kartlar (cards) şeklinde tarif önerileri gösterilir.
  - Her kartta tarif resmi, adı ve kısa açıklaması bulunur.
  - Alt kısımda bir navigasyon menüsü (bottom navigation bar) yer alır:
    - **Ana Sayfa** (aktif)
    - **Arama**
    - **AI Görsel Tanıma**
    - **Profil**
- **Bağlantılar:**
  - **Ana Sayfa** → **Tarif Detay Sayfası** (kartlara tıklandığında)
  - **Ana Sayfa** → **Arama Sayfası** (arama çubuğuna tıklandığında)
  - **Ana Sayfa** → **AI Görsel Tanıma Sayfası** (navigasyon menüsünden)
  - **Ana Sayfa** → **Profil Sayfası** (navigasyon menüsünden)

---

## 8. Arama Sayfası (Search)
- **Tasarım:**
  - Üst kısımda arama çubuğu ve filtreleme seçenekleri (örneğin, mutfak türü, malzeme, diyet tercihleri).
  - Arama sonuçları kartlar şeklinde listelenir.
  - Eğer sonuç yoksa, "Sonuç Bulunamadı" mesajı gösterilir.
- **Bağlantılar:**
  - **Arama Sayfası** → **Tarif Detay Sayfası** (sonuçlara tıklandığında)
  - **Arama Sayfası** → **Ana Sayfa** (geri butonu veya navigasyon menüsü ile)

---

## 9. AI Görsel Tanıma Sayfası (AI Destekli Görsel Tanıma)
- **Tasarım:**
  - Büyük bir "Fotoğraf Yükle" butonu ve galeriden seçme seçeneği bulunur.
  - Fotoğraf yüklendikten sonra, AI analiz sonuçları gösterilir:
    - Yemek adı, malzemeler, besin değerleri ve tarif önerisi.
  - Alt kısımda "Tarifi Görüntüle" butonu yer alır.
- **Bağlantılar:**
  - **AI Görsel Tanıma Sayfası** → **Tarif Detay Sayfası** ("Tarifi Görüntüle" butonu ile)
  - **AI Görsel Tanıma Sayfası** → **Ana Sayfa** (geri butonu ile)

---

## 10. Tarif Detay Sayfası (Detail Page)
- **Tasarım:**
  - Tarifin büyük bir resmi üst kısımda yer alır.
  - Resmin altında tarif adı, hazırlama süresi ve porsiyon bilgisi bulunur.
  - Malzemeler ve adım adım yapım aşamaları listelenir.
  - Alt kısımda "Yapmaya Başla" butonu ve "Favorilere Ekle" butonu yer alır.
- **Bağlantılar:**
  - **Tarif Detay Sayfası** → **Yapım Aşamaları Sayfası** ("Yapmaya Başla" butonu ile)
  - **Tarif Detay Sayfası** → **Favoriler Sayfası** ("Favorilere Ekle" butonu ile)
  - **Tarif Detay Sayfası** → **Ana Sayfa** (geri butonu ile)

---

## 11. Yapım Aşamaları Sayfası (Start Making)
- **Tasarım:**
  - Her bir adım ayrı ayrı gösterilir.
  - Adımlar arasında geçiş yapmak için "İleri" ve "Geri" butonları bulunur.
  - Son adımda "Tarif Tamamlandı" mesajı ve "Ana Sayfa'ya Dön" butonu yer alır.
- **Bağlantılar:**
  - **Yapım Aşamaları Sayfası** → **Tarif Detay Sayfası** (geri butonu ile)
  - **Yapım Aşamaları Sayfası** → **Ana Sayfa** (tarif tamamlandığında)

---

## 12. Favoriler Sayfası (Favorites)
- **Tasarım:**
  - Kullanıcının favori tarifleri kartlar şeklinde listelenir.
  - Her kartta tarif resmi, adı ve kısa açıklaması bulunur.
  - Kartların yanında "Kaldır" butonu yer alır.
- **Bağlantılar:**
  - **Favoriler Sayfası** → **Tarif Detay Sayfası** (kartlara tıklandığında)
  - **Favoriler Sayfası** → **Ana Sayfa** (geri butonu ile)

---

## 13. Profil Sayfası (Profile)
- **Tasarım:**
  - Kullanıcının profil resmi, adı ve kısa bilgileri üst kısımda yer alır.
  - Alt kısımda "Tariflerim", "Favorilerim", "Ayarlar" gibi sekmeler bulunur.
  - "Tariflerim" sekmesinde kullanıcının paylaştığı tarifler listelenir.
  - "Ayarlar" sekmesinde kullanıcı bilgileri ve tercihleri düzenlenebilir.
- **Bağlantılar:**
  - **Profil Sayfası** → **Tarif Detay Sayfası** (tariflere tıklandığında)
  - **Profil Sayfası** → **Favoriler Sayfası** ("Favorilerim" sekmesi ile)
  - **Profil Sayfası** → **Ayarlar Sayfası** ("Ayarlar" sekmesi ile)
  - **Profil Sayfası** → **Ana Sayfa** (geri butonu ile)

---

## 14. Ayarlar Sayfası (Settings)
- **Tasarım:**
  - **Kişisel Bilgiler:**
    - İsim, soyisim, yaş, kilo, boy gibi bilgilerin güncellenebileceği form alanları.
  - **Tema Ayarları:**
    - Dark Mode (Karanlık Mod) ve Light Mode (Aydınlık Mod) seçenekleri.
    - Tema değişikliği anında uygulanır.
  - **Bildirim Ayarları:**
    - Bildirimleri açma/kapama seçenekleri.
  - **Hesap Ayarları:**
    - Şifre değiştirme, e-posta güncelleme gibi seçenekler.
  - **Çıkış Yap Butonu:**
    - Kullanıcıyı uygulamadan çıkarır ve **Login Sayfası**'na yönlendirir.
- **Bağlantılar:**
  - **Ayarlar Sayfası** → **Profil Sayfası** (geri butonu ile)
  - **Ayarlar Sayfası** → **Login Sayfası** ("Çıkış Yap" butonu ile)

---

## 15. Sonuç Bulunamadı Sayfası (No Results)
- **Tasarım:**
  - "Sonuç Bulunamadı" mesajı ve "Tekrar Ara" butonu yer alır.
- **Bağlantılar:**
  - **Sonuç Bulunamadı Sayfası** → **Arama Sayfası** ("Tekrar Ara" butonu ile)

---

## Akış Diyagramı (Özet)

1. **Splash Screen** → **Bilgilendirme Ekranı 1**
2. **Bilgilendirme Ekranı 1** → **Bilgilendirme Ekranı 2**
3. **Bilgilendirme Ekranı 2** → **Bilgilendirme Ekranı 3**
4. **Bilgilendirme Ekranı 3** → **Create Account Sayfası**
5. **Create Account Sayfası** → **Account Set Up Sayfası 1** (başarılı kayıt sonrası)
6. **Create Account Sayfası** → **Login Sayfası** ("Zaten üyeyseniz giriş yapın" bağlantısı ile)
7. **Login Sayfası** → **Ana Sayfa** (başarılı giriş sonrası)
8. **Login Sayfası** → **Create Account Sayfası** ("Kayıt Ol" butonu ile)
9. **Login Sayfası** → **Reset Password Sayfası** ("Şifremi Unuttum" bağlantısı ile)
10. **Reset Password Sayfası** → **Login Sayfası** (şifre sıfırlama başarılı olduğunda)
11. **Account Set Up Sayfası 1** → **Account Set Up Sayfası 2**
12. **Account Set Up Sayfası 2** → **Account Set Up Sayfası 3**
13. **Account Set Up Sayfası 3** → **Account Set Up Sayfası 4**
14. **Account Set Up Sayfası 4** → **Account Set Up Sayfası 5**
15. **Account Set Up Sayfası 5** → **Ana Sayfa** (hesap kurulumu tamamlandığında)
16. **Ana Sayfa** → **Tarif Detay Sayfası**, **Arama Sayfası**, **AI Görsel Tanıma Sayfası**, **Profil Sayfası**
17. **Arama Sayfası** → **Tarif Detay Sayfası**, **Sonuç Bulunamadı Sayfası**
18. **AI Görsel Tanıma Sayfası** → **Tarif Detay Sayfası**
19. **Tarif Detay Sayfası** → **Yapım Aşamaları Sayfası**, **Favoriler Sayfası**
20. **Favoriler Sayfası** → **Tarif Detay Sayfası**
21. **Profil Sayfası** → **Tarif Detay Sayfası**, **Favoriler Sayfası**, **Ayarlar Sayfası**
22. **Ayarlar Sayfası** → **Profil Sayfası**, **Login Sayfası** ("Çıkış Yap" butonu ile)
23. **Sonuç Bulunamadı Sayfası** → **Arama Sayfası**

---

Bu şekilde, **Reset Password Sayfası** ve **Account Set Up Sayfaları** da dahil olacak şekilde uygulamanın tüm sayfaları ve bağlantıları güncellenmiştir. Her bir sayfanın tasarımı ve işlevselliği, kullanıcı deneyimini en üst düzeye çıkaracak şekilde planlanmıştır.