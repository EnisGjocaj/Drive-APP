"use client"

import { useState } from "react"
import Link from "next/link"
import type { FileItem } from "~/types/file-system"
import { mockFiles } from "~/lib/mock-data"
import { FileIcon } from "~/components/file-icon"
import { ViewToggle } from "~/components/view-toggle"
import { Layout, useLayout } from "~/components/layout"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { cn } from "~/lib/utils"
import { ChevronRight, ChevronLeft, Home, Plus, Settings, Star, Trash, Upload, Folder, Menu } from "lucide-react"

function DriveContent() {
  const { sidebarOpen, toggleSidebar } = useLayout()
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")

  // Get files for current folder
  const getCurrentFiles = () => {
    return mockFiles.filter(
      (file) => file.parentId === currentFolder && file.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Get breadcrumb path
  const getBreadcrumb = () => {
    if (!currentFolder) return []
    const path: FileItem[] = []
    let current = mockFiles.find((f) => f.id === currentFolder)
    while (current) {
      path.unshift(current)
      current = mockFiles.find((f) => f.id === current?.parentId)
    }
    return path
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 transform border-r bg-card/50 backdrop-blur-xl transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col p-4 space-y-4">
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 hover:bg-accent hover:text-accent-foreground"
              onClick={() => setCurrentFolder(null)}
            >
              <Home className="w-4 h-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-accent hover:text-accent-foreground">
              <Star className="w-4 h-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-accent hover:text-accent-foreground">
              <Trash className="w-4 h-4" />
              Trash
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-accent hover:text-accent-foreground">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>

          <div className="mt-auto pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">Storage</div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="w-[45%] h-full bg-blue-500/80" />
            </div>
            <div className="text-xs text-muted-foreground mt-2">45.5 GB of 100 GB used</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", sidebarOpen ? "ml-64" : "ml-0")}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-4 hover:bg-accent hover:text-accent-foreground"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md bg-card/50"
              />
            </div>
            <div className="flex items-center gap-4">
              <ViewToggle view={view} onViewChange={setView} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload file
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Folder className="w-4 h-4 mr-2" />
                    New folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 px-4 py-2 text-sm border-t border-border bg-card/50">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto hover:bg-accent hover:text-accent-foreground"
              onClick={() => setCurrentFolder(null)}
            >
              My Drive
            </Button>
            {getBreadcrumb().map((item) => (
              <div key={item.id} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setCurrentFolder(item.id)}
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Files view */}
        <div className="p-4">
          {view === "grid" ? (
            // Grid view
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getCurrentFiles().map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "group relative p-4 rounded-lg border border-border bg-card/50 backdrop-blur-sm transition-all hover:bg-accent hover:text-accent-foreground",
                    file.type === "folder" && "cursor-pointer",
                  )}
                  onClick={() => {
                    if (file.type === "folder") {
                      setCurrentFolder(file.id)
                    }
                  }}
                >
                  {file.type === "folder" ? (
                    <div className="space-y-3">
                      <div className="w-full aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                        <FileIcon type={file.type} className="w-8 h-8 text-blue-500" />
                      </div>
                      <div className="text-sm font-medium">{file.name}</div>
                    </div>
                  ) : (
                    <Link href={file.url || "#"} className="block space-y-3" onClick={(e) => e.stopPropagation()}>
                      <div className="w-full aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                        <FileIcon type={file.type} className="w-8 h-8 text-blue-500" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.size}</div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // List view
            <div className="rounded-lg border border-border overflow-hidden bg-card/50 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-accent/50">
                    <TableHead className="font-medium">Name</TableHead>
                    <TableHead className="font-medium">Type</TableHead>
                    <TableHead className="font-medium">Size</TableHead>
                    <TableHead className="font-medium">Modified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCurrentFiles().map((file) => (
                    <TableRow
                      key={file.id}
                      className={cn(
                        "hover:bg-accent hover:text-accent-foreground transition-colors",
                        file.type === "folder" && "cursor-pointer",
                      )}
                      onClick={() => {
                        if (file.type === "folder") {
                          setCurrentFolder(file.id)
                        }
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileIcon type={file.type} className="w-4 h-4 text-blue-500" />
                          {file.type === "folder" ? (
                            <span>{file.name}</span>
                          ) : (
                            <Link
                              href={file.url || "#"}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline"
                            >
                              {file.name}
                            </Link>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{file.type}</TableCell>
                      <TableCell>{file.size || "--"}</TableCell>
                      <TableCell>{file.modified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Drive() {
  return (
    <Layout>
      <DriveContent />
    </Layout>
  )
}

