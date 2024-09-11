import * as React from 'react';
import NovaPeca from './NovaPeca';
import PecasCadastradas from './PecasCadastradas';

function Clientes() {
  return (
    <div class="flex flex-row gap-4">
      <div class="basis-full">
        <NovaPeca />
        <PecasCadastradas />
      </div>
    </div>
  );
}

export default Clientes;
