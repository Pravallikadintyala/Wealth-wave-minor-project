const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const list = document.getElementById("transactionList");
const status = document.getElementById("status");

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
        `;

        list.appendChild(li);
    });
}

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    signDisplay: "always",
});

renderList();
