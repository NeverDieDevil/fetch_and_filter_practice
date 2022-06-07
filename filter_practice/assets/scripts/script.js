function getData(){
  return fetch('https://api.punkapi.com/v2/beers').then(result => result.json());
 }
 function printBeer(beer){
   const tab = document.querySelector('tbody')
   const row = document.createElement('tr')
   for(const ele of beer){
     const cell = document.createElement('td');
     cell.textContent = ele;
     row.append(cell);
     tab.append(row);
  }
 }
 function printBeers(data){
   for(let i=0; i<15; i++){
     const beer = [data[i].id, 
                   data[i].name, 
                   data[i].first_brewed, 
                   (data[i].volume.value + ' ' + data[i].volume.unit),
                   data[i].ph];
     printBeer(beer);
   }
 }
 function filter(ind,id){
   const trs = document.querySelectorAll(`#myTable tr:not(.header)`);
   const filter = document.getElementById(id).value;
   const regex = new RegExp(filter, 'i');
   const isFoundInTds = td => regex.test(td.innerHTML);
   const isFound = childrenArr => childrenArr.some(isFoundInTds);
   const setTrStyleDisplay = ({ style, children }) => {
     style.display = isFound([
       children[ind] // <-- All columns
     ]) ? '' : 'none' 
   }
   console.log(trs);
   trs.forEach(setTrStyleDisplay)
 }
 async function app(){
   let beerData;
   beerData = await getData();
   printBeers(beerData);
 }
 
 app();