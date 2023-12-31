"use client"

import { FileType } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import prettyBytes from 'pretty-bytes';
import { FileIcon, defaultStyles } from 'react-file-icon'


export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({renderValue, ...props})=>{
        const type = renderValue() as string;
        const extension = type?.split("/")?.[1];

        return (
            <div className="w-10">
                <FileIcon
                    extension={extension}
                    labelColor="#01a275"
                    // @ts-ignore
                    {...defaultStyles[extension]}
                />
            </div>
        )
    }
  },
  {
    accessorKey: "fileName",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Uploaded Date",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({renderValue, ...props})=>{
        return <span>{prettyBytes(renderValue() as number)}</span>
    }
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({renderValue, ...props})=>{
        return <a href={renderValue() as string} target="_blank" className="underline text-primary hover:text-secondary">Download</a>
    }
  },
]
