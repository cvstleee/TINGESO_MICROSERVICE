import httpClient from '../http-common';

const simulation = (loanAmount, anualInterestRate, termInYears) => {
    const url = `/calculations/simulate?P=${loanAmount}&r=${anualInterestRate}&n=${termInYears}`;
    return httpClient.get(url); 
}

//falta la id 
//const totalCost = (id, loanAmount, anualInterestRate, termInYears) => {
    //const url = `/calculations/calculateTotalCost/P=${loanAmount}&r=${anualInterestRate}&n=${termInYears}`;
  //  return httpClient.get(url); 
//}

/**const totalCost = (id, creditAmount, interestRateYear, deadline) => {
    return httpClient.put(`/calculations/calculateTotalCost/${id}`, {
        params: { creditAmount, interestRateYear, deadline }
    });
}**/

const totalCost = (id, params) => {
    const url = `/calculations/calculateTotalCost/${id}?${params.toString()}`;
    return httpClient.post(url, null); // Asumiendo que httpClient tiene un método put
};

export default { simulation, totalCost};