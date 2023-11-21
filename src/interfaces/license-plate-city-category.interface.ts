export enum LicensePlateCityCategory {
  TEHRAN,
  ALBORZ,
  KHORASAN_RAZAVI,
  KHORASAN_SHOMALI,
  KHORASAN_JONOOBI,
  ESFAHAN,
  KHOOZESTAN,
  AZARBAYJAN_SHARGHI,
  QOM,
  AZARBAYJAN_GHARBI,
  HAMEDAN,
  KERMANSHAH,
  LORESTAN,
  YAZD,
  GILAN,
  MARKAZI,
  BOOSHEHR,
  KOHGILOOYE,
  KORDESTAN,
  GOLESTAN,
  MAZANDARAN,
  FARS,
  KERMAN,
  CHAHARMAHAL_VA_BAKHTIYARY,
  QAZVIN,
  HORMOZGAN,
  SISTAN_VA_BALOOCHESTAN,
  SEMNAN,
  ZANJAN,
  ARDABIL,
  ILAM,
}

export type LicensePlateCityCategoryInterface = {
  [key in keyof typeof LicensePlateCityCategory]: {
    title: string;
    letter: Array<string>;
  };
};
