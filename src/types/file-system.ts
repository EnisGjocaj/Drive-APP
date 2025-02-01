export type FileType = "folder" | "document" | "image" | "video" | "audio" | "pdf"

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size?: string;
  modified: string;
  url?: string;
  parentId: string | null;
}

