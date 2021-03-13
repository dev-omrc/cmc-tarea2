import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OTPComponent implements OnInit {

  messageToCipher = ""
  keyToCipher = ""
  errorCipher = false
  errorMessageCipher = ""
  cipherMessage = ""

  messageToDecipher = ""
  keyToDecipher = ""
  decipherMessage = ""
  errorDecipher = false
  errorMessageDecipher = ""

  private binaryConvert(string){
    return [...string].map(element => {
      let charCode = element.charCodeAt(0).toString(2);
      return charCode.length < 8 ? `0${charCode}` : charCode;
    })
  }

  private setCipherError(){
    this.errorCipher = true
    this.errorMessageCipher = "No es posible descifrar con los parámetros ingresados."
  }
  private setDecipherError(){
    this.errorDecipher = true
    this.errorMessageDecipher = "No es posible descifrar con los parámetros ingresados."
  }

  cipher(): void{
    if((this.messageToCipher.length > 0 && this.keyToCipher.length > 0) && this.messageToCipher.length === this.keyToCipher.length){
      this.errorCipher = false
      this.errorMessageCipher = ""

      let binaryMessage = this.binaryConvert(this.messageToCipher)
      let binaryKey = this.binaryConvert(this.keyToCipher)
      let cipherText = ""

      if(binaryMessage.length === binaryKey.length){
        for(let i = 0; i < binaryMessage.length; i++){
          for(let j = 0; j<binaryMessage[i].length; j++){
            cipherText += (parseInt(binaryMessage[i].charAt(j)) ^ parseInt(binaryKey[i].charAt(j)))
          }
        }
      }else{
        this.setCipherError()
      }
      this.cipherMessage = cipherText
    }else{
      this.setCipherError()
    }
  }

  decipher(): void{
    
    if((this.messageToDecipher.length > 0 && this.keyToDecipher.length > 0)){
      this.errorDecipher = false
      this.errorMessageDecipher = ""

      const messageArray = this.messageToDecipher.match(/.{1,8}/g)
      const binaryKey = this.binaryConvert(this.keyToDecipher)

      if(messageArray.length === binaryKey.length){
        this.decipherMessage = ""
        let decipherText = ""
        for(let i = 0; i < messageArray.length; i++){
          for(let j = 0; j< messageArray[i].length; j++){
            decipherText += (parseInt(messageArray[i].charAt(j)) ^ (parseInt(binaryKey[i].charAt(j))));
          }
        }
  
        decipherText.match(/.{1,8}/g).forEach(element => {
          this.decipherMessage += String.fromCharCode(parseInt(element,2))
        })
      }else{
        this.setDecipherError()
      }    
    }else{
      this.setDecipherError()
    }
  }


  constructor() { }

  ngOnInit(): void {
    this.cipher()
    this.decipher()
  }

}
