import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/wallet.tact',
    options: {
        debug: true,
        external: true
    },
};
