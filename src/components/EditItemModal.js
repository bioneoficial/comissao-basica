'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { XMarkIcon } from '@heroicons/react/24/solid';

const paymentTypes = [
  { id: 'cash', label: 'DINHEIRO/TRANS/PIX', commission: 60 },
  { id: 'debit', label: 'Débito', commission: 55.63 },
  { id: 'credit', label: 'Crédito', commission: 54.62 },
  { id: 'installment2', label: '2x S/Juros', commission: 53.36 },
  { id: 'installment3', label: '3x S/Juros', commission: 52.95 },
  { id: 'installment4', label: '4x S/Juros', commission: 52.54 },
  { id: 'installment5', label: '5x S/Juros', commission: 52.13 },
  { id: 'installment6', label: '6x S/Juros', commission: 51.73 },
  { id: 'installment7', label: '7x S/Juros', commission: 51.33 },
  { id: 'installment8', label: '8x S/Juros', commission: 50.93 },
  { id: 'installment9', label: '9x S/Juros', commission: 50.55 },
  { id: 'installment10', label: '10x S/Juros', commission: 50.16 },
];

export default function EditItemModal({ isOpen, onClose, item, onSave }) {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      paymentType: 'cash',
    }
  });

  useEffect(() => {
    if (item) {
      setValue('amount', item.amount);
      setValue('paymentType', item.paymentType);
    }
  }, [item, setValue]);

  const onSubmit = (data) => {
    const amountValue = data.amount;
    const numericValue = parseFloat(amountValue);
    const selectedPaymentType = paymentTypes.find(type => type.id === data.paymentType);
    
    onSave({
      ...item,
      amount: numericValue,
      paymentType: data.paymentType,
      paymentLabel: selectedPaymentType.label,
      commissionRate: selectedPaymentType.commission,
      commissionAmount: (numericValue * selectedPaymentType.commission) / 100,
      remainingAmount: numericValue - ((numericValue * selectedPaymentType.commission) / 100)
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        
        <h2 className="text-lg sm:text-xl font-bold mb-4">Editar Item</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="edit-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Valor (R$)
            </label>
            <Controller
              name="amount"
              control={control}
              rules={{ required: 'Valor é obrigatório' }}
              render={({ field }) => (
                <NumericFormat
                  id="edit-amount"
                  displayType="input"
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  prefix="R$ "
                  className={`w-full p-2 border rounded-md ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-indigo-500 focus:border-indigo-500`}
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue || 0);
                  }}
                />
              )}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="edit-paymentType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Pagamento
            </label>
            <Controller
              name="paymentType"
              control={control}
              rules={{ required: 'Tipo de pagamento é obrigatório' }}
              render={({ field }) => (
                <select
                  id="edit-paymentType"
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {paymentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label} ({type.commission}%)
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.paymentType && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentType.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
