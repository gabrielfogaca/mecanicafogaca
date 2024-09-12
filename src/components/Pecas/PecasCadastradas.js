import React, { useState } from 'react';
import PecasCard from './PecaSelecionada'; // Certifique-se de que o caminho está correto

const PecasCadastradas = () => {
  const [selectedPeca, setselectedPeca] = useState(null);

  const PecasData = [
    {
      id: 1,
      nome: 'Peça A',
      precoCompra: 100,
      precoFrete: 20,
      quantidadeEstoque: 50,
      dataDoCadastro: '01/09/2024',
    },
    {
      id: 2,
      nome: 'Peça B',
      precoCompra: 200,
      precoFrete: 30,
      quantidadeEstoque: 30,
      dataDoCadastro: '01/09/2024',
    },
    {
      id: 3,
      nome: 'Peça C',
      precoCompra: 150,
      precoFrete: 25,
      quantidadeEstoque: 20,
      dataDoCadastro: '01/09/2024',
    },
    {
      id: 4,
      nome: 'Peça D',
      precoCompra: 80,
      precoFrete: 15,
      quantidadeEstoque: 40,
      dataDoCadastro: '01/09/2024',
    },
    {
      id: 5,
      nome: 'Peça E',
      precoCompra: 220,
      precoFrete: 35,
      quantidadeEstoque: 10,
      dataDoCadastro: '01/09/2024',
    },
  ];

  // Função para calcular o preço de venda
  const calcularPrecoVenda = (precoCompra, precoFrete) => {
    return (precoCompra + precoFrete) * 1.2; // 20% acima do total
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
        {PecasData.map((pecas, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-x-4 flex-1">
              <div className="h-12 w-12 flex-none rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-black">
                  {pecas.nome}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Preço de Compra: R$ {pecas.precoCompra.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Preço do Frete: R$ {pecas.precoFrete.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Preço de Venda: R${' '}
                  {calcularPrecoVenda(
                    pecas.precoCompra,
                    pecas.precoFrete,
                  ).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Quantidade em Estoque: {pecas.quantidadeEstoque}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="ml-4 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 w-24 max-w-[10%]"
              onClick={() => setselectedPeca(pecas)}
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
      <div className="flex-none w-full lg:w-1/3 p-4">
        <PecasCard pecas={selectedPeca} />
      </div>
    </div>
  );
};

export default PecasCadastradas;
