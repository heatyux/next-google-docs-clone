import { ClientSideSuspense, useOthers, useSelf } from '@liveblocks/react'

import { Separator } from '@/components/ui/separator'

const ATAVAR_SIZE = 36

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  )
}

const AvatarStack = () => {
  const users = useOthers()
  const currentUser = useSelf()

  if (users.length === 0) return null

  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="realtive ml-2">
            <Avatar src={currentUser.info.avatar} name="You" />
          </div>
        )}

        <div className="flex">
          {users.map((user) => (
            <Avatar
              key={user.id}
              src={user.info.avatar}
              name={user.info.name}
            />
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />
      </div>
    </>
  )
}

interface AvatarProps {
  src: string
  name: string
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      className="group relative -ml-2 flex shrink-0 place-content-center rounded-full border-4 border-white bg-gray-400"
      style={{ width: ATAVAR_SIZE, height: ATAVAR_SIZE }}
    >
      <div className="absolute top-full z-10 mt-2.5 rounded-lg bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
        {name}
      </div>

      {/* eslint-disable-next-line */}
      <img src={src} alt={name} className="size-full rounded-full" />
    </div>
  )
}
