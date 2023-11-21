package main

import (
	"fmt"
	"syscall/js"
	qrcode "github.com/skip2/go-qrcode"
	b64 "encoding/base64"
)

var c chan bool

func init() {
	fmt.Println("Hello, WebAssembly!")
	c = make(chan bool)
}

func main() {
    // It Will Call First
	js.Global().Set("sayHelloJS", js.FuncOf(SayHello))
	js.Global().Set("qrCodeGeneratorJS", js.FuncOf(QrCodeGenerator))
	<-c
}

// Generate QrCode With Golang Package And Show in React Component
func QrCodeGenerator(jsV js.Value, inputs []js.Value) interface{} {
	var png []byte
    var err error
    var sEnc string

    message := inputs[0].String()
	image := js.Global().Get("document").Call("getElementById", "qrcode")
	png, err = qrcode.Encode( message, qrcode.Highest, 256)
    sEnc = "data:image/png;base64," + b64.StdEncoding.EncodeToString( []byte(png) )

    if err != nil {
        fmt.Println("could not generate QRCode")
        return nil;
    }

    image.Set("src", sEnc)

	return nil
}

// SayHello simply set the textContent of our element based on the value it receives (i.e the value from the input box)
// the element MUST exist else it'll throw an exception
func SayHello(jsV js.Value, inputs []js.Value) interface{} {
	message := inputs[0].String()
	h := js.Global().Get("document").Call("getElementById", "message")
	h.Set("textContent", message)
	return nil
}