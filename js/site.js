function getValues() {
  document.getElementById("tableCard").classList.add("invisible");
  let loanAmount = parseFloat(document.getElementById("loanAmount").value);
  let loanTerm = parseFloat(document.getElementById("loanTerm").value);
  let interestRate = parseFloat(document.getElementById("interestRate").value);

  if (
    Number.isInteger(loanAmount) &&
    Number.isInteger(loanTerm) &&
    Number.isInteger(interestRate)
  ) {
    let loanData = loanCalculation(loanAmount, loanTerm, interestRate);

    displayData(loanData, loanTotal);
  }
}

function loanCalculation(loanAmount, loanTerm, interestRate) {
  let loanData = [];

  let balance = loanAmount;
  let interestPayment = 0;
  let principalPayment = 0;
  let totalInterest = 0;

  let monthlyPayment =
    (loanAmount * (interestRate / 1200)) /
    (1 - (1 + interestRate / 1200) ** -Math.abs(loanTerm));

  for (let i = 1; i <= loanTerm; i++) {
    interestPayment = balance * (interestRate / 1200);
    principalPayment = monthlyPayment - interestPayment;
    totalInterest = totalInterest + interestPayment;
    loanTotal = loanAmount + totalInterest;
    remainingBalance = balance -= principalPayment;

    let data = {
      month: i,
      interestPayment: interestPayment.toFixed(2),
      principalPayment: principalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2),
      loanTotal: loanTotal.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
    };

    loanData.push(data);
  }

  document.getElementById(
    "monthlyPayment"
  ).innerHTML = `&dollar;${monthlyPayment.toFixed(2)}`;
  document.getElementById(
    "totalPrincipal"
  ).innerHTML = `&dollar;${principalPayment.toFixed(2)}`;
  document.getElementById("totalCost").innerHTML = `&dollar;${loanTotal.toFixed(
    2
  )}`;
  document.getElementById(
    "totalInterest"
  ).innerHTML = `&dollar;${totalInterest.toFixed(2)}`;
  return loanData;
}

function displayData(loanData) {
  let tableBody = document.getElementById("results");

  let templateRow = document.getElementById("lcTemplate");

  document.getElementById("tableCard").classList.remove("invisible");

  tableBody.innerHTML = "";

  for (let index = 0; index < loanData.length; index++) {
    let tableRow = document.importNode(templateRow.content, true);

    let rowCols = tableRow.querySelectorAll("td");

    rowCols[0].textContent = loanData[index].month;
    rowCols[1].textContent = loanData[index].monthlyPayment;
    rowCols[2].textContent = loanData[index].principalPayment;
    rowCols[3].textContent = loanData[index].interestPayment;
    rowCols[4].textContent = loanData[index].totalInterest;
    rowCols[5].textContent = loanData[index].remainingBalance;

    tableBody.appendChild(tableRow);
  }
}

function resetForm() {
  document.getElementById("btnReset").reset();
}
