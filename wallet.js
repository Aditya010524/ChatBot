document.addEventListener("DOMContentLoaded", async () => {
    const connectWalletButton = document.getElementById("connect-wallet");
    const walletAddressSpan = document.getElementById("wallet-address");
  
    async function connectWallet() {
      const provider = await detectEthereumProvider();
      
      if (provider) {
        try {
          const accounts = await provider.request({ method: "eth_requestAccounts" });
          walletAddressSpan.innerText = `Wallet: ${accounts[0]}`;
        } catch (error) {
          console.error("Wallet connection error:", error);
          walletAddressSpan.innerText = "Wallet: Connection Failed";
        }
      } else {
        alert("MetaMask is installed but not injected. Try restarting your browser.");
      }
    }
  
    async function detectEthereumProvider() {
      return new Promise((resolve) => {
        if (window.ethereum) {
          resolve(window.ethereum);
        } else {
          let interval = setInterval(() => {
            if (window.ethereum) {
              clearInterval(interval);
              resolve(window.ethereum);
            }
          }, 100);
          setTimeout(() => {
            clearInterval(interval);
            resolve(null);
          }, 3000); // Wait 3 seconds before giving up
        }
      });
    }
  
    connectWalletButton.addEventListener("click", connectWallet);
  });
  
