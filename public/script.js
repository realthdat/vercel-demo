function checkCardholderInfo() {
  const bankName = document.getElementById("bank-name").value.trim();
  const accountNumber = document.getElementById("account-number").value.trim();
  const resultDiv = document.getElementById("result");

  if (!bankName || !accountNumber) {
    resultDiv.innerHTML = "Vui lòng nhập đầy đủ tên ngân hàng và số tài khoản.";
    resultDiv.style.color = "red";
    return;
  }

  // Send a POST request to the backend
  fetch("/api/check-card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bankName, accountNumber }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        resultDiv.innerHTML = `Tên chủ thẻ: ${data.cardholder_name}`;
        resultDiv.style.color = "green";
      } else {
        resultDiv.innerHTML = data.message;
        resultDiv.style.color = "red";
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = "Có lỗi xảy ra.";
      resultDiv.style.color = "red";
    });
}
