/**
 * Site Configuration
 * WhatsApp numarası ve diğer global ayarlar
 */

export const config = {
  // WhatsApp İletişim Numarası (90 ile başlayan, boşluksuz format)
  whatsappNumber: '905339173355',
  
  // WhatsApp mesaj şablonları
  whatsappMessages: {
    product: (productName) => `Merhaba! ${productName} ürünü hakkında bilgi almak istiyorum.`,
    general: 'Merhaba! Web sitenizden ulaşıyorum, bilgi almak istiyorum.',
    contact: 'Merhaba! İletişime geçmek istiyorum.',
  },
  
  // Site bilgileri
  site: {
    name: 'ARORA',
    description: 'Premium taş ve mermer ürünleri',
    email: 'info@aroratas.com',
    phone: '+90 533 917 33 55',
    instagram: 'https://www.instagram.com/aroratas/',
    address: 'Osmangazi, Ahmet Şireci Blv No:1, 27000 Şehitkamil/Gaziantep',
    city: 'Gaziantep',
    maps: 'https://maps.google.com/?q=Osmangazi,Ahmet+Şireci+Blv+No:1,27000+Şehitkamil/Gaziantep',
  },
};

/**
 * WhatsApp URL oluşturma helper fonksiyonu
 * @param {string} message - Gönderilecek mesaj
 * @param {string} phoneNumber - Opsiyonel, özel telefon numarası
 * @returns {string} WhatsApp URL
 */
export const getWhatsAppUrl = (message, phoneNumber = config.whatsappNumber) => {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

