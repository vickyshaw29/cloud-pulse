"use client"
import Dropzone from 'react-dropzone'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import toast from 'react-hot-toast'

const DropZone = () => {
  const maxSize = 20971520
  const [loading, setLoading] = useState<boolean>(false)
  const { user, isLoaded, isSignedIn } = useUser()

  const uploadFileInBucket = async(file: File)=> {
    if(loading || !user) return;
    const toastId = toast.loading("Uploading...")
    setLoading(true);
    // logic for creating a user doc ref
    const docRef = await addDoc(collection(db, "users", user?.id, "files"), {
      userId: user.id,
      fileName: file.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timeStamp: serverTimestamp(),
      type: file.type,
      size: file.size
    })
    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)
    
    // logic for uploading the file in the bucket
     uploadBytes(imageRef, file).then(async(snapshot)=>{
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.id, "files", docRef.id),{
          downloadURL: downloadURL
      })
     })
    setLoading(false);
    toast.success("Uploaded",{
      id:toastId
    })
  }

  const uploadOnDrop = (acceptedFiles: File[]) => {
    acceptedFiles?.forEach((eachFile:File)=>{
      const reader = new FileReader();
      reader.onabort = ()=> console.log("File aborted")
      reader.onerror = ()=> console.log("error while reading the file")
      reader.onload = async()=>{
        await uploadFileInBucket(eachFile)
      }
      reader.readAsArrayBuffer(eachFile)
    })
  }

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={acceptedFiles => uploadOnDrop(acceptedFiles)}>
    {({getRootProps, getInputProps, isDragActive, isDragReject, fileRejections}) => {
        const isFileTooLarge = fileRejections?.length > 0 && fileRejections[0]?.file?.size> maxSize;
        return(
                <section className={cn('min-h-[200px] w-full flex  cursor-pointer p-4 border-dashed rounded-lg ',
                isDragActive ? 'bg-primary text-white animate-pulse' : 'bg-slate-200/50 dark:bg-slate-800/80 text-slate-400'
                )}>
                  <div {...getRootProps()} className="w-[100%] min-h-[200px] flex justify-center items-center text-center">
                    <input {...getInputProps()} />
                    {!isDragActive  && "Click here or drop a file to upload!"}
                    {isDragActive && !isDragReject && "Drop to upload this file!"}
                    {isDragReject && "File type not accepted, sorry!"}
                    {isFileTooLarge && (
                        <div className='mt-2 text-danger'>
                            File is too large
                        </div>
                    )}
                  </div>
                </section>
        )
    }}
  </Dropzone>
  )
}

export default DropZone