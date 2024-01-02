import React from 'react'
import { auth } from '@clerk/nextjs'
import DropZone from '@/components/DropZone'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { FileType } from '@/typings'
import SkeletonWrapper from '@/components/table/SkeletonWrapper'

const Dashboard = async () => {
  const { userId } = auth();
  const docResults = await getDocs(collection(db, "users", userId!, "files"));

  const filesForSkeleton: FileType[] = docResults?.docs?.map((doc)=>({
    id: doc?.id,
    fileName: doc?.data()?.fileName || doc.id,
    timestamp: new Date(doc?.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc?.data()?.fullName,
    type: doc?.data()?.type,
    size: doc?.data()?.size,
    downloadURL: doc?.data()?.downloadURL
  }))

  return (
    <div className='p-6 '>
          <DropZone/>
          <section className='mt-5 space-y-5 md:container '>
              <h2 className='font-bold'>All Files</h2>
              {/* table showing all the files */}
              <SkeletonWrapper filesForSkeleton={filesForSkeleton}/>
          </section>
    </div>
  )
}

export default Dashboard