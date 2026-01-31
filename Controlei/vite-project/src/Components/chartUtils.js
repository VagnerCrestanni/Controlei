/* Uso o chartUtils.js para transformar os dados brutos vindos do banco de dados para o 
formato de graficos, seria código repetido em DashboardGraph e HistoricalGraph, assim
consigo reutilizar o que eu preciso sem ficar repetindo código */
export function getLastMonthsData(allYearData, period) {        //Essa função calcula alem dos meses os anos quando precisar.
  const sortedYears = Object.keys(allYearData).sort();
  return sortedYears.flatMap(year =>
    Object.entries(allYearData[year].months).map(([month, data]) => ({
      label: `${month}/${year.slice(-2)}`,
      Receita: data.Income || 0,
      Despesa: data.Expenses || 0,
      Investimento: data.Investments || 0,
    }))
  ).slice(-period);
}

export function buildLabels(chartData) {                        //Gerar os labels do gráfico
  return chartData.map(item => item.label);
}

export function buildDatasets(chartData) {                      //Gerar os datasets do gráfico
  return [
    {
      label: 'Receita',
      data: chartData.map(i => i.Receita),
      backgroundColor: '#4BC0C0',
      borderColor: '#4BC0C0',
      tension: 0.4,
    },
    {
      label: 'Despesa',
      data: chartData.map(i => i.Despesa),
      backgroundColor: '#FF6384',
      borderColor: '#FF6384',
      tension: 0.4,
    },
    {
      label: 'Investimento',
      data: chartData.map(i => i.Investimento),
      backgroundColor: '#36eb36ff',
      borderColor: '#36eb36ff',
      tension: 0.4
    },
  ];
}