const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const produtosController = require('../controllers/produtos');
const httpMocks = require('node-mocks-http');
const produtoRoute = require('./produtos');
//MOCHA - framework de teste, encapsula os testes em suites(describe) and cases(it) com before e after
//CHAI - é uma biblioteca que possibilita fazer as assertions como: expect(), assert(), should()
//SINON - é um package que faz mock de external methods que um method chama, fazendo spy(), stub(), mock()

//spy() - serve para criar uma função fake vazia
//stub() - é um spy() com um comportamento pré determinado, ou seja, faz com que a função do spy() faça alguma coisa

describe('Produtos routes', () => {
    describe('GET produtos', () => {
        it("should return all products", () => {
            const stubValue = {
                status: 200,
                json: [
                    {
                        id: 4,
                        nome: 'chocolate',
                        valor: 5
                    }]
            };
            const stub = sinon.stub(produtosController, 'listarProdutos').returns(stubValue);
            const mockRequest = httpMocks.createRequest({
                method: "GET",
                url: '/produtos'
            });
            const mockResponse = httpMocks.createResponse();
    
            produtoRoute(mockRequest, mockResponse);
            expect(stub.calledOnce).to.be.true;
            console.log(mockResponse._getData);
            expect(mockResponse._getData()).to.equal(stubValue.json);
            expect(mockResponse.statusCode).to.equal(stubValue.status);
        });
    });
});





// describe('Example router', () => {
//     it('should return Hello world', () => {
//         const mockRequest = httpMocks.createRequest({
//             method: "GET",
//             url: '/'
//         });
//         const mockResponse = httpMocks.createResponse();

//         produtoRoute(mockRequest, mockResponse);
//         assert.equal(mockResponse._getData(), "Hello world");
//     });
// });