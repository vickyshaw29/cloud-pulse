'use client'
import React from "react";
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

const DeleteModal:React.FC<DeleteModalProps> = ({setIsDeleteModalOpen, deleteFile, isDeleteModalOpen}) => {
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={(isOpen)=>setIsDeleteModalOpen(isOpen)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete the file?</DialogTitle>
          <DialogDescription>
            This action will permanently delete your file.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
            <Button size={"sm"} className="flex-1 px-2 py-2" variant={"ghost"} onClick={()=>setIsDeleteModalOpen(false)}>
                <span className="sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>

            <Button type="submit" size={"sm"} className="flex-1 px-3 py-2 mb-2" onClick={()=>deleteFile()}>
                <span className="sr-only">Delete</span>
                <span>Delete</span>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;

type DeleteModalProps = {
    isDeleteModalOpen:boolean,
    setIsDeleteModalOpen: (open:boolean)=>void;
    deleteFile:any
}