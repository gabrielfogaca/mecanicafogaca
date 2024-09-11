import * as React from 'react';
import NovoCliente from './NovoCliente';
import Cadastrados from './ClientesCadastrados';

function Clientes() {
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
