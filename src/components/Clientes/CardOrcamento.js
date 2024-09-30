import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import logo1 from './imagens/logomf.jpg';
import logo2 from './imagens/logomg.jpg';

const CardOrcamento = ({ orcamento, onClose }) => {
  const currentDate = new Date().toLocaleDateString();

  // Adicione este console.log para verificar os dados do orçamento
  console.log('Orçamento recebido:', orcamento);

  return (
    <Dialog open={!!orcamento} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Orçamento / Pedido</DialogTitle>
      <DialogContent>
        <div className="order-form">
          {/* Cabeçalho da página */}
          <header className="header flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img src={logo1} alt="Logo 1" className="w-60 mb-4" />
              <img src={logo2} alt="Logo 2" className="w-60 mb-4" />
            </div>
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-2">
                OFICINA ESPECIALIZADA EM SISTEMA
              </h2>
              <h2 className="text-2xl font-bold mb-2">
                COMMON RAIL E SOLDAS ESPECIAIS
              </h2>
              <p>Rua Miguel Capssa, 58, Assis Brasil - Ijuí/RS</p>
              <p>Fone: 55 99928-7017 / 55 99235-5642</p>
            </div>
          </header>

          {/* Corpo principal */}
          <main className="main">
            <div className="header-info">
              <div className="options">
                <label>
                  <input
                    type="checkbox"
                    name="pedido"
                    className="ml-4"
                    checked={orcamento.tipo === 0}
                    readOnly
                  />
                  <span className="ml-4">Pedido</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="orcamento"
                    checked={orcamento.tipo === 1}
                    readOnly
                  />
                  <span className="ml-4">Orçamento</span>
                </label>
              </div>
              <p className="date">
                Data: {orcamento.dataOrcamento || currentDate}
              </p>
            </div>

            {/* Dados do cliente */}
            <div className="client-info-container rounded border-1 border-black mb-2">
              <table className="client-info-table">
                <tbody>
                  <tr>
                    <th>Nome</th>
                    <td>{orcamento.nome || 'Não disponível'}</td>
                  </tr>
                  <tr>
                    <th>Endereço</th>
                    <td>{orcamento.endereco || 'Não disponível'}</td>
                  </tr>
                  <tr>
                    <th>Carro</th>
                    <td>{orcamento.carro || 'Não disponível'}</td>
                  </tr>
                  <tr>
                    <th>Cidade</th>
                    <td>{orcamento.cidade || 'Não disponível'}</td>
                  </tr>
                  <tr>
                    <th>CPF/CNPJ</th>
                    <td>{orcamento.cpfcnpj || 'Não disponível'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Seleção de peças */}
            <table>
              <thead>
                <tr>
                  <th>Qnt.</th>
                  <th>Descrição do Produto/Serviço</th>
                  <th>Valor Unitário</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orcamento.pecas &&
                Object.values(orcamento.pecas).length > 0 ? (
                  Object.values(orcamento.pecas).map((peca, index) => (
                    <tr key={index}>
                      <td>{peca.quantidade}</td>
                      <td>{peca.nome || 'Peça não especificada'}</td>
                      <td>
                        {(
                          (Number(peca.precoCompra || 0) +
                            Number(peca.precoFrete || 0)) *
                          1.2 *
                          Number(peca.quantidade)
                        ).toFixed(2)}
                      </td>
                      <td>
                        {peca.precoCompra !== undefined &&
                        peca.precoFrete !== undefined &&
                        peca.quantidade
                          ? `R$ ${(
                              (Number(peca.precoCompra) +
                                Number(peca.precoFrete)) *
                              1.2 *
                              Number(peca.quantidade)
                            ).toFixed(2)}`
                          : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Nenhuma peça disponível</td>
                  </tr>
                )}
                {/* Linha para valores totais */}
                <tr>
                  <td colSpan="3" className="font-bold">
                    Total À Vista
                  </td>
                  <td className="font-bold">
                    R$
                    {orcamento.ValorAvista
                      ? orcamento.ValorAvista.toFixed(2)
                      : 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="font-bold">
                    Total Parcelado
                  </td>
                  <td className="font-bold">
                    R$
                    {orcamento.ValorParcelado
                      ? orcamento.ValorParcelado.toFixed(2)
                      : 'N/A'}
                  </td>
                </tr>
              </tbody>
            </table>
          </main>

          {/* Rodapé */}
          <footer className="footer">
            <div className="relative container space-x-4 no-print">
              <Button variant="contained" className="w-72">
                Salvar Orçamento / Pedido
              </Button>
            </div>
          </footer>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardOrcamento;
