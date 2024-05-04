import {handler} from "../src/services/spaces/handler";
import {test} from "node:test";


// This test fails because it throws an exception.
handler({
   httpMethod:"GET",

} as any, {} as any)




