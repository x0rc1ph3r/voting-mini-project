'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getPollAddressById, usePollProgramAccount } from './voting-data-access'
import { PublicKey } from '@solana/web3.js'

export default function PollDetailFeature() {
    const params = useParams()
    const id = useMemo(() => {
        if (!params.id) {
            return
        }
        try {
            return params.id
        } catch (e) {
            console.log(`Invalid public key`, e)
        }
    }, [params])
    if (!id) {
        return <div>Error loading account</div>
    }

    const { pollAccountQuery, candidateAccountsQuery } = usePollProgramAccount({ account: getPollAddressById(Number(id)) })

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-6 text-cyan-400 text-shadow">
            {/* Left Panel */}
            <div className="w-full md:w-2/3 md:pr-5">
                <h1 className="text-white text-3xl text-center mb-5">Legislative Assembly Election</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="border-2 border-cyan-400 rounded-xl h-[220px] flex items-center justify-center text-lg">
                            <div className="flex w-full justify-between px-3">
                                <div className="flex flex-col items-center w-1/4">
                                    <img src={`/candidate${num}.png`} alt={`Candidate ${num}`} className="w-[90%] rounded-xl border border-cyan-400 bg-black/40 hover:-translate-y-1 transition duration-300 shadow-md" />
                                    <p className="text-white text-sm mt-1">Candidate {num} Name</p>
                                </div>
                                <div className="flex flex-col items-center w-1/4">
                                    <img src={`/symbol${num}.png`} alt={`Symbol ${num}`} className="w-[90%] rounded-xl border border-cyan-400 bg-black/40 hover:-translate-y-1 transition duration-300 shadow-md" />
                                    <p className="text-white text-sm mt-1">Symbol {num}</p>
                                </div>
                                <div className="flex flex-col justify-between text-left pl-5 flex-1">
                                    <h3 className="text-cyan-300 pt-3 text-lg">Party {num} Name</h3>
                                    <p className="text-gray-300">No.of Votes: {[12, 32, 41, 19][num - 1]} votes</p>
                                    <button className="w-fit mt-2 px-4 py-1 bg-cyan-400 text-black font-bold rounded-md hover:-translate-y-1 hover:shadow-[0_0_10px_#00e6e6] transition">Vote</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/3 mt-10 md:mt-0">
                <h1 className="text-white text-3xl text-center mb-5">Leaderboard</h1>

                <div className="border-2 border-cyan-400 rounded-xl h-[71%] flex justify-center items-center p-6">
                    <div className="w-full max-w-md space-y-6">
                        <h1 className="text-white text-5xl text-center">Results</h1>

                        {[
                            { name: 'Candidate A', percent: 90 },
                            { name: 'Candidate B', percent: 60 },
                            { name: 'Candidate C', percent: 75 },
                            { name: 'Candidate D', percent: 85 }
                        ].map((item, i) => (
                            <div key={i} className="space-y-1">
                                <span className="text-white text-sm">{item.name}</span>
                                <div className="w-full h-5 bg-gray-800 border border-cyan-400 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${item.percent}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    )
}
