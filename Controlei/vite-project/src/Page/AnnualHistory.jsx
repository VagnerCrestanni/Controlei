import React from 'react'
import Sidebar from '../Components/Sidebar'
import "./AnnualHistory.css"

const AnnualHistory = () => {
  return (
    <div className="AnnualHistory-container">
      <Sidebar />
      <main className="AnnualHistory-content">
        <h1>Histórico Anual</h1>
      </main>
    </div>
  )
}

export default AnnualHistory
