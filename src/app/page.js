'use client';

import { useState, useRef } from 'react';
import CommissionForm from '@/components/CommissionForm';
import ItemsList from '@/components/ItemsList';
import ResultTable from '@/components/ResultTable';
import EditItemModal from '@/components/EditItemModal';
import { ArrowPathIcon, CalculatorIcon } from '@heroicons/react/24/solid';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export default function Home() {
  const [items, setItems] = useState([]);
  const [calculationDone, setCalculationDone] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resultRef = useRef(null);
  const reportRef = useRef(null);

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

  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    
    try {
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50';
      notification.innerText = 'Gerando PDF...';
      document.body.appendChild(notification);
      
      const originalBackgroundColor = reportRef.current.style.backgroundColor;
      const originalColor = reportRef.current.style.color;
      
      const elementsToModify = reportRef.current.querySelectorAll('*');
      const originalStyles = [];
      
      elementsToModify.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        originalStyles.push({
          element: el,
          color: el.style.color,
          backgroundColor: el.style.backgroundColor
        });
        
        if (computedStyle.color === 'rgb(22, 163, 74)' || // verde
            computedStyle.color === 'rgb(220, 38, 38)') { // vermelho
        } else {
          el.style.color = '#000000';
        }
        
        if (el.tagName !== 'BUTTON') {
          el.style.backgroundColor = 'transparent';
        }
      });
      
      reportRef.current.style.backgroundColor = '#ffffff';
      reportRef.current.style.color = '#000000';
      
      const dataUrl = await toPng(reportRef.current, { quality: 0.95 });
      
      originalStyles.forEach(item => {
        item.element.style.color = item.color;
        item.element.style.backgroundColor = item.backgroundColor;
      });
      reportRef.current.style.backgroundColor = originalBackgroundColor;
      reportRef.current.style.color = originalColor;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.setFontSize(20);
      pdf.setTextColor(0, 0, 0); // Preto
      pdf.text('Relatório de Comissões - Studio 13', pdf.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
      pdf.addImage(dataUrl, 'PNG', 0, 25, pdfWidth, pdfHeight);
      
      pdf.save('comissoes-studio13.pdf');
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 2000);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen w-full h-full bg-gray-100 flex flex-col items-center justify-center align-center">
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
            <div ref={reportRef}>
              <ItemsList 
                items={items} 
                onDeleteItem={handleDeleteItem} 
                onEditItem={handleEditItem}
                calculationDone={calculationDone}
              />
              
              {calculationDone && (
                <div ref={resultRef}>
                  <ResultTable items={items} onExportPdf={handleExportPdf} />
                </div>
              )}
            </div>
            
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
              ) : null}
              
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
