const request = require('supertest');
const { expect } = require('chai');

describe('Transfer Controller', () => {
    let token = null;

    before(async () => {
        const respostaLogin = await request('http://localhost:3000')
            .post('/users/login')
            .send({
                username: 'Emival',
                password: '123456'
            });
        token = respostaLogin.body.token;
    });

    it('Quando informo remetente e destinatario inexistente recebo 400', async () => {
        const resposta = await request('http://localhost:3000')
            .post('/transfers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                from: 'Emival',
                to: 'Gabriel',
                value: 100
            });
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
    });

    it('Usando mocks: Quando informo remetente e destinatario inexistentes recebo erro', async () => {
        const resposta = await request('http://localhost:3000')
            .post('/transfers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                from: 'teste',
                to: 'gabriel',
                value: 100
            });
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
    });

    it('Usando mocks: Quando informo valores válidos tenho sucesso', async () => {
        const resposta = await request('http://localhost:3000')
            .post('/transfers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                from: 'Emival',
                to: 'Miriam',
                value: 100
            });
        expect(resposta.status).to.equal(201);

    const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosTenhoSucesso201.json');
        delete resposta.body.date;
        delete respostaEsperada.date;

        expect(resposta.body).to.deep.equal(respostaEsperada);
    });
});
