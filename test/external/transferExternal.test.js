const request = require('supertest');
const { expect } = require('chai');



describe('Transfer Controller', () => {
    describe('POST /transfers', () => {

        it('Quando informo remetente e destinatario inexistente recebo 400', async () => {
             const resposta = await request('http://localhost:3000')
                 .post('/transfers')
                 .send({
                     from: 'Emival',
                     to: 'Miriam',
                     value: 100
                 });
                 expect(resposta.status).to.equal(400);
                 expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
            });
        });
    });            