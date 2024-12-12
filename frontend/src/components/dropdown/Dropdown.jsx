import { useState, useRef } from 'react'
import { useOverlayContext } from '../../Context/OverlayContext'
import { useNavigate, NavLink } from 'react-router-dom'

import './Dropdown.css'

import useAuth from '../../hooks/useAuth'

function Dropdown({ dropIsOpen, setDropIsOpen }) {

    const { setOverlayIsOpen, overlayIsOpen } = useOverlayContext()
    const { signOut } = useAuth()

    const dropDown = useRef(null)
    const navigate = useNavigate()


    async function handleSignOut() {
        const success = await signOut()

        if (success) {
            return navigate('/login')
        }

        setDropIsOpen(!dropIsOpen)
    }

    function handleEditOption() {
        setOverlayIsOpen(!overlayIsOpen)
        setDropIsOpen(!dropIsOpen)
    }


    function dropHeight() {
        if (!dropDown.current) return
        const dropItem = Array.from(dropDown.current.children)
        const dropItemsAmount = dropItem.length
        const dropItemsHeight = dropItem[0]?.offsetHeight || 0

        dropDown.current.style.height = `${dropItemsAmount * dropItemsHeight}px`
    }

    if (dropIsOpen) {
        dropHeight()
    }

    return (
        <div ref={dropDown} className={`drop_container ${dropIsOpen ? 'open' : 'close'}`}>
            <div className='dropdown-item' onClick={handleEditOption}>Editar</div>
            <div className='dropdown-item' onClick={() => setDropIsOpen(!dropIsOpen)}>Configurações</div>
            <div className='dropdown-item'><NavLink onClick={handleSignOut}>Sair</NavLink></div>
        </div>
    )
}

export default Dropdown