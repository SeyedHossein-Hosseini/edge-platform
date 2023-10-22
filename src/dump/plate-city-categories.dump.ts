import { LicensePlateCityCategoryInterface } from 'src/interfaces/license-plate-city-category.interface';

const licensePlateCityCategories: LicensePlateCityCategoryInterface = {
  TEHRAN: {
    title: 'تهران',
    letter: [ '10', '11', '20', '21', '22', '30', '33', '38', '40', '44', '55', '66', '77', '78', '88', '99' ],
  },
  ALBORZ: {
    title: ' البرز',
    letter: [ '21', '30', '38', '68', '78' ],
  },
  KHORASAN_RAZAVI: {
    title: 'خراسان رضوی',
    letter: [ '12', '32', '36', '42', '74' ],
  },
  KHORASAN_SHOMALI: {
    title: 'خراسان شمالی',
    letter: [ '26', '32' ],
  },
  KHORASAN_JONOOBI: {
    title: 'خراسان جنوبی',
    letter: [ '52', '32' ],
  },
  ESFAHAN: {
    title: 'اصفحان',
    letter: [ '13', '23', '43', '53', '67' ],
  },
  KHOOZESTAN: {
    title: 'خوزستان',
    letter: [ '14', '24', '34' ],
  },
  AZARBAYJAN_SHARGHI: {
    title: 'آذربایجان شرقی',
    letter: [ '15', '25', '35' ],
  },
  QOM: {
    title: 'قم',
    letter: ['16'],
  },
  AZARBAYJAN_GHARBI: {
    title: 'آذربایجان غربی',
    letter: [ '17', '27', '37' ],
  },
  HAMEDAN: {
    title: 'همدان',
    letter: [ '18', '28' ],
  },
  KERMANSHAH: {
    title: 'کرمانشاه',
    letter: [ '19', '29' ],
  },
  LORESTAN: {
    title: 'لرستان',
    letter: [ '31', '41' ],
  },
  YAZD: {
    title: 'یزد',
    letter: [ '45', '64' ],
  },
  GILAN: {
    title: 'گیلان',
    letter: [ '46', '56', '76' ],
  },
  MARKAZI: {
    title: 'مرکزی',
    letter: [ '47', '57' ],
  },
  BOOSHEHR: {
    title: 'بوشهر',
    letter: [ '48', '58' ],
  },
  KOHGILOOYE: {
    title: 'کهگیلویه و بویراحمد',
    letter: ['49'],
  },
  KORDESTAN: {
    title: 'کردستان',
    letter: [ '51', '61' ],
  },
  GOLESTAN: {
    title: 'گلستان',
    letter: [ '59', '69' ],
  },
  MAZANDARAN: {
    title: 'مازندران',
    letter: [ '62', '72', '82', '92' ],
  },
  FARS: {
    title: 'فارس',
    letter: [ '63', '73', '83', '93' ],
  },
  KERMAN: {
    title: 'کرمان',
    letter: [ '65', '75' ],
  },
  CHAHARMAHAL_VA_BAKHTIYARY: {
    title: 'چهارمحال و بختیاری',
    letter: [ '71', '81' ],
  },
  QAZVIN: {
    title: 'قزوین',
    letter: [ '79', '89' ],
  },
  HORMOZGAN: {
    title: 'هرمزگان',
    letter: [ '84', '94' ],
  },
  SISTAN_VA_BALOOCHESTAN: {
    title: 'سیستان و بلوچستان',
    letter: [ '85', '95' ],
  },
  SEMNAN: {
    title: 'سمنان',
    letter: [ '86', '96' ],
  },
  ZANJAN: {
    title: 'زنجان',
    letter: [ '87', '97' ],
  },
  ARDABIL: {
    title: 'اردبیل',
    letter: ['91'],
  },
  ILAM: {
    title: 'ایلام',
    letter: ['98'],
  },
};

export default licensePlateCityCategories;
