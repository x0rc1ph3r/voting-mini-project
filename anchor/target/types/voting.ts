/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/voting.json`.
 */
export type Voting = {
  "address": "DzKKZbw8of6AZJ1kMbjoN8oGEGCWbAoALbzGCbxyuxAJ",
  "metadata": {
    "name": "voting",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializeCandidate",
      "discriminator": [
        210,
        107,
        118,
        204,
        255,
        97,
        112,
        26
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "poll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "arg",
                "path": "pollId"
              }
            ]
          }
        },
        {
          "name": "candidate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "pollId"
              },
              {
                "kind": "arg",
                "path": "candidateName"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "candidateName",
          "type": "string"
        },
        {
          "name": "pollId",
          "type": "u64"
        },
        {
          "name": "party",
          "type": "string"
        },
        {
          "name": "candidateImage",
          "type": "string"
        },
        {
          "name": "symbolImage",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializePoll",
      "discriminator": [
        193,
        22,
        99,
        197,
        18,
        33,
        115,
        117
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true,
          "address": "i2tZJMMTqrcYv53qdLFsouL1JQPWgKiTfZ6sRDfk7nL"
        },
        {
          "name": "poll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "arg",
                "path": "pollId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u64"
        },
        {
          "name": "pollDescription",
          "type": "string"
        },
        {
          "name": "pollStart",
          "type": "u64"
        },
        {
          "name": "pollEnd",
          "type": "u64"
        },
        {
          "name": "mintAddress",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "vote",
      "discriminator": [
        227,
        110,
        155,
        23,
        136,
        126,
        172,
        25
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "poll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "arg",
                "path": "pollId"
              }
            ]
          },
          "relations": [
            "candidate"
          ]
        },
        {
          "name": "candidate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "pollId"
              },
              {
                "kind": "arg",
                "path": "candidateName"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poll"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "candidateName",
          "type": "string"
        },
        {
          "name": "pollId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "candidate",
      "discriminator": [
        86,
        69,
        250,
        96,
        193,
        10,
        222,
        123
      ]
    },
    {
      "name": "poll",
      "discriminator": [
        110,
        234,
        167,
        188,
        231,
        136,
        153,
        111
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "votingNotStarted",
      "msg": "Voting has not started yet"
    },
    {
      "code": 6001,
      "name": "votingEnded",
      "msg": "Voting has ended"
    },
    {
      "code": 6002,
      "name": "invalidMintAddress",
      "msg": "Invalid mint address"
    },
    {
      "code": 6003,
      "name": "unauthorized",
      "msg": "Unauthorized signer"
    }
  ],
  "types": [
    {
      "name": "candidate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "poll",
            "type": "pubkey"
          },
          {
            "name": "candidateName",
            "type": "string"
          },
          {
            "name": "candidateImage",
            "type": "string"
          },
          {
            "name": "candidateVotes",
            "type": "u64"
          },
          {
            "name": "party",
            "type": "string"
          },
          {
            "name": "symbolImage",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "poll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pollId",
            "type": "u64"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "pollStart",
            "type": "u64"
          },
          {
            "name": "pollEnd",
            "type": "u64"
          },
          {
            "name": "candidateAmount",
            "type": "u64"
          },
          {
            "name": "totalVotes",
            "type": "u64"
          },
          {
            "name": "mintAddress",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
