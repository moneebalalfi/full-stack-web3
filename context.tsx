import { createContext, FC, ReactNode, useContext, useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

interface AccountContextInterface {
  account: string | undefined;
  connect: () => void;
}

export const AccountContext = createContext<AccountContextInterface>(
  {} as AccountContextInterface
);

export function AccountProvider({ children }) {
  const [account, setAccount] = useState<string>();

  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            /*  
             https://infura.io/
             high availability APIs and Developer Tools provide quick, reliable access to the Ethereum and IPFS networks
            */
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
          },
        },
      },
    });

    return web3Modal;
  }

  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();

      // Signin user
      setAccount(accounts[0]);
    } catch (error) {
      console.log("Connecting error: ", error);
    }
  }

  return (
    <AccountContext.Provider value={{ account, connect }}>
      {children}
    </AccountContext.Provider>
  );
}

export const useAccount = () => useContext(AccountContext);
