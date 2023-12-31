"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileType } from "@/typings"
import { Button } from "../ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import { useAppStore } from "@/store/store"
import DeleteModal from "../modal/DeleteModal"
import { useUser } from "@clerk/nextjs"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "@/firebase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import RenameModal from "../modal/RenameModal"
import toast from 'react-hot-toast'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { user } = useUser();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const [setFileId, setFileName, setIsDeleteModalOpen, setIsRenameModalOpen, isDeleteModalOpen, fileId, isRenameModalOpen, fileName] = 
  useAppStore(state=>[state.setFileId, state.setFileName, state.setIsDeleteModalOpen, state.setIsRenameModalOpen, state.isDeleteModalOpen, state.fileId, state.isRenameModalOpen, state.fileName])
  const openDeleteModal = (fileId:string)=> {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  }

  const openRenameModal = (fileId:string, fileName:string)=> {
    setFileId(fileId);
    setFileName(fileName);
    setIsRenameModalOpen(true);
  }

  //function for deleting the file
  const deleteFile = async()=> {
      if(!user || !fileId) return;
      const deleteToastId = toast.loading("Deleting the file...")
      const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
      try {
        deleteObject(fileRef).then(async()=>{
          console.log("DELETED FILE")
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(()=>{
            toast.success("Deleted successfully",{
              id:deleteToastId
            })
          })
        }).finally(()=>{
          setIsDeleteModalOpen(false)
        })
      } catch (error) {
        toast.error("Error while deleting the file")
        setIsDeleteModalOpen(false)
      }
  }

  //function for renaming the file
  const renameFile = async()=>{
    if(!user || !fileId) return;
    const renameToastId = toast.loading("Renaming the file...")
    updateDoc(doc(db, "users", user.id,"files", fileId),{
        fileName:fileName
      }).then(()=>{
        toast.success("Renamed successfully",{
          id:renameToastId
        })
      }).catch((err)=>{
        toast.error("Error while renaming the file")
      })
      setIsRenameModalOpen(false)
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {/* *************modal for deleting a file***************** */}
                <DeleteModal isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} deleteFile={deleteFile}/>
                <RenameModal isRenameModalOpen={isRenameModalOpen} setIsRenameModalOpen={setIsRenameModalOpen} fileName={fileName} setFileName={setFileName} renameFile={renameFile}/>
                {/* ************************************ */}
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell?.column?.id === "timestamp"? (
                      <div className="flex flex-col">
                          <div className="text-sm">
                              {(cell?.getValue() as Date)?.toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                              {(cell?.getValue() as Date)?.toLocaleTimeString()}
                          </div>
                      </div>
                    ) : cell?.column?.id === "fileName" ?(
                      <p className="flex items-center underline text-primary hover:cursor-pointer"
                      onClick={()=>{
                        //opening a modal here for renaming the file
                        openRenameModal((row?.original as FileType)?.id, (row?.original as FileType)?.fileName)
                      }}
                      >
                        {cell?.getValue() as string}{" "}
                        <PencilIcon size={12} className="ml-2"/>
                      </p>
                    ) :flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell key={(row?.original as FileType)?.id}>
                    <Button onClick={()=>{
                      openDeleteModal((row?.original as FileType)?.id)
                    }}>
                      <TrashIcon size={16}/>
                    </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
