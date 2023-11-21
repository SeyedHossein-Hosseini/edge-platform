import { PhoneNumberPipe } from './phone-number.pipe';

const SampleDate = '+32484901582';
describe('Phone Number Parser', () => {
  it('CallingCode', () => {
    const phoneNumber = new PhoneNumberPipe();
    expect(phoneNumber.phoneNumberParser(SampleDate).callingCode).toEqual('32');
  });

  it('CallingCode Type', () => {
    const phoneNumber = new PhoneNumberPipe();
    expect(
        typeof phoneNumber.phoneNumberParser(SampleDate).callingCode
    ).toEqual('string');
  });

  it('Phone URL', () => {
    const phoneNumber = new PhoneNumberPipe();
    expect(
        phoneNumber.phoneNumberParser(SampleDate).url.indexOf('tel:') === 0
    ).toEqual(true);
  });

  it('International Format', () => {
    const phoneNumber = new PhoneNumberPipe();
    expect(phoneNumber.phoneNumberParser(SampleDate).international).toEqual(
        '+32 484 90 15 82'
    );
  });
});
