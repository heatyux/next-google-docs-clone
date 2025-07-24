'use client'

import React, { PropsWithChildren, useState } from 'react'

import { useMutation } from 'convex/react'
import { ConvexError } from 'convex/values'
import { toast } from 'sonner'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { Button } from './ui/button'
import { Input } from './ui/input'

type RenameDialogProps = {
  documentId: Id<'documents'>
  initialTitle: string
}

export const RenameDialog = ({
  children,
  documentId,
  initialTitle,
}: PropsWithChildren<RenameDialogProps>) => {
  const update = useMutation(api.documents.updateById)
  const [isUpdating, setIsUpdating] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [open, setOpen] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)

    setOpen(false)
    update({ id: documentId, title })
      .then(() => setOpen(false))
      .catch((error) => {
        console.log({ error })
        const errorMessage =
          error instanceof ConvexError ? error.data : 'Something went wrong!'

        toast.error(errorMessage)
      })
      .finally(() => {
        setIsUpdating(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              disabled={isUpdating}
              type="text"
              placeholder="Untitled Document"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={isUpdating}
                type="button"
                variant="outline"
                onClick={(e) => e.stopPropagation()}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              disabled={isUpdating || !title.trim()}
              type="submit"
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
