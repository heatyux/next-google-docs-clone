import type { PaginationStatus } from 'convex/react'

import { FullscreenLoader } from '@/components/fullscreen-loader'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { Doc } from '../../../convex/_generated/dataModel'
import { DocumentRow } from './document-row'

type DocumentsTableProps = {
  documents: Doc<'documents'>[]
  status: PaginationStatus
  loadMore: (numItems: number) => void
}

export const DocumentsTable = ({ documents }: DocumentsTableProps) => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-5 px-16 py-6">
      {documents === undefined ? (
        <FullscreenLoader className="h-24 min-h-full" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="border-none hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground h-24 text-center"
                >
                  No documents found.
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  )
}
