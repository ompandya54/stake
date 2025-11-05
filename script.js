
// Define wallet addresses for each crypto
const walletData = {
  usdt: {
    address: "0x5792b30269ec13d36e1419e0116fcafbb12ce44e",
    qr: "qr-usdt.png"  // local image
  },
  btc: {
    address: "1BDJh5UiFXHPztAbdV6Tgs496jCHvJHNwe",
    qr: "qr-btc.png"   // local image
  },
  eth: {
    address: "0x5792b30269ec13d36e1419e0116fcafbb12ce44e",
    qr: "qr-eth.png"   // local image
  }
};


// Elements
const cryptoSelect = document.getElementById("crypto");
const qrImg = document.getElementById("qr-code");
const addressText = document.querySelector(".address");
const copyBtn = document.getElementById("copy-btn");
const submitBtn = document.getElementById("submit-btn");

// Update address and QR when user changes selection
cryptoSelect.addEventListener("change", () => {
  const selected = cryptoSelect.value;
  const data = walletData[selected];
  qrImg.src = data.qr;
  addressText.innerText = data.address;
});

// Copy wallet address
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(addressText.innerText);
  alert("Address copied to clipboard!");
});

// Submit form
submitBtn.addEventListener("click", () => {
  const stakeId = document.getElementById("stake-id").value;
  const wallet = document.getElementById("wallet-address").value;
  const amount = document.getElementById("amount").value;

  if (!stakeId || !wallet || !amount) {
    alert("Please fill in all fields.");
    return;
  }

  alert("Submission successful!");
});

