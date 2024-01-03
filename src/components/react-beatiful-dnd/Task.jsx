import { Draggable } from "react-beautiful-dnd"
import Button from "../Button"
import Input from "../Input"

const Task = ({ item, editStates, handleShowDiv, handleText, saveNewNameItem, removeItem, columnId, index }) => {
    return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided) => (
                <div className="bg-white" onDoubleClick={() => handleShowDiv(item.id)}>
                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className="h-auto flex flex-col gap-2 p-4 break-words" style={{ ...provided.draggableProps.style }}>
                        {!editStates[item.id] && (
                            <p className="select-none">{item.content}</p>
                        )}
                        <div className="flex gap-1 text-sm justify-center items-center">
                            {editStates[item.id] && (
                                <div className="flex flex-col h-full w-full gap-3">
                                    <div className="flex justify-between mb-5">
                                        <Input type="text" onChange={handleText} placeholder={item.content} />
                                        <button onClick={() => handleShowDiv(item.id)}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.0664 12L21.1523 20.0977L20.0977 21.1523L12 13.0664L3.90234 21.1523L2.84766 20.0977L10.9336 12L2.84766 3.90234L3.90234 2.84766L12 10.9336L20.0977 2.84766L21.1523 3.90234L13.0664 12Z" fill="#F24E1E" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex gap-2 items-center flex-col sm:flex-row">
                                        <Button text="Salvar" h="52px" onClick={() => saveNewNameItem(columnId, item.id)} />
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