import {JSONError} from "./DataValidator";
import {v4} from "uuid";
import {randomUUID} from "node:crypto";

export function createRandomId(){
    return randomUUID()
}

export function parseJson(arg:string){

    try {
        return JSON.parse(arg)
    }catch (error: any){
        throw new JSONError(error.message)
    }
}
