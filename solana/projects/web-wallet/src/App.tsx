
import { useState } from 'react'
import './App.css'
import { Keypair } from '@solana/web3.js';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { derivePath } from 'ed25519-hd-key';
import nacl from "tweetnacl"
import Hero from './components/Hero';
import Button from './components/Button';
import SolanaWallet from './components/Solana/SolanaWallet';
import * as bip39 from "bip39"

function App() {
  const [mnemonic,setMnemonic] = useState<string>("");
  const [solanaIdx,setSolanaIdx] = useState<number>(0);
  const [solanaWallets,setSolanaWallets] = useState<Keypair[]>([]);

  const getMnemonic = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
  };

  const generateSolanaWallet = async (mnemonic: string) => {
    if(!mnemonic) {
      toast.error("Please generate a mnemonic first");
      return;
    }

    try {
      if(!bip39.validateMnemonic(mnemonic)) {
        toast.error("Invalid mnemonic");
        return;
      } 
      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${solanaIdx}'/0'`;
      const derivedSeed = derivePath(path,seed.toString('hex')).key;
      const keyPair = nacl.sign.keyPair.fromSeed(
        new Uint8Array(derivedSeed.slice(0,32))
      );

      const wallet = Keypair.fromSecretKey(keyPair.secretKey);

      setSolanaIdx(solanaIdx + 1);
      setSolanaWallets([...solanaWallets,wallet]);
      toast.success("Wallet generated successfully");

      console.log('Generated wallet address:', wallet.publicKey.toString());
    } catch (error) {
      toast.error("Failed to generate wallet");
    }
  }

  return (
    <>
     <div className='flex w-full min-h-screen items-center flex-col bg-zinc-900'>
      <Hero/>
       <div className='w-[80%] space-y-4'>
         <Button
         className='w-full py-2'
         name='Generate Mnemonic'
         onClick={getMnemonic}
         />
         <div className='flex gap-2'>
          <input 
            className='flex-1 py-2 px-4 rounded outline-none text-white'
            value={mnemonic}
            readOnly
            placeholder='Your mnemonic will appear here ...'
          />
          <Button
          className='py-2 px-4'
          name='Generate  Wallet'
          onClick={()=> generateSolanaWallet(mnemonic)}
          />
         </div>
       </div>
       <SolanaWallet solanaWallets={solanaWallets}/>
       <ToastContainer/>
     </div>
    </>
  )
}

export default App
