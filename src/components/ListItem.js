import React from 'react'
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

const ListItem = ({ id, task, updateMode, removeTask }) => {
    return (
        <li key={id}>
            {task}
            <div className='icon_holder'>
                <BiEditAlt className='icon' onClick={() => updateMode(id, task)} />
                <BsTrash className='icon' onClick={() => removeTask(id)} />
            </div>
        </li>
    )
}

export default ListItem