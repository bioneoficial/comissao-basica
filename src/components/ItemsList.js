'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function ItemsList({ items, onDeleteItem, onEditItem, calculationDone }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (items.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md mt-4">
        <div className="text-center text-gray-500">
          Nenhum valor adicionado. Use o formulário acima para adicionar valores.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <div className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Valores Adicionados</div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-1/5">
                Valor
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-2/5">
                Tipo de Pagamento
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-1/5">
                % Comissão
              </th>
              {calculationDone && (
                <>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-1/5">
                    Comissão
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-1/5">
                    Restante
                  </th>
                </>
              )}
              {!calculationDone && (
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-1/5">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-3 py-2 text-left text-sm">{formatCurrency(item.amount)}</td>
                <td className="px-3 py-2 text-left text-sm">{item.paymentLabel}</td>
                <td className="px-3 py-2 text-center text-sm">{item.commissionRate}%</td>
                
                {calculationDone && (
                  <>
                    <td className="px-3 py-2 text-center text-sm text-green-600">
                      {formatCurrency(item.commissionAmount)}
                    </td>
                    <td className="px-3 py-2 text-center text-sm text-red-600">
                      {formatCurrency(item.remainingAmount)}
                    </td>
                  </>
                )}
                
                {!calculationDone && (
                  <td className="px-3 py-2 text-right text-sm">
                    <button
                      onClick={() => onEditItem(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 inline-flex items-center justify-center"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center justify-center"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
