// Define wallet addresses for each crypto
const walletData = {
  "usdt-eth": {
    address: "0x216696817bAF598Fa4cC4461AEB3CB34476E52Dc",
    qr: "qr-usdt-eth.png"  // local image
  },
  "usdt-bin": {
    address: "0x216696817bAF598Fa4cC4461AEB3CB34476E52Dc",
    qr: "qr-usdt-binance.png"   // local image
  },
  "usdt-tron": {
    address: "TAx9KbxS2qh7mwafC3VX6gCGJP8tWVaK9R",
    qr: "qr-usdt-tron.png"   // local image
  },
  "btc": {
    address: "bc1qaq2ffv87mmn9jhud60s8zhnk5ycguk2umxjcxt",
    qr: "qr-btc.png"   // local image
  },
  "eth": {
    address: "0x216696817bAF598Fa4cC4461AEB3CB34476E52Dc",
    qr: "qr-eth.png"   // local image
  },
  "trx": {
    address: "TAx9KbxS2qh7mwafC3VX6gCGJP8tWVaK9R",
    qr: "qr-trx.png"   // local image
  }
};


// Elements
const cryptoSelect = document.getElementById("crypto");
const qrImg = document.getElementById("qr-code");
const addressText = document.querySelector(".address");
const copyBtn = document.getElementById("copy-btn");
const submitBtn = document.getElementById("submit-btn");
const amountInput = document.getElementById("amount");

// create and insert inline error message for amount
let amountError = document.querySelector('.amount-error');
if (!amountError) {
  amountError = document.createElement('div');
  amountError.className = 'amount-error';
  amountError.style.color = 'red';
  amountError.style.fontSize = '0.9rem';
  amountError.style.marginTop = '6px';
  amountInput.insertAdjacentElement('afterend', amountError);
}

function validateAmount() {
  const value = parseFloat(amountInput.value);
  if (isNaN(value) || value <= 9.99) {
    amountError.textContent = 'Amount must be greater than 10 USD';
    submitBtn.disabled = true;
    return false;
  } else {
    amountError.textContent = '';
    submitBtn.disabled = false;
    return true;
  }
}

// Update address and QR when user changes selection
cryptoSelect.addEventListener("change", () => {
  const selected = cryptoSelect.value;
  const data = walletData[selected];
  qrImg.src = data.qr;
  addressText.innerText = data.address;
});

// validate while typing
amountInput.addEventListener('input', validateAmount);

// Copy wallet address
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(addressText.innerText);
  alert("Address copied to clipboard!");
});

// Submit form
submitBtn.addEventListener("click", (e) => {
  e.preventDefault && e.preventDefault();

  const stakeId = document.getElementById("stake-id").value;
  const wallet = document.getElementById("wallet-address").value;
  const amount = document.getElementById("amount").value;

  if (!stakeId || !wallet || !amount) {
    alert("Please fill in all fields.");
    return;
  }

  // enforce amount > 10 on submit
  if (!validateAmount()) {
    amountInput.focus();
    return;
  }

  // Redirect to the "payment received" page and pass the amount
  const params = new URLSearchParams({ amount });
  window.location.href = `received.html?${params.toString()}`;
});

// init: validate and set initial state
validateAmount();

