// Central place for personal details. Edit here, and the whole site updates.

const whatsappNumber = '918129805627'; // <-- REPLACE with your number: country code + number, digits only

export const siteConfig = {
  name: 'AKSHAY',
  fullName: 'Akshay Babu',
  monogram: 'AK',

  // The PDF must exist at public/cv/Akshay-Babu-CV.pdf
  cvUrl: '/cv/AkshayCvReact (1).pdf',
  cvFileName: 'Akshay-Babu-CV.pdf',

  whatsapp: {
    number: whatsappNumber,
    message:
      'Hi Akshay! I visited your portfolio and would like to connect with you regarding a potential opportunity.',
  },
};

// Builds the WhatsApp link: https://wa.me/<number>?text=<encoded message>
// If the number is not filled in yet, it falls back to a link that lets the
// visitor choose a contact, so the button never leads to a broken page.
export function getWhatsAppUrl() {
  const { number, message } = siteConfig.whatsapp;
  const text = encodeURIComponent(message);
  const isValidNumber = /^\d{10,15}$/.test(number);

  return isValidNumber
    ? `https://wa.me/${number}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
