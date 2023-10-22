import { isPermalink } from 'src/helpers/strings/strings';

const SampleDate = 'Mon, 04 Jan 2021 13:55:26 GMT';

describe('URL Validation Test', () => {
  it('Test Basic String => Basic Random String"', () => {
    expect( isPermalink('Basic Random String')).toEqual(false);
  });

  it('Test HTTP Links => http://www.google.com/"', () => {
    expect( isPermalink('http://www.google.com/')).toEqual(true);
  });

  it('Test HTTPS Links => https://www.google.com/"', () => {
    expect( isPermalink('https://www.google.com/')).toEqual(true);
  });

  it('Test Link With Sub Domain => https://translate.google.com"', () => {
    expect( isPermalink('https://translate.google.com')).toEqual(true);
  });

  it('Test Single Query Param => https://translate.google.com?sl=auto"', () => {
    expect( isPermalink('https://translate.google.com?sl=auto')).toEqual(true);
  });

  it('Test Multiple Query Param => https://translate.google.com?sl=auto&tl=en&op=translate"', () => {
    expect( isPermalink('https://translate.google.com?sl=auto&tl=en&op=translate')).toEqual(true);
  });

  it('Test IP URL => http://127.0.0.1/"', () => {
    expect( isPermalink('http://127.0.0.1/')).toEqual(true);
  });

  it('Test IP URL With Port => http://127.0.0.1:8080/"', () => {
    expect( isPermalink('http://127.0.0.1:8080/')).toEqual(true);
  });

  it('Test FTP Protocol Link => ftp://127.0.0.1:8080/"', () => {
    expect( isPermalink('ftp://127.0.0.1:8080/')).toEqual(true);
  });

  it('Test File Path With Extension => http://127.0.0.1:8080/uploads/sample.png"', () => {
    expect( isPermalink('http://127.0.0.1:8080/uploads/sample.png')).toEqual(true);
  });

  it('Test Broken Links => https://www@.google.com/"', () => {
    expect( isPermalink('https://www@.google.com/')).toEqual(false);
  });
});
