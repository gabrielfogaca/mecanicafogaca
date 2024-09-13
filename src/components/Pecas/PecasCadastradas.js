import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext'; // Importar o contexto de autenticação
import { collection, onSnapshot } from 'firebase/firestore'; // Importar funções do Firestore
import { db } from '../../firebase/firebase'; // Importar o db do Firebase
import PecasCard from './PecaSelecionada'; // Certifique-se de que o caminho está correto

const PecasCadastradas = () => {
  const { userLoggedIn } = useAuth(); // Obter estado de autenticação
  const [pecasData, setPecasData] = useState([]); // Estado para armazenar dados das peças
  const [selectedPeca, setSelectedPeca] = useState(null);

  // Função para calcular o preço de venda
  const calcularPrecoVenda = (precoCompra, precoFrete) => {
    return (precoCompra + precoFrete) * 1.2; // 20% acima do total
  };

  useEffect(() => {
    if (userLoggedIn) {
      // Função para buscar peças em tempo real
      const unsubscribe = onSnapshot(collection(db, 'peca'), (snapshot) => {
        const pecas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPecasData(pecas);
      });

      // Limpar o listener quando o componente for desmontado
      return () => unsubscribe();
    }
  }, [userLoggedIn]);

  // Redireciona para a página de login se o usuário não estiver autenticado
  if (!userLoggedIn) {
    return <p>Você precisa estar logado para acessar esta página.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
        {pecasData.map((peca, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-x-4 flex-1">
              <div className="h-12 w-12 flex-none rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-black">
                  {peca.nome}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Preço de Compra: R$ {peca.precoCompra.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Preço do Frete: R$ {peca.precoFrete.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Preço de Venda: R${' '}
                  {calcularPrecoVenda(
                    peca.precoCompra,
                    peca.precoFrete,
                  ).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Quantidade em Estoque: {peca.estoque}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="ml-4 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 w-24 max-w-[10%]"
              onClick={() => setSelectedPeca(peca)}
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
