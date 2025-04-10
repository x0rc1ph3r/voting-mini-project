'use client'

import { Keypair, PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useVotingProgram, useVotingProgramAccount } from './voting-data-access'

export function VotingCreate() {
  const { initialize } = useVotingProgram()
  const [candidateName, setCandidateName] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder='Candidate Name'
        value={candidateName}
        onChange={(e) => { setCandidateName(e.target.value) }}
        className='input input-bordered w-full max max-w-xs'
      />
      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={() => initialize.mutateAsync({ candidateName })}
        disabled={initialize.isPending}
      >
        Create {initialize.isPending && '...'}
      </button>
    </div>
  )
}

export function VotingList() {
  const { accounts, getProgramAccount } = useVotingProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <VotingCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function VotingCard({ account }: { account: PublicKey }) {
  const { accountQuery, upvoteMutation } = useVotingProgramAccount({
    account,
  })

  const upvotes = useMemo(() => accountQuery.data?.votes ?? 0, [accountQuery.data?.votes]);
  const candidate = useMemo(() => accountQuery.data?.name ?? 0, [accountQuery.data?.name]);

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2 className="card-title justify-center text-3xl cursor-pointer" onClick={() => accountQuery.refetch()}>
            {candidate.toString()}
          </h2>
          <h2 className="card-title justify-center text-3xl cursor-pointer" onClick={() => accountQuery.refetch()}>
            Votes: {upvotes.toString()}
          </h2>
          <div className="card-actions justify-around">
            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => upvoteMutation.mutateAsync()}
              disabled={upvoteMutation.isPending}
            >
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
