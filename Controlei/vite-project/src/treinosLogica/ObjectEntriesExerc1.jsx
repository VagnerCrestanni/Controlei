
//Com base na atividade de ObjectKeysExerc1, onde foi criado uma tabela com anos e os valores totais de receita, despesa e investiento
//Agora sera adicionado os meses e seus valores usando os mesmos dados vindos de dadosFake.jsx

//o que eu preciso estudar: object.entries + map e fragment do react

import React from 'react'
import { historico } from './dadosFake';

export default function ObjectEntriesExerc1() {
  return (
     <table>
      <thead>
        <tr>
          <th> Ano </th>
        </tr>
      </thead>
        <tbody>
          {Object.entries(historico).map(([ano, dadosAno])=> (
            <React.Fragment key={ano}>
              <tr>
                <td>{ano}</td>
                <td>{dadosAno.total.receita}</td>
                <td>{dadosAno.total.despesa}</td>
                <td>{dadosAno.total.investimento}</td>
              </tr>

              {Object.entries(dadosAno.meses).map(([mes, dadosMes])=> (
                <tr key={mes}>
                  <td>{mes}</td>
                  <td>{dadosMes.receita}</td>
                  <td>{dadosMes.despesa}</td>
                  <td>{dadosMes.investimento}</td>
                </tr>
              
              ))}
             
              </React.Fragment>
          )
        )}
        </tbody>
     </table>
  );
};

//resumo de aprendizado:
  //Um Object.entries consegue ler tanto a chave do objeto quanto o seu valor, então assim eu consigo pegar os valores da variavel historico
  //mapea-los pegando cada ano com suas chaves e seus valores, e crio objeto dadosAno que vai conseguir pegar os objetos de meses e fazer a mesma coisa, ou seja
  // vai mapear os dados de meses, lendo mes a mes usando a key, e mostrar os dados dos meses dentro da tabela