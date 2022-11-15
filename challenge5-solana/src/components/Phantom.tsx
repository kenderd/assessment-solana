//Haven't Put error handlers yet



import React from 'react';
import "../css/Buttons.css"
import { WithoutProviderWalletKey, WithProviderNoWalletKey, WithProviderWalletKey } from './buttons';
import {
  PublicKey,
  Transaction,
  Keypair,
  LAMPORTS_PER_SOL,
  Connection,
  clusterApiUrl,
  SystemProgram,
  sendAndConfirmTransaction

} from "@solana/web3.js";
import { useState,useEffect } from 'react';
import {Buffer} from 'buffer';
window.Buffer = Buffer;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// create types
type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

// create a provider interface (hint: think of this as an object) to store the Phantom Provider
 interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
  newKey: PublicKey | null;
}

/**
 * @description gets Phantom provider, if it exists
 */
 const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomProvider;
  }
};




const Phantom = () => {
 let from: Keypair;


const createNewAccount = async () => {

  from = Keypair.generate();
  //Generate Keypair

  

  console.log("Keypair Generated");
 
  //AIRDROP 2 SOLs to created Account
    const fromAirDropSignature = await connection.requestAirdrop(
    //@ts-ignore
    from.publicKey,
    2 * LAMPORTS_PER_SOL
  );
//Confirm Transaction
  let latestBlockHash = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: fromAirDropSignature,
  });
  
  console.log("Airdrop 2 SOLs to Created Wallet!")
 
  //@ts-ignore
  console.log(`New Keypair Public Key ${from.publicKey}`)

}



const transferSOL = async () => {  var transaction = new Transaction().add(
    SystemProgram.transfer({

      fromPubkey: from.publicKey,
      //@ts-ignore
      toPubkey: new PublicKey(walletKey.toString()),
      lamports: 1.9 * LAMPORTS_PER_SOL,
    })

    
  );


var signature = await sendAndConfirmTransaction(connection, transaction, [
    from,
  ]);

  console.log("AIRDROP Success! Check your wallet.")
  console.log("Signature is ", signature);
}




  // create state variable for the provider
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );

	// create state variable for the wallet key
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
  undefined
  );




  


  useEffect(() => {
	  const provider = getProvider();

		// if the phantom provider exists, set this as the provider
	  if (provider) setProvider(provider);
	  else setProvider(undefined);
  }, []);


const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

		// checks if phantom wallet exists
    if (solana) {
      try {
				// connects wallet and returns response which includes the wallet public key
        const response = await solana.connect();
        console.log('wallet account ', response.publicKey.toString());
		setWalletKey(response.publicKey.toString());
       // @ts-ignore: Object is possibly 'null'.
      document.getElementById("responsetext").innerHTML = "Wallet Connected. Your Key is:  " +walletKey.toString();

      } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };


 const disconnectWallet = async () => {
     // @ts-ignore


// checks if phantom wallet exists
 try {
     
         setWalletKey(undefined);
         // @ts-ignore: Object is possibly 'null'.
       document.getElementById("responsetext").innerHTML = "Connect Your Wallet.";
       } catch (err) {
       // { code: 4001, message: 'User rejected the request.' }
    }
     }


    return <main>
       {!provider && !walletKey &&(<WithoutProviderWalletKey/>)}
   
       
       {provider && !walletKey &&(WithProviderNoWalletKey(connectWallet))}
      
       {provider && walletKey &&(WithProviderWalletKey(createNewAccount,disconnectWallet,walletKey.toString(),transferSOL,))}
     
     
  
     
   
        

    </main>
}

export default Phantom;







//