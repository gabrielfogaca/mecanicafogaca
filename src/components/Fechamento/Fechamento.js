import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Importando o Firestore configurado
import DateSelect from './DateSelect'; // Importando o componente DateSelect
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Timestamp } from 'firebase/firestore'; // Importando o Timestamp para trabalhar com datas

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Fechamento() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [despesas, setDespesas] = useState(0); // Total de despesas (Peças)
  const [vendas, setVendas] = useState(0); // Total de vendas (Orçamentos do tipo 0)
  const [dataFetched, setDataFetched] = useState(false); // Estado para evitar múltiplas chamadas

  const fetchData = async (month, year) => {
    if (dataFetched || !month || !year) return;

    try {
      // Buscar peças (Despesas)
      const pecasQuery = query(collection(db, 'peca'));
      const pecasSnapshot = await getDocs(pecasQuery);
      const totalDespesas = pecasSnapshot.docs.reduce((acc, doc) => {
        const peca = doc.data();

        // Verificar se a peça foi cadastrada no mês e ano selecionados
        const dataDoCadastro = peca.dataDoCadastro;
        if (dataDoCadastro) {
          const [dia, mes, ano] = dataDoCadastro.split('/').map(Number);
          if (mes === month && ano === year) {
            // Somar o preço de compra e frete das peças cadastradas nesse mês/ano
            return (
              acc + Number(peca.precoCompra || 0) + Number(peca.precoFrete || 0)
            );
          }
        }
        return acc;
      }, 0);
      setDespesas(totalDespesas);

      // Verificar o início e o fim do mês selecionado
      const startDate = new Timestamp(
        new Date(year, month - 1, 1).getTime() / 1000,
        0,
      );
      const endDate = new Timestamp(
        new Date(year, month, 0, 23, 59, 59).getTime() / 1000,
        0,
      );

      // Buscar orçamentos do tipo 0 (Vendas) entre as datas selecionadas
      const orcamentosQuery = query(
        collection(db, 'orcamento'),
        where('tipo', '==', 0),
        where('dataOrcamento', '>=', startDate),
        where('dataOrcamento', '<=', endDate),
      );
      const orcamentosSnapshot = await getDocs(orcamentosQuery);
      const totalVendas = orcamentosSnapshot.docs.reduce((acc, doc) => {
        const orcamento = doc.data();
        return acc + Number(orcamento.ValorAvista || 0);
      }, 0);
      setVendas(totalVendas);

      setDataFetched(true); // Marca que os dados foram buscados
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchData(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  const handleDateSelect = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setDataFetched(false); // Resetar o estado para buscar novos dados
  };

  // Configuração do gráfico de barras
  const data = {
    labels: ['Despesas', 'Vendas'],
    datasets: [
      {
        label: 'R$',
        data: [despesas, vendas],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite ajustar a altura e largura manualmente
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Fechamento de ${selectedMonth}/${selectedYear}`,
      },
    },
  };

  return (
    <div>
      <h1>Fechamento</h1>

      {/* Insere o DateSelect para escolher mês e ano */}
      <DateSelect onDateSelect={handleDateSelect} />

      <p>Escolha o mês e ano para visualizar o fechamento.</p>

      {/* Renderiza o gráfico de barras com tamanho ajustado */}
      <div style={{ width: '500px', height: '300px' }}>
        {despesas > 0 || vendas > 0 ? (
          <Bar options={options} data={data} />
        ) : (
          <p>Selecione um mês e ano para visualizar os dados.</p>
        )}
      </div>
    </div>
  );
}

export default Fechamento;
