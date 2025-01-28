import { Page } from '@/types/page'
import { create } from 'zustand'

interface PageStoreType {
  page: Page
  increase: (by: number) => void
}

export const usePageStore = create<PageStoreType>()((set) => ({
  page: "dashboard",  // Default value
  increase: (by) => set((state) => ({ page: state.page }))  
}))
