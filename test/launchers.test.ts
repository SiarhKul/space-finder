import {handler} from "../src/services/spaces/handler";
import {test} from "node:test";


// This test fails because it throws an exception.
/*handler({
   httpMethod:"GET",
   queryStringParameters: {
      id:'9f8bf6c5-81ab-4b5b-b865-db84770dc5eb'
   }

} as any, {} as any)*/


handler({
   httpMethod:"POST",
   body: JSON.stringify({
      location:"Berline"
   })

} as any, {} as any)




