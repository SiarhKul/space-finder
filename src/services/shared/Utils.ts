import {JSONError} from "./DataValidator";

export function parseJson(arg:string){

    try {
        return JSON.parse(arg)
    }catch (error: any){
        throw new JSONError(error.message)
    }
}
