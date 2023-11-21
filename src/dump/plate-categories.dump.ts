import { LicensePlateCategoryInterface } from 'src/interfaces/license-plate-category.interface';

const licensePlateCategories: LicensePlateCategoryInterface = {
  HEADQUARTERS: {
    title: 'ستاد کل نیروهای مسلح',
    letter: ['F'],
  },
  MINISTERY_OF_DEFENSE: {
    title: 'وزارت دفاع و پشتیبانی نیروهای مسلح',
    letter: ['Z'],
  },
  POLITIC: {
    title: 'سیاسی',
    letter: ['d'],
  },
  EMBASSY: {
    title: 'سفارت',
    letter: ['s'],
  },
  SEPAH: {
    title: 'سپاه پاسداران انقلاب اسلامی',
    letter: ['R'],
  },
  MILITARY: {
    title: 'ارتش جمهوری اسلامی',
    letter: ['W'],
  },
  GOVERNMENT: {
    title: 'دولتی',
    letter: ['A'],
  },
  CIVILIAN: {
    title: 'شخصی',
    letter: [ 'B', 'D', 'H', 'J', 'L', 'M', 'N', 'Q', 'C', 'S', 'U', 'V', 'E' ],
  },
  TEMPORARY: {
    title: 'گذر موقت',
    letter: ['G'],
  },
  HANDICAPPED: {
    title: 'معلول',
    letter: ['O'],
  },
  PUBLIC: {
    title: 'نقلیه عمومی',
    letter: ['Y'],
  },
  TAXI: {
    title: 'تاکسی',
    letter: ['T'],
  },
  AGRICULTURE: {
    title: 'کشاورزی',
    letter: ['K'],
  },
  POLICE: {
    title: 'نیروی انتظامی',
    letter: ['P'],
  },
};

export default licensePlateCategories;
