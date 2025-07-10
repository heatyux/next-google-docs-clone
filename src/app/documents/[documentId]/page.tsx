import { Editor } from './editor'

type DocumentIdPageProps = {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params

  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Editor />
    </div>
  )
}

export default DocumentIdPage
