# Calculadora de Comissão - Studio 13

Uma aplicação web desenvolvida com Next.js e Tailwind CSS para calcular comissões de tatuadores do Studio 13 com base no tipo de pagamento. Esta é uma single page application (SPA) que permite o cálculo rápido e fácil das comissões sem a necessidade de armazenamento de dados.

## Funcionalidades

- Input de valor com máscara monetária brasileira
- Seleção do tipo de pagamento com taxas de comissão pré-configuradas
- Adição, edição e exclusão de entradas
- Cálculo automático de comissões
- Visualização detalhada de resultados
- Exportação para PDF (a ser implementado)
- Interface responsiva e moderna

## Tabela de Comissões

- DINHEIRO/TRANS/PIX: 60%
- Débito: 55,63%
- Crédito: 54,62%
- 2x S/Juros: 53,36%
- 3x S/Juros: 52,95%
- 4x S/Juros: 52,54%
- 5x S/Juros: 52,13%
- 6x S/Juros: 51,73%
- 7x S/Juros: 51,33%
- 8x S/Juros: 50,93%
- 9x S/Juros: 50,55%
- 10x S/Juros: 50,16%

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [React Number Format](https://github.com/s-yadav/react-number-format)
- [Heroicons](https://heroicons.com)

## Como Executar

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Deploy

Esta aplicação pode ser facilmente implantada na Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fstudio13-tattoo-calculator)
