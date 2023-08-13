document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get("total", function (budget) {
    const totalElement = document.getElementById("total");
    totalElement.textContent = budget.total || "0 USD";
  });

  const spendButton = document.getElementById("spend");
  const currency = " USD";
  spendButton.addEventListener("click", function () {
    chrome.storage.sync.get("total", function (budget) {
      let newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      const amountInput = document.getElementById("amount");
      let amount = amountInput.value;
      if (amount) {
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({ total: newTotal });

      const totalElement = document.getElementById("total");
      totalElement.textContent = newTotal + currency;
      amountInput.value = "";
    });
  });

  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", function () {
    chrome.storage.sync.remove("total", function () {
      const totalElement = document.getElementById("total");
      totalElement.textContent = "0" + currency;
    });
  });
});
