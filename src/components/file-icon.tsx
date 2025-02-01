import type { FileType } from "types/file-system"
import { File, FileImage, FileText, Folder, Music, Video } from "lucide-react"

interface FileIconProps {
  type: FileType
  className?: string
}

export function FileIcon({ type, className }: FileIconProps) {
  switch (type) {
    case "folder":
      return <Folder className={className} />
    case "image":
      return <FileImage className={className} />
    case "video":
      return <Video className={className} />
    case "audio":
      return <Music className={className} />
    case "document":
      return <FileText className={className} />
    case "pdf":
      return <File className={className} />
    default:
      return <File className={className} />
  }
}

