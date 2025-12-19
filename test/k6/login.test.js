import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { getBaseUrl } from './helpers/getBaseUrl.js';
import {SharedArray} from 'k6/data';

const users = new SharedArray('users', function() {
    return   JSON.parse(open('./data/login.test.data.json'));

})


  
export let options = {
    vus: 2,
    iterarions: 3,
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições em menos de 2s
    },
}

export default function () {
        const user = users[__VU -1]

        const username = user.email;
        const password = user.password;
        
        const res = http.post(
            `${getBaseUrl()}/users/login`,
            JSON.stringify({ username, password }),
            { headers: { 'Content-Type': 'application/json' } },
        )
        check(res, {
            'login status 200': (r) => r.status === 200,
           
        });

        sleep(1);
}
