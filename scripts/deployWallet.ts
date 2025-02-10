import { toNano } from '@ton/core';
import { Wallet } from '../wrappers/Wallet';
import { NetworkProvider } from '@ton/blueprint';
const  tonMnemonic = require( "tonweb-mnemonic");


export async function run(provider: NetworkProvider) {
    const mnemonic = await tonMnemonic.generateMnemonic();
    const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);
    function calculateWalletId(networkGlobalId: number, workChain: number, walletVersion: number, subwalletNumber: number): bigint {
        return (BigInt(networkGlobalId) << 96n) | 
               (BigInt(workChain) << 88n) | 
               (BigInt(walletVersion) << 80n) | 
               BigInt(subwalletNumber);
    }
    console.log(mnemonic)
    
    const walletId = calculateWalletId(0, 0, 0, 1);
    const publicKey = BigInt("0x" + Buffer.from(keyPair.publicKey).toString("hex"));




    const wallet = provider.open(await Wallet.fromInit(publicKey, walletId));


    await wallet.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(wallet.address);

    // run methods on `wallet`
}
