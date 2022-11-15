import React from "react";
import "../css/Buttons.css"





export function WithoutProviderWalletKey () {

return (<button className='buttonClass'><h3>
    <a href="https://phantom.app" target={"_blank"} rel="noreferrer" >No Provider Detected. Install Phantom Wallet Here.</a>
    </h3>
    </button>)
}


export function WithProviderNoWalletKey (connectWallet: React.MouseEventHandler<HTMLButtonElement> | undefined) {

return (<section><button onClick={connectWallet} className='buttonClass'><h3>Connect to Phantom Wallet</h3></button>
       <h4 id="responsetext">Connect Your Wallet.</h4></section>)
}


export function WithProviderWalletKey (createacc: React.MouseEventHandler<HTMLButtonElement>,disconnectWallet: React.MouseEventHandler<HTMLButtonElement> | undefined, walletkey:String,transferSOL: React.MouseEventHandler<HTMLButtonElement>) {

return (<section>
       <button onClick={createacc} className='buttonClass'><h3>Create a New Solana Account</h3></button>
       <button onClick={disconnectWallet} className='buttonClass'><h3>Disconnect Phantom Wallet</h3></button>
       <button onClick={transferSOL} className='buttonClass'><h3>Transfer to New Wallet</h3></button>
       <h4>Connected. Your Wallet Key is: {walletkey}</h4>
       </section>)
}