import {handler} from "../src/services/spaces/handler";
import {test} from "node:test";

// handler({
//    httpMethod: 'DELETE',
//    queryStringParameters: {
//       id: '74c502c0-0d04-488d-a8c5-ae3b0f77c6e3'
//    },
// } as any, {} as any);



/*handler({
   httpMethod: 'PUT',
   queryStringParameters: {
      id: '44df43cf-03ff-4ad2-96d9-5b74ffd72ae8'
   },
   body: JSON.stringify({
      location: 'Dublin updated2'
   })
} as any, {} as any);*/

/*handler({
   httpMethod:"GET",
   queryStringParameters: {
      id:'9f8bf6c5-81ab-4b5b-b865-db84770dc5eb'
   }

} as any, {} as any)*/


handler({
   httpMethod:"POST",
   body: JSON.stringify({
      location:"Vilnus"
   })

} as any, {} as any)




