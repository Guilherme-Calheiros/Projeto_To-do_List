import StrictModeDroppable from "./StrictModeDroppable.jsx"
import AddIcon from '../../assets/plus_icon.svg';
import Task from "./Task.jsx"
import Button from "../Button.jsx"
import Input from "../Input.jsx"

const Column = ({ column, editStates, handleShowDiv, handleText, saveNewNameColumn, removeColumn, addItem, removeItem, saveNewNameItem, index }) => {
    return (
        <div className="flex flex-col">
            <StrictModeDroppable droppableId={column.id} key={column.id}>
                {(provided) => (
                    <>
                        {!editStates[column.id] && (
                            <div className="bg-white px-3 py-2 rounded-md mb-4 shadow-md border-t-4 border-primary-200 flex justify-between sm:w-80 w-64">
                                <h2 className="text-primary-300 cursor-pointer select-none font-bold text-xl" onDoubleClick={() => handleShowDiv(column.id)}>{column.name}</h2>
                                <button className="flex items-center" onClick={() => removeColumn(column.id)}>
                                    <svg className="hover:fill-gray-500 fill-gray-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19Z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        {editStates[column.id] && (
                            <div className="flex flex-col h-full w-full gap-3 p-3 bg-white mb-4 shadow-lg">
                                <div className="flex justify-between mb-5">
                                    <Input type="text" onChange={handleText} placeholder={column.name} />
                                    <button onClick={() => handleShowDiv(column.id)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.0664 12L21.1523 20.0977L20.0977 21.1523L12 13.0664L3.90234 21.1523L2.84766 20.0977L10.9336 12L2.84766 3.90234L3.90234 2.84766L12 10.9336L20.0977 2.84766L21.1523 3.90234L13.0664 12Z" fill="#F24E1E" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <Button text="Salvar" h="40px" onClick={() => saveNewNameColumn(column.id)} />
                                </div>
                            </div>
                        )}
                        <div className="bg-primary-100 sm:w-80 h-fit rounded flex flex-col p-3 w-64 shadow-md">
                            <div ref={provided.innerRef} className="flex flex-col p-4 gap-4">
                                {column.items.map((item, index) => (
                                    <Task key={item.id} item={item} editStates={editStates} handleShowDiv={handleShowDiv} handleText={handleText} saveNewNameItem={saveNewNameItem} removeItem={removeItem} columnId={column.id} index={index} />
                                ))}
                            </div>
                            {provided.placeholder}
                            <div className="flex gap-1 text-sm justify-center px-3 py-2 flex-col">
                                <button className="flex items-center" onClick={() => addItem(index)}>
                                    <img src={AddIcon} alt="Icone de adicionar" />
                                    <p className="text-base text-[#8F8F8F]">Adicionar tarefa</p>
                                </button>
                            </div>
                        </div>
                    </>
                )}

            </StrictModeDroppable>
        </div>
    )
}

export default Column