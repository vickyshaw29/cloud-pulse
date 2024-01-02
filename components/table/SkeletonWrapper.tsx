"use client";
import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from ".";
import { columns } from "./Collumns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "../ui/skeleton";

const SkeletonWrapper = ({
  filesForSkeleton,
}: {
  filesForSkeleton: FileType[];
}) => {
  const [initialFiles, setInitialFiles] = useState<FileType[]>([])
  const [sorting, setSorting] = useState<'asc'|'desc'>('asc');
  const { user } = useUser();
  const [docs, loading, error] = useCollection(
    user && 
    query(
      collection(db, "users", user.id, "files"),
      orderBy("timestamp", sorting)
    ),
  )

  useEffect(()=>{
    if(!docs) return;
    const files = docs.docs?.map((doc)=>({
      id: doc?.id,
      fileName: doc?.data()?.fileName || doc.id,
      timestamp: new Date(doc?.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc?.data()?.fullName,
      type: doc?.data()?.type,
      size: doc?.data()?.size,
      downloadURL: doc?.data()?.downloadURL
    }))
    console.log({files})
    setInitialFiles(files);
  },[docs])

  if(docs?.docs?.length === undefined){
    return(
        <div className="flex flex-col">
            <div className="mt-[2rem] border rounded-lg">
              <div className="h-12 border-b"/>
              {filesForSkeleton?.map((eachFile)=>(
                  <div key={eachFile?.id} className="flex items-center w-full p-5 space-x-4">
                      <Skeleton className="w-12 h-12"/>
                      <Skeleton className="w-full h-12"/>
                  </div>
              ))}
              {filesForSkeleton?.length === 0 && (
                <div className="flex items-center justify-center w-full p-5 space-x-4">
                      <Skeleton className="w-12 h-12"/>
                      <Skeleton className="w-full h-12"/>
                </div>
              )}
            </div>
        </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        <SortingDropdown sorting={sorting} setSorting={(order:any)=>setSorting(order)}/>
      </div>
      {/* table showing all the files*/}
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default SkeletonWrapper;

const SortingDropdown:React.FC<SortingDropdown> = ({sorting, setSorting}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="xs" className="flex min-w-[8rem] space-x-2">
          <ArrowDownUp className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="text-[15px]">Sort By</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setSorting("asc")}>
          Ascending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSorting("desc")}>
          Descending
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type SortingDropdown = {
  sorting: string;
  setSorting: (order: string) => void;
};
