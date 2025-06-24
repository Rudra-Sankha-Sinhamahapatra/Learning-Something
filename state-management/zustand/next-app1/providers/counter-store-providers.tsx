"use client"

import React, { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { createCounterStore, type CounterStore } from '@/stores/counter-store'

export type CounterStoreApi = ReturnType<typeof createCounterStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
    undefined,
)

export interface CounterStoreProviderProps {
    children: React.ReactNode
}

export const CounterStoreProvider = ({
    children
}: CounterStoreProviderProps) => {
    const storeRef = useRef<CounterStoreApi | null>(null);
    if(storeRef.current === null) {
        storeRef.current = createCounterStore();
    }

    return (
        <CounterStoreContext.Provider value={storeRef.current}>
            {children}
        </CounterStoreContext.Provider>
    )
}

export const useCounterStore = <T,>(
    selector: (store: CounterStore) => T,
): T => {
    const counterStoreContext = useContext(CounterStoreContext);

    if(!counterStoreContext) {
        throw new Error(`useCounterStore must be used within CounterStoreProvider`)
    }

    return useStore(counterStoreContext,selector)
}