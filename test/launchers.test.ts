import {handler} from "../src/services/spaces/handler";
import {test} from "node:test";


process.env.AWS_REGION = "eu-central-1"
process.env.AWS_CONGINTO_USE_PASSWORD = '1qaz@WSX';

handler({
  httpMethod: 'DELETE',
  queryStringParameters: {
    id: '8b5c56a8-c731-4324-a0b9-662e1eebb7d0'
  },
} as any, {} as any);


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


/*handler({
   httpMethod:"POST",
   body: JSON.stringify({
      location:"Belastok",
      name: 'V'
   })

} as any, {} as any)*/




