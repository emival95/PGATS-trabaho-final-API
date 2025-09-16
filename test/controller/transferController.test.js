const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');



const app = require('../../app');
const { from } = require('form-data');


describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistente recebo 400', async () => {
             const resposta = await request(app)
                 .post('/transfers')
                 .send({
                     from: 'Emival',
                     to: 'Miriam',
                     value: 100
                 });
                 expect(resposta.status).to.equal(400);
                 expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
            });
            
            describe('GET /transfers', () => {

            })
                
                   
            
        });
    });
