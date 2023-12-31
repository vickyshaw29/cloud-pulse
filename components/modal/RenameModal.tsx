'use client'
import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "../ui/button";
  import { Input } from '../ui/input';

const RenameModal:React.FC<RenameModalProps> = ({isRenameModalOpen, setIsRenameModalOpen,renameFile, fileName, setFileName}) => {
    
  return (
    <Dialog open={isRenameModalOpen} onOpenChange={(isOpen)=>setIsRenameModalOpen(isOpen)}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Rename the file</DialogTitle>
        <Input
            id='link'
            defaultValue={fileName}
            onChange={(e)=>setFileName(e.target.value)}
            onKeyDownCapture={(e)=>{
                if(e.key==='Enter'){
                    renameFile()
                }
            }}
        />
      </DialogHeader>
      <DialogFooter className="sm:justify-start">
      <Button size={"sm"} className="flex-1 px-2 py-2" variant={"ghost"} onClick={()=>setIsRenameModalOpen(false)}>
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
          </Button>

          <Button type="submit" size={"sm"} className="flex-1 px-3 py-2 mb-2 md:mb-0" onClick={()=>renameFile()}>
              <span className="sr-only">Rename</span>
              <span>Rename</span>
          </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default RenameModal

type RenameModalProps = {
    isRenameModalOpen:boolean,
    setIsRenameModalOpen: (open:boolean)=>void;
    fileName:string;
    setFileName:(fileName:string)=>void
    renameFile:any
}