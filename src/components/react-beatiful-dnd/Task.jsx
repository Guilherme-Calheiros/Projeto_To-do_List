import { Draggable } from "react-beautiful-dnd"
import { useState } from "react"
import Button from "../Button"
import Input from "../Input"

const Task = ({ item, editStates, handleShowDiv, saveNewNameItem, removeItem, columnId, index }) => {

    const [title, setTitle] = useState(item.title)
    const [content, setContent] = useState(item.content)
    const [deadline, setDeadline] = useState(item.deadline)

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleContent = (event) => {
        setContent(event.target.value)
    }
    const handleDate = (event) => {
        const dateString = event.target.value
        const date = new Date(dateString + 'T00:00:00Z');
        const utcOffset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() + utcOffset);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${day}/${month}/${year}`;
        setDeadline(formattedDate)
    }

    const newAttributes = {
        title: title,
        content: content,
        deadline: deadline,
    }

    return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided) => (
                <div className="bg-white" onDoubleClick={() => handleShowDiv(item.id)}>
                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className="h-auto flex flex-col gap-2 p-4 break-words" style={{ ...provided.draggableProps.style }}>
                        {!editStates[item.id] && (
                            <div className="relative p-3">
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="select-none">{item.content}</p>
                                <p className="bg-gray-200 text-center block absolute rounded-lg px-1 -right-3 -bottom-5">{item.deadline}</p>
                            </div>
                        )}
                        <div className="flex gap-1 text-sm justify-center items-center">
                            {editStates[item.id] && (
                                <div className="flex flex-col h-full w-full gap-3">
                                    <div className="flex justify-between mb-5 flex-col gap-3 items-center relative pt-4">
                                        <button className="absolute -right-3 -top-3" onClick={() => handleShowDiv(item.id)}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.0664 12L21.1523 20.0977L20.0977 21.1523L12 13.0664L3.90234 21.1523L2.84766 20.0977L10.9336 12L2.84766 3.90234L3.90234 2.84766L12 10.9336L20.0977 2.84766L21.1523 3.90234L13.0664 12Z" fill="#F24E1E" />
                                            </svg>
                                        </button>
                                        <Input type="text" onChange={handleTitle} placeholder={item.title} />
                                        <Input type="text" onChange={handleContent} placeholder={item.content} />
                                        <Input type="date" onChange={handleDate} />
                                    </div>
                                    <div className="flex gap-2 items-center flex-col sm:flex-row">
                                        <Button text="Salvar" h="52px" onClick={() => {saveNewNameItem(columnId, item.id, newAttributes); setTitle(""); setContent(""); setDeadline("")}} />
                                        <Button text="Remover tarefa" h="52px" onClick={() => removeItem(columnId, item.id)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Task