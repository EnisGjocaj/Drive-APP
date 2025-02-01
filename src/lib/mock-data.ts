import type { FileItem } from "~/types/file-system"

export const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "2024-01-28",
    parentId: null,
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    modified: "2024-01-27",
    parentId: null,
  },
  {
    id: "3",
    name: "Project Proposal.pdf",
    type: "pdf",
    size: "2.4 MB",
    modified: "2024-01-26",
    url: "/files/proposal.pdf",
    parentId: "1",
  },
  {
    id: "4",
    name: "Vacation Photos",
    type: "folder",
    modified: "2024-01-25",
    parentId: "2",
  },
  {
    id: "5",
    name: "beach.jpg",
    type: "image",
    size: "3.1 MB",
    modified: "2024-01-24",
    url: "/placeholder.svg?height=300&width=400",
    parentId: "4",
  },
  {
    id: "6",
    name: "sunset.jpg",
    type: "image",
    size: "2.8 MB",
    modified: "2024-01-24",
    url: "/placeholder.svg?height=300&width=400",
    parentId: "4",
  },
  {
    id: "7",
    name: "presentation.pdf",
    type: "pdf",
    size: "5.2 MB",
    modified: "2024-01-23",
    url: "/files/presentation.pdf",
    parentId: "1",
  },
]

