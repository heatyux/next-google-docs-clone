'use client'

import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image'

export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px;',
        class:
          'focus:outline-none bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] py-10 pr-14 cursor-text print:border-0',
      },
    },
    extensions: [
      Image,
      ImageResize,
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: '<h1>Hello World!</h1>',
    immediatelyRender: false,
  })

  return (
    <div className="oveflow-x-auto size-full bg-[#f9fbfd] px-4 print:overflow-visible print:bg-white print:p-0">
      <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
