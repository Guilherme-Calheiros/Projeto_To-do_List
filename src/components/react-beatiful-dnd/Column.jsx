import StrictModeDroppable from "./StrictModeDroppable.jsx"
import Task from "./Task.jsx"
import Button from "../Button.jsx"
import Input from "../Input.jsx"

const Column = ({ column, editStates, handleShowDiv, handleText, saveNewNameColumn, removeColumn, addItem, removeItem, saveNewNameItem, index }) => {
    return (
        <div className="flex flex-col">
            <StrictModeDroppable droppableId={column.id} key={column.id}>
                {(provided) => (
                    <div className="bg-primary-100 sm:w-80 h-fit rounded flex flex-col p-1 w-64">
                        {!editStates[column.id] && (
                            <h2 className="text-black cursor-pointer select-none" onDoubleClick={() => handleShowDiv(column.id)}>{column.name}</h2>
                        )}
                        {editStates[column.id] && (
                            <div>
                                <Input type="text" onChange={handleText} placeholder={column.name} />
                                <button className="bg-red-500 p-1 border-none" onClick={() => handleShowDiv(column.id)}>X</button>
                                <Button onClick={() => saveNewNameColumn(column.id)} text="Salvar" />
                            </div>
                        )}
                        <div ref={provided.innerRef} className="flex flex-col p-4 gap-4">
                            {column.items.map((item, index) => (
                                <Task key={item.id} item={item} editStates={editStates} handleShowDiv={handleShowDiv} handleText={handleText} saveNewNameItem={saveNewNameItem} removeItem={removeItem} columnId={column.id} index={index} />
                            ))}
                        </div>
                        {provided.placeholder}
                        <div className="flex gap-1 text-sm justify-center items-center flex-col">
                            <Button text="Adicionar tarefa" onClick={() => addItem(index)} />
                            <Button text="Excluir lista" onClick={() => removeColumn(column.id)} />
                        </div>
                    </div>
                )}

            </StrictModeDroppable>
        </div>
    )
}

export default Column