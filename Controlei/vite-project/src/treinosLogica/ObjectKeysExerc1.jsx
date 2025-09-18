//objetivo dessa etapa: renderizar na tela uma tabela de anos, com os valores de receita, despesa e investimentos
// com base em {historico} vindo de dadosfake.jsx.

import React from 'react'
import { historico } from "./dadosFake";
 
export default function ObjectKeysExerc1() {
  return (
    <table>
      <thead>
        <tr>
          <th> Ano </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(historico).map((ano)=> 
          <tr key={ano}>
            <td>{ano}</td>
              <td>{historico[ano].total.receita}</td>
              <td>{historico[ano].total.despesa}</td>
              <td>{historico[ano].total.investimento}</td>
          </tr>
      )
        }
      </tbody>
    </table>
  );
}

//resumo de aprendizado:
  //Com as keys eu consigo identificar o ano dentro de uma lista de valores e uso .map para mapear cada ano e usar uma key para passar os valores de cada ano 
  //de forma separada.
  //Também aprendi os conceitos para criar uma tabela dentro do javaScript, onde temos os elementos:
  //<table> que é a tabela em si
  //<thead> que é o cabeçalho da tabela
  //<tr> que define uma linha datable 
  //<TD> que difine o elemento dentro dessa linha