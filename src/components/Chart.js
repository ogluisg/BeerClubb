import React from 'react';

import Chart from "react-google-charts";
import Spinner from './Spinner'; 

const buildChart = (data) => {
    return(
        <Chart
        chartType="PieChart"
        height={'250px'}
        options={{chartArea: {width: '60%', height:'100%', left:0}}}
        loader={Spinner()}
        data={data}
      />
    )
}

export default buildChart;