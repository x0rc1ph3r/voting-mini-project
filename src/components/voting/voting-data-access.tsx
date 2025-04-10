'use client'

import { getVotingProgram, getVotingProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

interface CreateArgs {
  candidateName: string;
}

export function useVotingProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getVotingProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getVotingProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['voting', 'all', { cluster }],
    queryFn: () => program.account.candidate.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation<string, Error, CreateArgs>({
    mutationKey: ['voting', 'initialize', { cluster }],
    mutationFn: ({ candidateName }) => program.methods.initialize(candidateName).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useVotingProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useVotingProgram()

  const accountQuery = useQuery({
    queryKey: ['voting', 'fetch', { cluster, account }],
    queryFn: () => program.account.candidate.fetch(account),
  })

  const upvoteMutation = useMutation({
    mutationKey: ['voting', 'vote', { cluster, account }],
    mutationFn: () => program.methods.vote().accounts({ candidateAccount: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  return {
    accountQuery,
    upvoteMutation,
  }
}
