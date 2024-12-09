import { useState, createContext, useContext, Children } from "react";

export const OverlayContext = createContext()

export function OverlayContextProvider({ children }) {

    const [overlayIsOpen, setOverlayIsOpen] = useState(false)

    // console.log(overlayIsOpen)

    return (
        <OverlayContext.Provider value={{ overlayIsOpen, setOverlayIsOpen }}>
            {children}
        </OverlayContext.Provider>
    )

}


export function useOverlayContext() {
    return useContext(OverlayContext)
}