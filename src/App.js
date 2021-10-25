import React, { useState, useEffect } from 'react';

import ApiService from './services/apiService';
import Spinner from './components/Spinner'
import Chart from './components/Chart';

import './App.css';
import apiService from './services/apiService';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState('')
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
      setup()
  },[])

  // function to setup the main component by fetching data from api
  const setup = async () => {
  
    try {

      setLoading(true);

      const consumptions = await apiService.get('/consumptions')

      const members = await ApiService.get('/members')
  
      const beerStyles =  await ApiService.get('/beer-styles')

      handleMerge(members, consumptions, beerStyles)

      setLoading(false)

    } catch (error) {
      console.log(`Error fetching data from API ${error}`)
    }
  }

  // function to handle merging data coming from all 3 endpoints (members, beer-styles, consumptions)
  const handleMerge = (members, consumptions, beerStyles) => {
    let mergedData = [];

    members.map((member) => {
      mergedData.push({Member: member, Consumption: consumptions[member].Consumption, beerStyles: [['Beer Style','Consumption'],...Object.entries(beerStyles[member].beers)]})
    })
    
    setData(mergedData)

    setSelectedUser(mergedData[0])
  }

  // function to render the table data
  const renderData = () => {

    if(loading) return Spinner();

    return (
      <table className="table table-bordered">
          <thead>
            <tr>
              <th>Person</th>
              <th>Consumption</th>
            </tr>
          </thead>
        <tbody>
            {data.map((row, index) => {
                return (
                    <tr key={index} onClick={() => {setSelectedUser(row)}}>
                      <td>{row.Member}</td>
                      <td>{row.Consumption}</td>
                   </tr>
                )
            })}
        </tbody>
      </table>
    )
  }

  // function to render the google chart 
  const renderChart = () => {

    if(loading) return Spinner();

    return Chart(selectedUser.beerStyles)
  }


  // function to render the header
  const renderHeader = () => {
    return (
      <>
      <h1>Data Analysis for Beer Club</h1>
      <p className="bg-light p-2 mb-0">Consumptions per member: Beer consumed by {loading ? Spinner(true) : selectedUser.Member}</p>
      </>
    )
  }

  return (

      <div className="container pt-2">

        {renderHeader()}

        <div className='row'>

            <div className='col-3'>

              {renderData()}

            </div>

            <div className='col m-5'>

              {renderChart()}

            </div>

        </div>

      </div>
  );
}

export default App;
