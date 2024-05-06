import {AuthService} from "./AuthService";


async function testAuth() {
    const service = new AuthService()
    const loginResult = await service.login('sk', '1qaz@WSX')

    console.log("=>(auth.test.ts:6) service", loginResult);

}

testAuth().then(r => console.log(r))
