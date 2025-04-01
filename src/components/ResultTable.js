'use client';

import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

export default function ResultTable({ items, onExportPdf }) {
  const totals = items.reduce(
    (acc, item) => {
      return {
        totalAmount: acc.totalAmount + item.amount,
        totalCommission: acc.totalCommission + item.commissionAmount,
        totalRemaining: acc.totalRemaining + item.remainingAmount,
      };
    },
    { totalAmount: 0, totalCommission: 0, totalRemaining: 0 }
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <div className="text-lg sm:text-xl font-bold text-gray-800">Resultados</div>
        <button
          onClick={onExportPdf}
          className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm"
        >
          <ArrowDownTrayIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Exportar PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-3/5">
                Descrição
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-2/5">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-3 py-2 text-left text-sm font-medium">Valor Total Bruto</td>
              <td className="px-3 py-2 text-right text-sm">{formatCurrency(totals.totalAmount)}</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-3 py-2 text-left text-sm font-medium">Comissão Total a Receber</td>
              <td className="px-3 py-2 text-right text-sm text-green-600">
                {formatCurrency(totals.totalCommission)}
              </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-3 py-2 text-left text-sm font-medium">Valor Total Restante</td>
              <td className="px-3 py-2 text-right text-sm text-red-600">
                {formatCurrency(totals.totalRemaining)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
