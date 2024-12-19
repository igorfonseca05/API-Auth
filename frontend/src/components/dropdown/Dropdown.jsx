import { useState, useRef, useEffect } from 'react'
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
        const loggedOut = await signOut()

        setDropIsOpen(!dropIsOpen)

        if (loggedOut) return navigate('/login')
    }

    function handleEditContainer() {
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

    useEffect(() => {
        if (dropIsOpen) {
            dropHeight()
        }
    }, [dropIsOpen])


    useEffect(() => {
        function closeDropdown(e) {

            const clickedElement = e.target.classList
            const userNameClicked = clickedElement.contains('user_infos')
            const IconArrowClicked = clickedElement.contains('dropIcon')

            if (!userNameClicked && !IconArrowClicked) {
                setDropIsOpen(false)
            }
        }

        window.addEventListener('click', closeDropdown)

        return () => window.removeEventListener('click', closeDropdown)
    }, [])

    return (
        <div ref={dropDown} className={`drop_container ${dropIsOpen ? 'open' : 'close'}`}>
            <div className='dropdown-item' onClick={handleEditContainer}>Editar</div>
            <div className='dropdown-item' onClick={() => setDropIsOpen(!dropIsOpen)}>Configurações</div>
            <div className='dropdown-item'><NavLink onClick={() => handleSignOut()}>Sair</NavLink></div>
        </div>
    )
}

export default Dropdown