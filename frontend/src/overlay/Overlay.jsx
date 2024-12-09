import React from 'react'
import { useOverlayContext } from '../Context/OverlayContext'

import './Overlay.css'

import AccountDetais from '../overlay/formUpdate/AccountDetails'

function Overlay() {

    const { overlayIsOpen, setOverlayIsOpen } = useOverlayContext()

    return (
        <div className={`overlay ${overlayIsOpen ? 'open-overlay ' : 'close-overlay'}`}>
            <span className='material-symbols-outlined btn-close' onClick={() => setOverlayIsOpen(false)}>close</span>
            <AccountDetais />
        </div>
    )
}

export default Overlay