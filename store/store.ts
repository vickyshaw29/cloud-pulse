import {create} from 'zustand'


export const useAppStore = create<AppState>((set) => ({
    fileId: null,
    setFileId:(fileId:string)=>set((state)=>({fileId})),

    fileName:"",
    setFileName: (fileName:string)=>set((state)=>({fileName})),

    isDeleteModalOpen:false,
    setIsDeleteModalOpen:(open:boolean)=>set((state)=>({isDeleteModalOpen:open})),

    isRenameModalOpen:false,
    setIsRenameModalOpen:(open:boolean)=>set(state=>({isRenameModalOpen:open}))
  }))

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open:boolean) =>void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open:boolean) =>void;

    fileId: string | null;
    setFileId: (fileId:string)=>void;

    fileName: string;
    setFileName: (fileName:string)=> void;

}