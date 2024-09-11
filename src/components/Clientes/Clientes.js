import * as React from 'react';
import NovoCliente from './NovoCliente';
import Cadastrados from './ClientesCadastrados';

function Clientes() {
  const clientData = {
    nomeCompleto: 'João da Silva',
    cpf: '123.456.789-00',
    carro: 'Fiat Uno',
    dataNascimento: '01/01/1980',
    cidade: 'São Paulo',
    telefone: '(11) 98765-4321',
    orcamentos: ['R$ 10.000', 'R$ 15.000', 'R$ 20.000'],
  };
  return (
    <div class="flex flex-row gap-4">
      <div class="basis-full">
        <NovoCliente />
        <Cadastrados />
      </div>
    </div>
  );
}

export default Clientes;
