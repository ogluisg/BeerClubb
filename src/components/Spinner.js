import React from 'react';

import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';

const buildSpinner = (small = false) => {

    if(small) return  <Spinner color='#2592A7' size={10} animating={true}/>

    return (
      <div className={small ? "m-2" : 'm-5'}>
          <Spinner style={{marginLeft: 20}} color='#2592A7' size={100} animating={true}/>
       </div>
    )
  }


  export default buildSpinner;