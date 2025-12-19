import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { getBaseUrl } from './helpers/getBaseUrl.js';
import { login } from './helpers/login.js';
import faker from "k6/x/faker"

export let options = {
    //vus: 10,
    // duration: '15s',
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições em menos de 2s
    },
    stages: [
        { duration: '5s', target: 5 }, 
        { duration: '10s', target: 10 }, 
        { duration: '5s', target: 0 }, 
    ],
};

const transferTrend = new Trend('transfer_post_duration');

export default function () {
    let username = `user_${__VU}_${__ITER}`;
    let password = '123456';
    let favorecido = `fav_${__VU}`;
    let token;

    username = faker.person.firstName();

    group('Registrar favorecido', function () {
        const url = `${getBaseUrl()}/users/register`;
         username = faker.person.firstName();
        const payload = JSON.stringify({ username: favorecido, password, favorecidos: [username] });
        const params = { headers: { 'Content-Type': 'application/json' } };
        http.post(url, payload, params); 
    });

    group('Registrar usuário', function () {
        const url = `${getBaseUrl()}/users/register`;
        const payload = JSON.stringify({ username, password, favorecidos: [favorecido] });
        const params = { headers: { 'Content-Type': 'application/json' } };
        let res = http.post(url, payload, params);
        check(res, {
            'register status 201 ou 400': (r) => r.status === 201 || r.status === 400,
        });
    });

    group('Login', function () {
        token = login(username, password);
    });

    group('Transferência', function () {
        const url = `${getBaseUrl()}/transfers`;
        const payload = JSON.stringify({ from: username, to: favorecido, value: 100 });
        const params = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const res = http.post(url, payload, params);
        transferTrend.add(res.timings.duration);
        check(res, {
            'transfer status 201': (r) => r.status === 201,
        });
    });

    sleep(1);
}
