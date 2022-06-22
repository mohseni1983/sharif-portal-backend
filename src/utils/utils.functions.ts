import * as bcrypt from "bcrypt";
const randomstring =require('randomstring')
export  function generateHashedString(rawText):string{
  return bcrypt.hashSync(rawText,15)
}

export function generateRandomString(length?:number){
  if(!length)
    length=5
  return randomstring.generate(length).toUpperCase()
}

export function generateUniqueCode(id:string,padNumber:number,startWith:string){
  return startWith+id.padStart(padNumber,'0')
}
