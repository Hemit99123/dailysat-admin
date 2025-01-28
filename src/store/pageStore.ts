import { Page } from '@/types/page'
import { create } from 'zustand'

interface PageStoreType {
  page: Page
  increase: () => void
}

export const usePageStore = create<PageStoreType>()((set) => ({
  page: "dashboard",  // Default value
  increase: () => set((state) => ({ page: state.page }))  
}))
