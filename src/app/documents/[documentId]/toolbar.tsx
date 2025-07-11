'use client'

import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'

interface ToolbarButtonProps {
  icon: LucideIcon
  disabled?: boolean
  isActive?: boolean
  onClick?: () => void
}

const ToolbarButton = ({
  icon: Icon,
  disabled,
  isActive,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        isActive && 'bg-neutral-200/80',
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

export const Toolbar = () => {
  const { editor } = useEditorStore()

  const sections: {
    label: string
    icon: LucideIcon
    onClick: () => void
    disabled?: boolean
    isActive?: boolean
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        disabled: !editor?.can().undo(),
        onClick: () => editor?.commands.undo(),
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        disabled: !editor?.can().redo(),
        onClick: () => editor?.commands.redo(),
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        isActive: editor?.view.dom.getAttribute('spellcheck') === 'true',
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck')
          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'false' ? 'true' : 'false',
          )
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        disabled: !editor?.can().toggleBold(),
        onClick: () => editor?.commands.toggleBold(),
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        disabled: !editor?.can().toggleItalic(),
        onClick: () => editor?.commands.toggleItalic(),
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        disabled: !editor?.can().toggleUnderline(),
        onClick: () => editor?.commands.toggleUnderline(),
      },
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        onClick: () => console.log('TODO: Comment'),
        isActive: false, // TODO: Enable this funcionality
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        isActive: editor?.isActive('taskList'),
        disabled: !editor?.can().toggleTaskList(),
        onClick: () => editor?.commands.toggleTaskList(),
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        disabled: !editor?.can().unsetAllMarks(),
        onClick: () => editor?.commands.unsetAllMarks(),
      },
    ],
  ]

  return (
    <div className="flex min-h-[40px] items-center gap-x-0.5 overflow-x-auto rounded-[24px] bg-[#f1f4f9] px-2.5 py-0.5">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* TODO: Font Family */}
      {/* TODO: Heading */}
      {/* TODO: Font Size */}

      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* TODO: Text color */}
      {/* TODO: Highlight color */}
      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line height */}
      {/* TODO: List */}

      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  )
}
