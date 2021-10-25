import { getMembers, getBeerStyles, getConsumptions } from './utilService';

// function to simulate a GET request
export const get = (URL) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(helper(URL))
    },2000)
  })
}

// helper function to route URL to data
const helper = (URL) => {

  if(URL === '/members') return getMembers();
  
  if(URL === '/beer-styles') return getBeerStyles();

  if(URL === '/consumptions') return getConsumptions()
}

export default {
  get
}