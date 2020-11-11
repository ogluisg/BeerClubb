import data from '../resources/data';

// function to get each unique member 
export const getMembers = () => {
    return [...new Set(data.map(({ member }) => { return member }))]
}

// function to get each beer-style
export const getBeerStyles = () => {
  
  let map = {};

  // helper function to increment the count of each beer-style 
  const sortBeer = (beerStyle, member) => {

    if(beerStyle === 'IPA') map[member].beers.IPA++;
    
    else if(beerStyle === 'Porter') map[member].beers.Porter++;
    
    else if(beerStyle === 'Stout') map[member].beers.Stout++;
  }

  // map each row's beer-style to a unique member
  data.map(({ beerStyle, member}) => {
    
    if(!map[member]){
      map[member] = { Member: member, beers: { IPA: 0, Porter: 0, Stout: 0 }}
      sortBeer(beerStyle, member)
    }
    else {
      sortBeer(beerStyle, member)
    }
  })
  return map;
}

// function to get each member's consumptions amount
export const getConsumptions = () => {

  let map = {};
    
  data.map(({ member }) => {

    if(!map[member]) return map[member] = { Consumption: 1 }
    
    return map[member].Consumption++;
  })
  return map;
}