'use client';

import { useState, useRef } from 'react';
import CommissionForm from '@/components/CommissionForm';
import ItemsList from '@/components/ItemsList';
import ResultTable from '@/components/ResultTable';
import EditItemModal from '@/components/EditItemModal';
import { ArrowPathIcon, CalculatorIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [items, setItems] = useState([]);
  const [calculationDone, setCalculationDone] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resultRef = useRef(null);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveEditedItem = (updatedItem) => {
    setItems(items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleCalculate = () => {
    setCalculationDone(true);
    
    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReset = () => {
    setItems([]);
    setCalculationDone(false);
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleExportPdf = () => {
    alert("A funcionalidade de exportar para PDF será implementada posteriormente.");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Calculadora de Comissão - Studio 13</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Calcule as comissões de tatuagens com base no tipo de pagamento
          </p>
        </div>

        <CommissionForm onAddItem={handleAddItem} />
        
        {items.length > 0 && (
          <>
            <ItemsList 
              items={items} 
              onDeleteItem={handleDeleteItem} 
              onEditItem={handleEditItem}
              calculationDone={calculationDone}
            />
            
            <div className="flex flex-col sm:flex-row justify-center mt-4 gap-4">
              {!calculationDone ? (
                <button
                  onClick={handleCalculate}
                  disabled={items.length === 0}
                  className={`flex items-center justify-center px-4 py-2 ${
                    items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  <CalculatorIcon className="h-5 w-5 mr-2" />
                  Calcular
                </button>
              ) : (
                <div ref={resultRef} className="w-full">
                  <ResultTable items={items} onExportPdf={handleExportPdf} />
                </div>
              )}
              
              <button
                onClick={handleReset}
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Reiniciar
              </button>
            </div>
          </>
        )}

        <EditItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={editingItem}
          onSave={handleSaveEditedItem}
        />
      </div>
    </div>
  );
}
