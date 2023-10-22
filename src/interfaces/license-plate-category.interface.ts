export enum LicensePlateCategory {
  HEADQUARTERS,
  MINISTERY_OF_DEFENSE,
  POLITIC,
  EMBASSY,
  SEPAH,
  MILITARY,
  GOVERNMENT,
  CIVILIAN,
  TEMPORARY,
  HANDICAPPED,
  PUBLIC,
  TAXI,
  AGRICULTURE,
  POLICE,
}

export type LicensePlateCategoryInterface = {
  [key in keyof typeof LicensePlateCategory]: {
    title: string;
    letter: Array<string>;
  };
};
