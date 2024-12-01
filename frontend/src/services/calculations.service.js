import httpClient from '../http-common';

const simulation = (loanAmount, anualInterestRate, termInYears) => {
    const url = `/calculations/simulate?P=${loanAmount}&r=${anualInterestRate}&n=${termInYears}`;
    return httpClient.get(url); 
}

export default { simulation };