const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');



const app = require('../../app');
const transferService = require('../../service/transferService');


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
            
            
           it('Usando mocks: Quando informo remetente e destinatario inexistente encontrado', async () => {
            
            const transferServicemock = sinon.stub(transferService,'transfer')
            transferServicemock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                 .post('/transfers')
                 .send({
                     from: 'Emival',
                     to: 'Miriam',
                     value: 100
                 });
                 expect(resposta.status).to.equal(400);
                 expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

                 sinon.restore();
            });

             it('Usando mocks: Quando informo valores valido tenho sucesso', async () => {
            
            const transferServicemock = sinon.stub(transferService,'transfer')
            transferServicemock.returns({ 
                from: 'Emival',
                to:'Miriam',
                value:100,
                date: new Date().toISOString()
            });

            const resposta = await request(app)
                 .post('/transfers')
                 .send({
                     from: 'Emival',
                     to: 'Miriam',
                     value: 100
                 });
                 expect(resposta.status).to.equal(201);
                 expect(resposta.body).to.have.property('from', 'Emival')
                 expect(resposta.body).to.have.property('to', 'Miriam')
                 expect(resposta.body).to.have.property('value', 100)

                 sinon.restore();
            });
                
                   
            
        });
    });
