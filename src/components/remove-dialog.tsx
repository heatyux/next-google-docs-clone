'use client'

import { type PropsWithChildren, useState } from 'react'

import { useMutation } from 'convex/react'
import { ConvexError } from 'convex/values'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

type RemoveDialogProps = {
  documentId: Id<'documents'>
}

export const RemoveDialog = ({
  children,
  documentId,
}: PropsWithChildren<RemoveDialogProps>) => {
  const router = useRouter()
  const remove = useMutation(api.documents.removeById)
  const [isRemoving, setIsRemoving] = useState(false)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isRemoving}
            onClick={(e) => e.stopPropagation()}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={(e) => {
              e.stopPropagation()
              setIsRemoving(true)

              remove({ id: documentId })
                .then(() => {
                  router.push('/')
                })
                .catch((error) => {
                  const errorMessage =
                    error instanceof ConvexError
                      ? error.data
                      : 'Something went wrong!'

                  toast.error(errorMessage)
                })
                .finally(() => {
                  setIsRemoving(false)
                })
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
