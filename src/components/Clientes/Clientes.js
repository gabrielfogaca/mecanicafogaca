import React from 'react';
import { Navigate } from 'react-router-dom'; // Para redirecionamento
import { useAuth } from '../../contexts/authContext'; // Importar o contexto de autenticação
import NovoCliente from './NovoCliente';
import Cadastrados from './ClientesCadastrados';

function Clientes() {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    // Se o usuário não estiver logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="basis-full">
        <NovoCliente />
        <Cadastrados />
      </div>
    </div>
  );
}

export default Clientes;
