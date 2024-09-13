import React from 'react';
import { useAuth } from '../../contexts/authContext'; // Importar o contexto de autenticação
import NovaPeca from './NovaPeca';
import PecasCadastradas from './PecasCadastradas';

function Clientes() {
  const { userLoggedIn } = useAuth(); // Obter estado de autenticação

  if (!userLoggedIn) {
    return <p>Você precisa estar logado para acessar esta página.</p>;
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="basis-full">
        <NovaPeca />
        <PecasCadastradas />
      </div>
    </div>
  );
}

export default Clientes;
