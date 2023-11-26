document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById("connectButton");
  const sendMoneyBtn = document.getElementById("sendMoneyBtn");
  const walletID = document.getElementById("walletID");
 
  if (connectButton) {
      connectButton.addEventListener("click", () => {
          if (typeof window.ethereum !== "undefined") {
              ethereum
                 .request({ method: "eth_requestAccounts" })
                 .then((accounts) => {
                     const account = accounts[0]
                     walletID.innerHTML = `Wallet connected: ${account}`;
                 })
                 .catch((error) => {
                     console.log(error, error.code);
                 });
          } else {
              window.open("https://metamask.io/download/", "_blank");
          }
      });
  } else {
    console.log("wallet not found bro........")
  }
 
  if (sendMoneyBtn) {
      sendMoneyBtn.addEventListener("click", () => {
          if (typeof window.ethereum !== "undefined") {
              const receiverAddress = '0x5923203a92ABa3Eb92940F42f6eB5267BA377D5f';
 
              ethereum
                .request({
                   method: 'eth_sendTransaction',
                   params: [{
                       from: walletID.innerHTML.split(': ')[1],
                       to: receiverAddress,
                       value: '10000000000000',
                       gas: '21000', // Gas limit
                   }],
                })
                .then((result) => {
                   console.log('Transaction successful', result);
                })
                .catch((error) => {
                   console.log('Transaction failed', error);
                });
          } else {
              window.open("https://metamask.io/download/", "_blank");
          }
      });
  } else {
    console.log("i dont know why its not transfering crypto...")
  }
 });