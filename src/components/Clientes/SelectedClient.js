import React, { useState } from 'react';
import CardOrcamento from './CardOrcamento';

const ClientCard = ({ client }) => {
  // Define os orçamentos disponíveis
  const orcamentos = [
    {
      id: 1,
      nome: 'João da Silva',
      endereco: 'Rua das Flores, 123',
      cpfCnpj: '123.456.789-00',
      carro: 'Fiat Uno',
      placa: 'ABC-1234',
      cidade: 'São Paulo',
      telefone1: '(11) 98765-4321',
      telefone2: '(11) 91234-5678',
      pecas: [
        {
          id: 1,
          nome: 'Peça A',
          precoCompra: 100,
          precoFrete: 20,
          quantidade: 2,
        },
        {
          id: 3,
          nome: 'Peça C',
          precoCompra: 150,
          precoFrete: 25,
          quantidade: 1,
        },
      ],
      type: 1,
      ValorParcelado: '638.75',
      ValorAvista: '450.00',
      dataOrcamento: '01/09/2024',
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      endereco: 'Rua das Palmeiras, 456',
      cpfCnpj: '987.654.321-00',
      carro: 'Honda Civic',
      placa: 'XYZ-5678',
      cidade: 'Rio de Janeiro',
      telefone1: '(21) 91234-5678',
      telefone2: '(21) 92345-6789',
      pecas: [
        {
          id: 2,
          nome: 'Peça B',
          precoCompra: 200,
          precoFrete: 30,
          quantidade: 1,
        },
        {
          id: 4,
          nome: 'Peça D',
          precoCompra: 80,
          precoFrete: 15,
          quantidade: 3,
        },
      ],
      type: 0,
      ValorParcelado: '514.13',
      ValorAvista: '400.00',
      dataOrcamento: '02/09/2024',
    },
    {
      id: 3,
      nome: 'Carlos Pereira',
      endereco: 'Avenida Central, 789',
      cpfCnpj: '456.789.123-00',
      carro: 'Ford Fiesta',
      placa: 'DEF-9012',
      cidade: 'Belo Horizonte',
      telefone1: '(31) 99876-5432',
      telefone2: '(31) 93214-5678',
      pecas: [
        {
          id: 5,
          nome: 'Peça E',
          precoCompra: 220,
          precoFrete: 35,
          quantidade: 2,
        },
      ],
      type: 2,
      ValorParcelado: '837.50',
      ValorAvista: '637.50',
      dataOrcamento: '03/09/2024',
    },
  ];

  const [selectedOrcamento, setSelectedOrcamento] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Função para selecionar um orçamento e exibir o modal
  const handleOrcamentoClick = (id) => {
    const orcamentoSelecionado = orcamentos.find(
      (orcamento) => orcamento.id === id,
    );
    setSelectedOrcamento(orcamentoSelecionado);
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrcamento(null);
  };

  if (!client) {
    return (
      <div role="status" className="flex items-start justify-center h-screen">
        <div className="mt-10">
          <div className="flex items-center justify-center w-96 h-96 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              Veja os detalhes do Cliente clicando no botão "Ver Detalhes"...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6 border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Detalhes do Cliente
      </h2>

      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          className="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome Completo
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.nome || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            CPF/CNPJ
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.cpfCnpj || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Carro
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.carro || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Placa
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.placa || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Data de Nascimento
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.dataNascimento || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Cidade
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.cidade || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Telefone 1
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.telefone1 || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Telefone 2
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.telefone2 || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Orçamentos
          </h3>
          <ul className="list-disc pl-5 text-gray-900 dark:text-gray-100">
            {client.orcamentos && client.orcamentos.length > 0 ? (
              client.orcamentos.map((orcamento) => (
                <li key={orcamento.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">Valor: </span>
                      {orcamento.ValorAvista} -
                      <span className="font-semibold"> Data: </span>
                      {orcamento.dataOrcamento}
                      <button
                        onClick={() => handleOrcamentoClick(orcamento.id)}
                        className="text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 w-80"
                      >
                        Visualizar Orçamento / Pedido
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>Não disponível</li>
            )}
          </ul>
        </div>

        {/* Modal */}
        {showModal && selectedOrcamento && (
          <CardOrcamento
            orcamento={selectedOrcamento}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ClientCard;
