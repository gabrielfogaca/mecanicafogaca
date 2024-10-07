import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import DateSelect from './DateSelect';
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
import { Timestamp } from 'firebase/firestore';

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
  const [compras, setCompras] = useState(0); // Total de compras de peças
  const [despesas, setDespesas] = useState(0); // Total de despesas adicionais
  const [vendas, setVendas] = useState(0); // Total de vendas (Pedidos)
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async (month, year) => {
    if (dataFetched || !month || !year) return;

    try {
      // Compra de Peças
      const pecasQuery = query(collection(db, 'peca'));
      const pecasSnapshot = await getDocs(pecasQuery);
      const totalCompras = pecasSnapshot.docs.reduce((acc, doc) => {
        const peca = doc.data();
        const dataDoCadastro = peca.dataDoCadastro;
        if (dataDoCadastro) {
          const [dia, mes, ano] = dataDoCadastro.split('/').map(Number);
          if (mes === month && ano === year) {
            return (
              acc + Number(peca.precoCompra || 0) + Number(peca.precoFrete || 0)
            );
          }
        }
        return acc;
      }, 0);
      setCompras(totalCompras);

      // Despesas adicionais
      const despesasQuery = query(collection(db, 'despesa'));
      const despesasSnapshot = await getDocs(despesasQuery);
      const totalDespesas = despesasSnapshot.docs.reduce((acc, doc) => {
        const despesa = doc.data();
        const dataDespesa = despesa.dataDespesa;
        if (dataDespesa) {
          const [dia, mes, ano] = dataDespesa.split('/').map(Number);
          if (mes === month && ano === year) {
            return acc + Number(despesa.valorDespesa || 0);
          }
        }
        return acc;
      }, 0);
      setDespesas(totalDespesas);

      // Pedidos (orcamentos com tipo diferente de 0)
      const startDate = new Timestamp(
        new Date(year, month - 1, 1).getTime() / 1000,
        0,
      );
      const endDate = new Timestamp(
        new Date(year, month, 0, 23, 59, 59).getTime() / 1000,
        0,
      );

      const pedidosQuery = query(
        collection(db, 'orcamento'),
        where('tipo', '!=', 0),
        where('dataOrcamento', '>=', startDate),
        where('dataOrcamento', '<=', endDate),
      );
      const pedidosSnapshot = await getDocs(pedidosQuery);
      const totalVendas = pedidosSnapshot.docs.reduce((acc, doc) => {
        const pedido = doc.data();
        return acc + Number(pedido.ValorAvista || 0);
      }, 0);
      setVendas(totalVendas);

      setDataFetched(true);
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
    setDataFetched(false);
  };

  const data = {
    labels: ['Compra de Peças', 'Despesas', 'Pedidos'],
    datasets: [
      {
        label: 'R$',
        data: [compras, despesas, vendas],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
      <DateSelect onDateSelect={handleDateSelect} />
      <p>Escolha o mês e ano para visualizar o fechamento.</p>
      <div style={{ width: '500px', height: '300px' }}>
        {compras > 0 || despesas > 0 || vendas > 0 ? (
          <Bar options={options} data={data} />
        ) : (
          <p>Selecione um mês e ano para visualizar os dados.</p>
        )}
      </div>
    </div>
  );
}

export default Fechamento;
