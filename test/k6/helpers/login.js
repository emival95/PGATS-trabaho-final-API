import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from './getBaseUrl.js';

export function login(username, password) {
    const url = `${getBaseUrl()}/users/login`;
    const payload = JSON.stringify({ username, password });
    const params = { headers: { 'Content-Type': 'application/json' } };
    const res = http.post(url, payload, params);
    check(res, {
        'login status 200': (r) => r.status === 200,
       
    });
    return res.json('token');
}
