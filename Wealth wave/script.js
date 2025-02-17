const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  signDisplay: "always",
});

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

form.addEventListener("submit", addTransaction);

function animateNumber(targetId, targetValue, duration) {
  const element = document.getElementById(targetId);
  const startValue = 0;
  const endValue = parseFloat(targetValue);
  const increment = endValue / (duration / 60); // Adjust speed by changing duration
  let currentValue = startValue;

  function updateValue() {
    if (currentValue < endValue) {
      currentValue += increment;
      if (currentValue > endValue) currentValue = endValue; // Ensure we don't exceed the target
      element.textContent = `₹${currentValue.toFixed(2)}`;
      requestAnimationFrame(updateValue);
    } else {
      element.textContent = `₹${endValue.toFixed(2)}`;
    }
  }

  updateValue();
}

function updateTotal() {
  const incomeTotal = transactions
    .filter((trx) => trx.type === "income")
    .reduce((total, trx) => total + trx.amount, 0);

  const expenseTotal = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((total, trx) => total + trx.amount, 0);

  const balanceTotal = incomeTotal - expenseTotal;

  animateNumber("balance", balanceTotal, 2000); // Animate balance
  animateNumber("income", incomeTotal, 1500);  // Animate income
  animateNumber("expense", expenseTotal, 1500);  // Animate expense
}


function renderList() {
  list.innerHTML = "";

  status.textContent = "";
  if (transactions.length === 0) {
    status.textContent = "No transactions.";
    return;
  }

  transactions.forEach(({ id, name, amount, date, type }) => {
    const sign = "income" === type ? 1 : -1;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>

      <div class="amount ${type}">
        <span>${formatter.format(amount * sign)}</span>
      </div>
    
      <div class="action">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction(${id})">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    `;

    list.appendChild(li);
  });
}

renderList();
updateTotal();

function deleteTransaction(id) {
  const index = transactions.findIndex((trx) => trx.id === id);
  transactions.splice(index, 1);

  updateTotal();
  saveTransactions();
  renderList();
}

function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const enteredDate = new Date(formData.get("date"));
  const currentDate = new Date();

  // Check if entered date is in the future
  if (enteredDate > currentDate) {
    alert("Please enter a valid date. Future dates are not allowed.");
    return; // Stop the form submission
  }

  transactions.push({
    id: transactions.length + 1,
    name: formData.get("name"),
    amount: parseFloat(formData.get("amount")),
    date: enteredDate,
    type: "on" === formData.get("type") ? "income" : "expense",
  });

  this.reset();

  updateTotal();
  saveTransactions();
  renderList();
}


function saveTransactions() {
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  localStorage.setItem("transactions", JSON.stringify(transactions));
}
// Function to handle logout
function logout() {
  // Clear local storage or session storage (if you use them for user data)
  localStorage.clear(); // or sessionStorage.clear();
  
  // Optionally, you can make an API call to log the user out on the server side
  // Example: fetch('/logout', { method: 'POST' });
  
  // Redirect to the login page after logout
  window.location.href = "login.html"; // Change this to your actual login page URL
}
