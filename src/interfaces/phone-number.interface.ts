import { CountryCallingCode, E164Number } from 'libphonenumber-js';

export interface PhoneNumberParser {
  country: string;
  number: E164Number;
  callingCode: CountryCallingCode;
  international: string;
  url: string;
  isValid: boolean;
  national: string;
}
