import { Page } from '@/types/page'
import { create } from 'zustand'

interface PageStoreType {
  page: Page
  change: (newPage: Page) => void
}

export const usePageStore = create<PageStoreType>()((set) => ({
  page: "dashboard",  // Default value
  change: (newPage: Page) => set(() => ({ page: newPage}))  
}))
