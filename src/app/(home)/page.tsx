'use client'

import { usePaginatedQuery } from 'convex/react'

import { useSearchParam } from '@/hooks/use-search-param'

import { api } from '../../../convex/_generated/api'
import { DocumentsTable } from './documents-table'
import { Navbar } from './navbar'
import { TemplateGallery } from './template-gallery'

const HomePage = () => {
  const [search] = useSearchParam()

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 },
  )

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-x-0 top-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          status={status}
          loadMore={loadMore}
        />
      </div>
    </div>
  )
}

export default HomePage
