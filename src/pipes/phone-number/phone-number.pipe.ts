import parsePhoneNumber from 'libphonenumber-js';
import { PhoneNumberParser } from 'src/interfaces/phone-number.interface';

class PhoneNumberPipe {

  /** Phone Number Instructor **/
  constructor() {}

  /**
   * Make PhoneNumber Object With PhoneNumberParser
   * @param {String} value
   * @return {Object}
   */
  public phoneNumberParser(value: string): PhoneNumberParser {
    const phoneNumber = parsePhoneNumber(value);
    return {
      country: phoneNumber.country,
      number: phoneNumber.number,
      callingCode: phoneNumber.countryCallingCode,
      international: phoneNumber.formatInternational(),
      url: phoneNumber.getURI(),
      isValid: phoneNumber.isValid(),
      national: phoneNumber.formatNational(),
    };
  }

}

export { PhoneNumberPipe };
