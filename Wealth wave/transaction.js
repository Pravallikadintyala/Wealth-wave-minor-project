const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const list = document.getElementById("transactionList");
const status = document.getElementById("status");

function renderList() {
  list.innerHTML = "";
  status.textContent = "";

  if (transactions.length === 0) {
    status.textContent = "No transactions available.";
    return;
  }

  transactions.forEach(({ id, name, amount, date, type }) => {
    const sign = type === "income" ? 1 : -1;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>
      <div class="amount ${type}">
        <span>₹${(amount * sign).toFixed(2)}</span>
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

function deleteTransaction(id) {
  const index = transactions.findIndex((trx) => trx.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
    saveTransactions();
    renderList();
  }
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initial render of the transaction list
renderList();
