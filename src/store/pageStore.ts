import { Page } from '@/types/page'
import { create } from 'zustand'

interface PageStoreType {
  page: Page
  change: () => void
}

export const usePageStore = create<PageStoreType>()((set) => ({
  page: "dashboard",  // Default value
  change: () => set((state) => ({ page: state.page }))  
}))
