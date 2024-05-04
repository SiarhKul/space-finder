import {handler} from "../src/services/spaces/handler";
import {test} from "node:test";


// This test fails because it throws an exception.
handler({
   httpMethod:"POST",
   body: JSON.stringify({
       location:"London"
   })

} as any, {} as any)




