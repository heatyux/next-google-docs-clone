'use client'

import { ClientSideSuspense, useInboxNotifications } from '@liveblocks/react'
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui'
import { BellIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <>
          <Button variant="ghost" className="relative" size="icon">
            <BellIcon className="size-5" />
          </Button>

          <Separator orientation="vertical" className="h-6" />
        </>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  )
}

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative" size="icon">
          <BellIcon className="size-5" />
          {inboxNotifications && inboxNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
              {inboxNotifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-auto">
        {inboxNotifications && inboxNotifications?.length > 0 ? (
          <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
              <InboxNotification
                key={inboxNotification.id}
                inboxNotification={inboxNotification}
              />
            ))}
          </InboxNotificationList>
        ) : (
          <div className="text-muted-foreground w-[400px] p-2 text-center text-sm">
            No notifications.
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
