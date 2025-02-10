import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Wallet } from '../wrappers/Wallet';
import '@ton/test-utils';

describe('Wallet', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let wallet: SandboxContract<Wallet>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        wallet = blockchain.openContract(await Wallet.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await wallet.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: wallet.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
      
    });
});
