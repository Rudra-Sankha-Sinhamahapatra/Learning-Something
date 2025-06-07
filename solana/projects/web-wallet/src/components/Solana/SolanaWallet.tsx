import { Keypair } from "@solana/web3.js";
import CopyButton from "../CopyButton";
import { FaRegCopy } from "react-icons/fa";

interface SolanaWalletProps {
    solanaWallets: Keypair[]
}

const SolanaWallet = ({solanaWallets}:SolanaWalletProps) => {
  return (
   <div className="w-[80%] space-y-4 mt-4">
     {solanaWallets.map((wallet,idx) => (
      <div key={idx} className="bg-white rounded-lg p-4 shadow-md">
       <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">
          Wallet {idx+1}
        </h3>
        <CopyButton
          name={wallet.publicKey.toString()}
          label={<FaRegCopy/>}
          tooltipContent="Copy Address"
          className="text-gray-600"
        />
       </div>
       <p className="text-sm text-gray-600 break-all">
         {wallet.publicKey.toString()}
       </p>
      </div>
     ))}
   </div>
  )
}

export default SolanaWallet;