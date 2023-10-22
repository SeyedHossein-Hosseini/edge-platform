const stringGenerator = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const isPermalink = ( string: string ): boolean => {
  const pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?'+ // port
    '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
    '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test( string );
};

const isIranLicensePlate = ( licenseNumber: string ): boolean => {
  const pattern = new RegExp('^\\d{2}\\w{1}\\d{3}');
  return !!pattern.test( licenseNumber );
};

const exportIpAddress = ( string: string): string => {
  const pattern = new RegExp('\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}');
  return (string.match( pattern ) !== null) ? string.match( pattern )[0] : string;
};

export { stringGenerator, isPermalink, isIranLicensePlate, exportIpAddress };
