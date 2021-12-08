function getValues() {
  document.getElementById("tableCard").classList.add("invisible");
  let loanAmount = parseFloat(document.getElementById("loanAmount").value);
  let loanTerm = parseFloat(document.getElementById("loanTerm").value);
  let interestRate = parseFloat(document.getElementById("interestRate").value);

  let loanData = loanCalculation(loanAmount, loanTerm, interestRate);

  displayData(loanData);
}

function loanCalculation(loanAmount, loanTerm, interestRate) {
  let loanData = {};

  let balance = loanAmount;
  let interestPayment = 0;
  let principalPayment = 0;
  let totalInterest = 0;

  let monthlyPayment =
    (loanAmount * (interestRate / 1200)) /
    (1 - (1 + interestRate / 1200) ** -Math.abs(loanTerm));

  for (let currentMonth = 0; currentMonth <= loanTerm; currentMonth++) {
    interestPayment = balance * (interestRate / 1200);
    principalPayment = monthlyPayment - interestPayment;
    totalInterest = totalInterest + interestPayment;
    remainingBalance = balance - principalPayment;

    loanTotal = balance + totalInterest;
    loanData.interestPayment = interestPayment.toFixed(2);
    loanData.principalPayment = principalPayment.toFixed(2);
    loanData.totalInterest = totalInterest.toFixed(2);
    loanData.remainingBalance = remainingBalance.toFixed(2);
    loanData.loanTotal = loanTotal.toFixed(2);
    loanData.monthlyPayment = monthlyPayment.toFixed(2);
  }

  return loanData;
}

function displayData(loanData) {
  document.getElementById(
    "monthlyPayment"
  ).innerHTML = `&dollar;${loanData.monthlyPayment}`;
  document.getElementById(
    "totalPrincipal"
  ).innerHTML = `&dollar;${loanData.principalPayment}`;
  document.getElementById(
    "totalCost"
  ).innerHTML = `&dollar;${loanData.loanTotal}`;
  document.getElementById(
    "totalInterest"
  ).innerHTML = `&dollar;${loanData.totalInterest}`;
}

function resetForm() {
  document.getElementById("btnReset").reset();
}
