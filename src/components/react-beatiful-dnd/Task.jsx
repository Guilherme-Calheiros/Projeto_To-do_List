import { Draggable } from "react-beautiful-dnd"
import Button from "../Button"
import Input from "../Input"

const Task = ({ item, editStates, handleShowDiv, handleText, saveNewNameItem, removeItem, columnId, index }) => {
    return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided) => (
                <div className="bg-white">
                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className="h-auto flex flex-col gap-2 p-4" style={{ ...provided.draggableProps.style }}>
                        {!editStates[item.id] && <p className="select-none">{item.content}</p>}
                        <div className="flex gap-1 text-sm justify-center items-center">
                            {!editStates[item.id] && (
                                <>
                                    <Button text="Remover tarefa" onClick={() => removeItem(columnId, item.id)} />
                                    <Button text="Editar nome" onClick={() => handleShowDiv(item.id)} />
                                </>
                            )}
                            {editStates[item.id] && (
                                <div>
                                    <Input type="text" onChange={handleText} placeholder={item.content} />
                                    <button className="bg-red-500 p-1 border-none" onClick={() => handleShowDiv(item.id)}>X</button>
                                    <Button text="Salvar" onClick={() => saveNewNameItem(columnId, item.id)} />
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