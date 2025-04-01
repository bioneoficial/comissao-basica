'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

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

export default function CommissionForm({ onAddItem }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      paymentType: 'cash',
    }
  });

  const onSubmit = (data) => {
    const amountValue = data.amount;
    const numericValue = parseFloat(amountValue);
    const selectedPaymentType = paymentTypes.find(type => type.id === data.paymentType);
    
    onAddItem({
      id: Date.now(),
      amount: numericValue,
      paymentType: data.paymentType,
      paymentLabel: selectedPaymentType.label,
      commissionRate: selectedPaymentType.commission,
      commissionAmount: (numericValue * selectedPaymentType.commission) / 100,
      remainingAmount: numericValue - ((numericValue * selectedPaymentType.commission) / 100)
    });
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5 bg-white rounded-lg shadow-md">
      <div className="text-xl font-bold text-gray-800 mb-4">Adicionar Valor</div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Valor (R$)
          </label>
          <Controller
            name="amount"
            control={control}
            rules={{ required: 'Valor é obrigatório' }}
            render={({ field }) => (
              <NumericFormat
                id="amount"
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

        <div className="md:col-span-1">
          <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Pagamento
          </label>
          <Controller
            name="paymentType"
            control={control}
            rules={{ required: 'Tipo de pagamento é obrigatório' }}
            render={({ field }) => (
              <select
                id="paymentType"
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

        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Adicionar
          </button>
        </div>
      </div>
    </form>
  );
}
