import React, { useState } from 'react';
import ClientCard from './SelectedClient'; // Certifique-se de que o caminho está correto

const Cadastrados = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const clientData = [
    {
      nomeCompleto: 'João da Silva',
      cpf: '123.456.789-00',
      carro: 'Fiat Uno',
      dataNascimento: '01/01/1980',
      cidade: 'São Paulo',
      telefone: '(11) 98765-4321',
      orcamentos: ['R$ 10.000', 'R$ 15.000', 'R$ 20.000'],
    },
    {
      nomeCompleto: 'Maria Oliveira',
      cpf: '987.654.321-00',
      carro: 'Honda Civic',
      dataNascimento: '15/03/1990',
      cidade: 'Rio de Janeiro',
      telefone: '(21) 91234-5678',
      orcamentos: ['R$ 5.000', 'R$ 8.000', 'R$ 12.000'],
    },
    {
      nomeCompleto: 'Carlos Pereira',
      cpf: '456.789.123-00',
      carro: 'Ford Fiesta',
      dataNascimento: '22/07/1985',
      cidade: 'Belo Horizonte',
      telefone: '(31) 99876-5432',
      orcamentos: ['R$ 7.000', 'R$ 10.000', 'R$ 14.000'],
    },
    {
      nomeCompleto: 'Ana Costa',
      cpf: '321.654.987-00',
      carro: 'Chevrolet Tracker',
      dataNascimento: '30/10/1982',
      cidade: 'Curitiba',
      telefone: '(41) 93456-7890',
      orcamentos: ['R$ 12.000', 'R$ 18.000', 'R$ 22.000'],
    },
    {
      nomeCompleto: 'Roberto Lima',
      cpf: '654.321.987-00',
      carro: 'Volkswagen Gol',
      dataNascimento: '05/12/1978',
      cidade: 'Porto Alegre',
      telefone: '(51) 92345-6789',
      orcamentos: ['R$ 9.000', 'R$ 13.000', 'R$ 17.000'],
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
        {clientData.map((client, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-x-4 flex-1">
              <div className="h-12 w-12 flex-none rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-black">
                  {client.nomeCompleto}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  CPF/CNPJ: {client.cpf}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Carro: {client.carro}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Data de Nascimento: {client.dataNascimento}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cidade: {client.cidade}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Telefone: {client.telefone}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="ml-4 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 w-24 max-w-[10%]"
              onClick={() => setSelectedClient(client)}
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
      <div className="flex-none w-full lg:w-1/3 p-4">
        <ClientCard client={selectedClient} />
      </div>
    </div>
  );
};

export default Cadastrados;
