import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { tableForInitialPermutation, tablePC1, tableForRExpansion, tableForBoxesPermutation , sbox1, sbox2, sbox3, sbox4, sbox5, sbox6, sbox7, sbox8 } from '../tables'

@Component({
  selector: 'app-des',
  templateUrl: './des.component.html',
  styleUrls: ['./des.component.scss']
})
export class DESComponent implements OnInit {

  constructor() { }

  message = "Programa"
  key = "lenguaje"
  binaryMessage = ""
  binaryMessageInitialPermutation = ""
  binaryKey = ""
  binaryKeyPC1 = ""
  leftInitial = ""
  rightInitial = ""
  firstExpandedRight = ""
  firstRxorK = ""
  firstBoxes = ""
  firstBinaryBoxes = ""
  firstRoundResult = ""

  ngOnInit(): void {
    this.cipherDES()
  }

  cipherDES(): void{
    let binaryMessage = [...this.message].map(el => {
      let charCode = el.charCodeAt(0).toString(2)
      return charCode.length < 8 ? `0${charCode}` : charCode
    }).toString().replace(/,/g,"")

    this.binaryMessage = binaryMessage.toString().replace(/,/g,"")

    const initialPermutation = tableForInitialPermutation.map(el => {
      return binaryMessage[el-1]
    })
    this.binaryMessageInitialPermutation = initialPermutation.toString().replace(/,/g,"")

    const binaryKey = [...this.key].map(el => {
      let charCode = el.charCodeAt(0).toString(2)
      return charCode.length < 8 ? `0${charCode}` : charCode
    }).toString().replace(/,/g,"").split("")

    const binaryKeyString = [...this.key].map(el => {
      let charCode = el.charCodeAt(0).toString(2)
      return charCode.length < 8 ? `0${charCode}` : charCode
    }).toString().replace(/,/g,"")

    this.binaryKey = binaryKeyString

    const binaryKeyPC1 = tablePC1.map(el => {
      return binaryKey[el-1]
    }).toString().replace(/,/g,"")

    this.binaryKeyPC1 = binaryKeyPC1

    const firstLeft = initialPermutation.toString().replace(/,/g,"").substr(0,32)
    const firstRight = initialPermutation.toString().replace(/,/g,"").substr(32,64)

    this.leftInitial = firstLeft
    this.rightInitial = firstRight
    

    const expandedRight = tableForRExpansion.map(el => {
      return firstRight[el-1]
    }).toString().replace(/,/g,"").split("")

    this.firstExpandedRight = expandedRight.toString().replace(/,/g,"")

    // Como empieza en 0 se le resta 1
    const dontIterateKey = [6,13,20,27,34,41,48,55]

    let RxorK = []
    
    let binaryKeyWithoutExtraKeys = binaryKeyPC1.split("")
    dontIterateKey.map((el, index) => {
      delete binaryKeyWithoutExtraKeys[el]
    })

    let binaryKeyResult = []
    
    binaryKeyWithoutExtraKeys.forEach(el => {
      binaryKeyResult.push(el)
    })

    binaryKeyResult.forEach((el, index) => {
        RxorK.push(parseInt(expandedRight[index]) ^ parseInt(binaryKeyResult[index]))
    })

    this.firstRxorK = RxorK.toString().replace(/,/g,"")

    const RxorKForBoxes = RxorK.toString().replace(/,/g,"").match(/.{1,6}/g)

    const boxes = RxorKForBoxes.map((el, index) => {
      const rowBinary = `${el[0]}${el[el.length-1]}`;
      let columnBinary = "";
      [...el].forEach((e,i) => {
        if(i > 0 && i < el.length-1){
          columnBinary += e
        }
      })
      return [
          parseInt(rowBinary,2), parseInt(columnBinary,2)
      ]
    })



    let binaryBoxes = [
      sbox1[boxes[0][0]][boxes[0][1]].toString(2),
      sbox2[boxes[1][0]][boxes[1][1]].toString(2),
      sbox3[boxes[2][0]][boxes[2][1]].toString(2),
      sbox4[boxes[3][0]][boxes[3][1]].toString(2),
      sbox5[boxes[4][0]][boxes[4][1]].toString(2),
      sbox6[boxes[5][0]][boxes[5][1]].toString(2),
      sbox7[boxes[6][0]][boxes[6][1]].toString(2),
      sbox8[boxes[7][0]][boxes[7][1]].toString(2)
    ]

    this.firstBoxes = binaryBoxes.toString().replace(/,/g,"")
    
    const binaryBoxesResult = binaryBoxes.map(el => {
      if(el.length < 4){
        for(let i = 0; i <= (4 - el.length); i++){
          el = `0${el}`
        }
      }
      return el
    }).toString().replace(/,/g,"").split("")
    

    const permutationBoxes = tableForBoxesPermutation.map(el => {
      return binaryBoxesResult[el-1]
    })

    this.firstBinaryBoxes = permutationBoxes.toString().replace(/,/g,"")

    const LxorBoxes = permutationBoxes.map((el, index) => {
      return parseInt(firstLeft[index]) ^ parseInt(permutationBoxes[index])
    })

    this.firstRoundResult = LxorBoxes.toString().replace(/,/g,"")
    
    
  }





}
