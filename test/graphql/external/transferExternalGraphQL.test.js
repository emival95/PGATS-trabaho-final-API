const request = require('supertest');
const { expect } = require('chai');


describe('Teste GraphQL de Transferencias', ()=>{
	let token;
	beforeEach( async() =>{
		const loginUser = require('../fixture/requisicoes/login/loginUSer.json');
		const resposta = await request('http://localhost:4000/graphql')
			.post('')
			.send(loginUser);
			token = resposta.body.data.login.token;
	})    
	it('Validar a possubilidade de transferências entre duas contas',async ()  => {
		const respostaTransferencia = await request('http://localhost:4000/graphql')
		  .post('')
		  .set('Authorization', `Bearer ${token}`)
		  .send({
				query: `
					mutation Mutation($from: String!, $to: String!, $value: Float!) {
					   transfer(from: $from, to: $to, value: $value) {
						   date
						   from
						   to
						  value
						}
				  }
			 `,
				variables: {
					from: 'Emival',
					to: 'Miriam',
					value: 20
				}
		  })
		  expect(respostaTransferencia.status).to.equal(200);
	})
	it('Validar que não é possivel transferir acima de 5 mil sem favorecidos', async () => {
		const respostaTransferencia = await request('http://localhost:4000/graphql')
			.post('')
			.set('Authorization', `Bearer ${token}`)
			.send({
				query: `
					mutation Mutation($from: String!, $to: String!, $value: Float!) {
						transfer(from: $from, to: $to, value: $value) {
							date
							from
							to
							value
						}
					}
				`,
				variables: {
					from: 'Pele',
					to: 'Emival',
					value: 12000
				}
			});
		expect(respostaTransferencia.status).to.equal(200);
		expect(respostaTransferencia.body.errors[0].message).to.equal('Transferência acima de R$ 5.000,00 só para favorecidos');

		})
	});
