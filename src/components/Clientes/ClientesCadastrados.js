import React, { useState } from 'react';
import ClientCard from './SelectedClient';

const Cadastrados = () => {
  const clientData = [
    {
      id: 1,
      nome: 'João da Silva',
      endereco: 'Rua das Flores, 123',
      cpfCnpj: '123.456.789-00',
      carro: 'Fiat Uno',
      placa: 'ABC-1234',
      dataNascimento: '01/01/1980',
      cidade: 'São Paulo',
      telefone1: '(11) 98765-4321',
      telefone2: '(11) 91234-5678',
      dataDoCadastro: '01/09/2024',
      orcamentos: [
        { id: 1, ValorAvista: 'R$ 225.00', dataOrcamento: '01/09/2024' },
        { id: 2, ValorAvista: 'R$ 400.00', dataOrcamento: '02/09/2024' },
      ],
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      endereco: 'Rua das Palmeiras, 456',
      cpfCnpj: '987.654.321-00',
      carro: 'Honda Civic',
      placa: 'XYZ-5678',
      dataNascimento: '15/03/1990',
      cidade: 'Rio de Janeiro',
      telefone1: '(21) 91234-5678',
      telefone2: '(21) 92345-6789',
      dataDoCadastro: '01/09/2024',
      orcamentos: [
        { id: 1, ValorAvista: 'R$ 225.00', dataOrcamento: '01/09/2024' },
        { id: 2, ValorAvista: 'R$ 400.00', dataOrcamento: '02/09/2024' },
      ],
    },
    {
      id: 3,
      nome: 'Carlos Pereira',
      endereco: 'Avenida Central, 789',
      cpfCnpj: '456.789.123-00',
      carro: 'Ford Fiesta',
      placa: 'DEF-9012',
      dataNascimento: '22/07/1985',
      cidade: 'Belo Horizonte',
      telefone1: '(31) 99876-5432',
      telefone2: '(31) 93214-5678',
      dataDoCadastro: '01/09/2024',
      orcamentos: [
        { id: 1, ValorAvista: 'R$ 225.00', dataOrcamento: '01/09/2024' },
        { id: 2, ValorAvista: 'R$ 400.00', dataOrcamento: '02/09/2024' },
      ],
    },
    {
      id: 4,
      nome: 'Ana Costa',
      endereco: 'Rua Marechal, 234',
      cpfCnpj: '321.654.987-00',
      carro: 'Chevrolet Tracker',
      placa: 'GHI-3456',
      dataNascimento: '30/10/1982',
      cidade: 'Curitiba',
      telefone1: '(41) 93456-7890',
      telefone2: '(41) 92345-6789',
      dataDoCadastro: '01/09/2024',
      orcamentos: [
        { id: 1, ValorAvista: 'R$ 225.00', dataOrcamento: '01/09/2024' },
        { id: 2, ValorAvista: 'R$ 400.00', dataOrcamento: '02/09/2024' },
      ],
    },
    {
      id: 5,
      nome: 'Roberto Lima',
      endereco: 'Rua do Comércio, 567',
      cpfCnpj: '654.321.987-00',
      carro: 'Volkswagen Gol',
      placa: 'JKL-6789',
      dataNascimento: '05/12/1978',
      cidade: 'Porto Alegre',
      telefone1: '(51) 92345-6789',
      telefone2: '(51) 93456-7890',
      dataDoCadastro: '01/09/2024',
      orcamentos: [
        { id: 1, ValorAvista: 'R$ 225.00', dataOrcamento: '01/09/2024' },
        { id: 2, ValorAvista: 'R$ 400.00', dataOrcamento: '02/09/2024' },
      ],
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  // Filtra os clientes pelo nome ou pela placa
  const filteredClients = clientData.filter(
    (client) =>
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.placa.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Lista de Clientes */}
      <div className="flex-1 p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
        {/* Campo de busca */}
        <div className="w-full lg:w-1/3 p-4">
          <input
            type="text"
            placeholder="Buscar por nome ou placa"
            className="p-2 border border-gray-300 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredClients.map((client, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-x-4 flex-1">
              <div className="h-12 w-12 flex-none rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-black">
                  {client.nome}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  CPF/CNPJ: {client.cpfCnpj}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Carro: {client.carro}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Placa: {client.placa}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cidade: {client.cidade}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Telefone: {client.telefone1}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="ml-4 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 w-48 max-w-[10%]"
              onClick={() => setSelectedClient(client)}
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>

      {/* Detalhes do Cliente */}
      <div className="flex-none w-full lg:w-1/3 p-4">
        <ClientCard client={selectedClient} />
      </div>
    </div>
  );
};

export default Cadastrados;
