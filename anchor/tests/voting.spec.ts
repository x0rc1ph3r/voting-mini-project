import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction} from '@solana/web3.js'
import {Voting} from '../target/types/voting'
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from '@solana/spl-token'

describe('voting', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const pollAddress = new PublicKey("HWacFETcD1qMukgQ2eSZpK86mPS3HUNxSDySrPnXx4qe")

  const connection = provider.connection;

  const program = anchor.workspace.Voting as Program<Voting>

  const votingKeypair = Keypair.generate()

  it('Initialize Candidate', async () => {
    // await program.methods
    //   .initialize()
    //   .signers([payer.payer])
    //   .rpc()
      
    const candidateInfo = getAssociatedTokenAddressSync(
      new PublicKey("24MejQPSucVCS9gvuJ9TZ1RVvPV3ErnyVpJrD4kggNRf"),
      pollAddress,
      true
    )

    console.log("Candidate Account: ", candidateInfo.toBase58());

    // const currentCount = await program.account.candidate.fetch(candidateInfo);

    // expect(currentCount.authority).toEqual(payer.publicKey);

    // const instruction = SystemProgram.transfer({
    //   fromPubkey: payer.publicKey,
    //   toPubkey: votingKeypair.publicKey,
    //   lamports: 10 * LAMPORTS_PER_SOL,
    // })

    // const transaction = new Transaction
    // transaction.add(instruction)
    // const signature = await sendAndConfirmTransaction(connection, transaction, [payer.payer]);
  })

  // it('UpVoting', async () => {
  //   const [candidateAccount] = PublicKey.findProgramAddressSync(
  //     [payer.publicKey.toBuffer()],
  //     program.programId
  //   )

  //   await program.methods
  //     .upvote()
  //     .accounts({
  //       candidateAccount,
  //       signer: votingKeypair.publicKey
  //     })
  //     .signers([votingKeypair])
  //     .rpc()

      
  //   const [candidateInfo] = PublicKey.findProgramAddressSync(
  //     [payer.publicKey.toBuffer()],
  //     program.programId
  //   )

  //   const currentCount = await program.account.candidate.fetch(candidateInfo);

  //   console.log(currentCount.upvotes.toNumber());
  //   expect(currentCount.upvotes.toNumber()).toEqual(1);
  // })

  // it('DownVoting', async () => {

  //   const [candidateAccount] = PublicKey.findProgramAddressSync(
  //     [payer.publicKey.toBuffer()],
  //     program.programId
  //   )

  //   await program.methods
  //     .downvote()
  //     .accounts({
  //       candidateAccount,
  //       signer: votingKeypair.publicKey
  //     })
  //     .signers([votingKeypair])
  //     .rpc()

      
  //   const [candidateInfo] = PublicKey.findProgramAddressSync(
  //     [payer.publicKey.toBuffer()],
  //     program.programId
  //   )

  //   const currentCount = await program.account.candidate.fetch(candidateInfo);

  //   console.log(currentCount.downvotes.toNumber());
  //   expect(currentCount.downvotes.toNumber()).toEqual(1);
  // })
})
