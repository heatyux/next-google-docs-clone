'use client'

import { type ReactNode, useEffect, useMemo, useState } from 'react'

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense'
import { toast } from 'sonner'

import { FullscreenLoader } from '@/components/fullscreen-loader'

import { getUsers } from './actions'

type RoomProps = {
  children: ReactNode
  documentId: string
}

type User = {
  id: string
  name: string
  avatar: string
}

export function Room({ children, documentId }: RoomProps) {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers()
        setUsers(list)
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to fetch users!',
        )
      }
    },
    [],
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined,
        )
      }}
      resolveMentionSuggestions={({ text }) => {
        let filterUsers = users

        if (text) {
          filterUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase()),
          )
        }

        return filterUsers.map((user) => user.id)
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Loading Document..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
