import { TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardWidget } from 'src/components/share/card-widget';
import { QrCodeGeneratorProps } from './qr-code-generator.props';
import { useStyle } from './qr-code-generator.style';

declare global {
  interface Window {
    go: any;
    sayHelloJS: any;
    qrCodeGeneratorJS: any;
  }
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  title,
  setTitle,
  setFullHeight,
  setMenuItems,
}) => {
  const { t } = useTranslation();
  const classes = useStyle();
  const [ message, setMessage ] = useState('Amir');
  const [ qrCodeSrc, setQrCodeSrc ] = useState('');

  useEffect(() => {
    setTitle(!title ? 'Qr Code Generator' : title);
    setFullHeight(true);
    WebAssembly.instantiateStreaming(fetch('qr-code-generator.wasm'), window.go.importObject).then((result) => {
      window.go.run(result.instance);
    });
  }, []);

  useEffect(() => {
    console.warn('message ---------------------------- ' + message);
  }, [message]);

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.value !== '') {
      window.qrCodeGeneratorJS(e.target.value);
    } else {
      setQrCodeSrc('');
      setMessage('');
    }
  };

  return (
    <Box className={classes.box}>
      <div className={classes.wrapper}>
        <TextField
          id="userInput"
          variant="outlined"
          className={classes.input}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Type..."
        />
        <img id="qrcode" src={qrCodeSrc} alt={message} />
      </div>
    </Box>
  );
};

const Wrapper = CardWidget<QrCodeGeneratorProps>(QrCodeGenerator);
export { Wrapper as QrCodeGenerator };
