import { useState, useEffect } from 'react'
import SignoutButton from '../SignoutButton.jsx'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import StrictModeDroppable from '../react-beatiful-dnd/StrictModeDroppable.jsx'
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://to-do.pockethost.io');

function Home() {

    const [columns, setColumns] = useState([])
    const [objectEditStates, setIObjectEditStates] = useState({});
    const [newText, setNewText] = useState()

    useEffect(() => {
        const pbData = async () => {
            const authDataString = localStorage.getItem('authData')
            const authData = JSON.parse(authDataString)
            const userId = authData.record.id

            try {
                const record = await pb.collection('table').getOne(userId);
                const data = record.list
                setColumns(data)
            } catch (error) {
                console.log(error)
            }
        }
        pbData()
    }, [])

    useEffect(() => {
        const update = async () => {
            const authDataString = localStorage.getItem('authData')
            const authData = JSON.parse(authDataString)
            const userId = authData.record.id
            
            try {
                const jsonTable = JSON.stringify(columns)
                const data = {
                    "list": jsonTable
                };
        
                const record = await pb.collection('table').update(userId, data);
                
            } catch (error) {
                console.log(error)
            }
        }
        update()

    }, [columns])

    const onDragEnd = (result) => {
        let draggedItem = {}
        let sourceColumnItems = []
        let destinationColumnItems = []
        let sourceColumnId = 0
        let destinationColumnId = 0

        for (let i in columns) {
            if (result.source.droppableId == columns[i].id) {
                sourceColumnItems = columns[i].items
                sourceColumnId = i
            } else if (result.destination.droppableId == columns[i].id) {
                destinationColumnItems = columns[i].items
                destinationColumnId = i
            }
        }

        for (let i in sourceColumnItems) {
            if (sourceColumnItems[i].id == result.draggableId) {
                draggedItem = sourceColumnItems[i]
            }
        }

        let filteredSourceColumnItems = sourceColumnItems.filter((item) => item.id != result.draggableId)

        if (result.source.droppableId == result.destination.droppableId) {
            filteredSourceColumnItems.splice(result.destination.index, 0, draggedItem)

            let columnsCopy = JSON.parse(JSON.stringify(columns))
            columnsCopy[sourceColumnId].items = filteredSourceColumnItems
            setColumns(columnsCopy)
        } else {
            destinationColumnItems.splice(result.destination.index, 0, draggedItem)

            let columnsCopy = JSON.parse(JSON.stringify(columns))
            columnsCopy[sourceColumnId].items = filteredSourceColumnItems
            columnsCopy[destinationColumnId].items = destinationColumnItems
            setColumns(columnsCopy)
        }
    }

    const addColumn = () => {
        const maxId = Math.max(...columns.map(column => parseInt(column.id, 10)), 0);
        const newColumnId = (maxId + 1).toString().padStart(2, '0');
        const newColumn = { name: `Nova coluna ${newColumnId}`, id: newColumnId, items: [] };
        handleShowDiv(newColumn.id)

        setColumns([...columns, newColumn]);
    };

    const removeColumn = (id) => {
        const newColumns = columns.filter((column) => column.id != id)
        setColumns(newColumns)
    }

    const addItem = (index) => {
        const allItems = columns.reduce((acc, column) => [...acc, ...column.items], []);
        const newItemId = (allItems.length > 0 ? Math.max(...allItems.map(item => parseInt(item.id))) : 0) + 1;
        const newItem = { id: newItemId.toString(), content: `Novo item ${newItemId}` }

        columns[index].items.push(newItem)
        handleShowDiv(newItem.id)

        setColumns([...columns])
    }

    const removeItem = (columnId, itemId) => {
        const updatedColumn = columns.map((column) => {
            if (column.id === columnId) {
                const updatedItems = column.items.filter(item => item.id !== itemId)
                return { ...column, items: updatedItems };
            }
            return column
        })

        setColumns(updatedColumn)
    }

    const handleShowDiv = (id) => {
        setIObjectEditStates((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id],
        }));
    };

    const handleText = (event) => {
        setNewText(event.target.value)
    }

    const saveNewNameItem = (columnId, itemId) => {
        const updatedColumn = columns.map((column) => {
            if (column.id === columnId) {
                const editItem = column.items.find(item => item.id === itemId)
                if (editItem) {
                    editItem.content = newText
                }
            }
            return column
        })

        setColumns(updatedColumn)
        setNewText()
        handleShowDiv(itemId)
    }

    const saveNewNameColumn = (columnId) => {
        setColumns((prevColumns) => {
            const editColumn = prevColumns.find(column => column.id === columnId)
            if (editColumn) {
                editColumn.name = newText
            }

            return [...prevColumns]
        })
        setNewText()
        handleShowDiv(columnId)
    }

    return (
        <>
            <SignoutButton />
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map((column, index) => (
                        <div key={column.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            <StrictModeDroppable droppableId={column.id} key={column.id}>
                                {(provided) => (
                                    <div style={{ backgroundColor: "white", width: 320, height: 'fit-content', borderRadius: 5, display: 'flex', flexDirection: 'column', padding: 5 }}>
                                        {!objectEditStates[column.id] && (
                                            <h2 style={{ color: 'black', cursor: 'pointer', userSelect: 'none' }} onDoubleClick={() => handleShowDiv(column.id)}>{column.name}</h2>
                                        )}
                                        {objectEditStates[column.id] && (
                                            <div>
                                                <input style={{ padding: 5 }} type="text" onChange={handleText} />
                                                <button style={{ backgroundColor: 'red' }} onClick={() => handleShowDiv(column.id)}>Fechar</button>
                                                <button onClick={() => saveNewNameColumn(column.id)}>Salvar</button>
                                            </div>
                                        )}
                                        <div ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', padding: 15, gap: 15 }}>
                                            {column.items.map((item, index) => (
                                                <Draggable draggableId={item.id} index={index} key={item.id}>
                                                    {(provided) => (
                                                        <div style={{ backgroundColor: 'gray' }}>
                                                            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} style={{ backgroundColor: 'gray', height: 'auto', display: 'flex', flexDirection: 'column', gap: 10, padding: 15, ...provided.draggableProps.style }}>
                                                                {!objectEditStates[item.id] && (
                                                                    <p style={{ userSelect: 'none' }}>{item.content}</p>
                                                                )}
                                                                <div style={{ display: 'flex', gap: 5, fontSize: 14, justifyContent: 'center', alignItems: 'center' }}>
                                                                    {!objectEditStates[item.id] && (
                                                                        <>
                                                                            <button style={{ backgroundColor: 'blueviolet' }} onClick={() => removeItem(column.id, item.id)}>Remover tarefa</button>
                                                                            <button style={{ backgroundColor: 'blueviolet' }} onClick={() => handleShowDiv(item.id)}>Editar nome</button>
                                                                        </>
                                                                    )}
                                                                    {objectEditStates[item.id] && (
                                                                        <div>
                                                                            <input type="text" onChange={handleText} />
                                                                            <button style={{ backgroundColor: 'red' }} onClick={() => handleShowDiv(item.id)}>Fechar</button>
                                                                            <button onClick={() => saveNewNameItem(column.id, item.id)}>Salvar</button>
                                                                        </div>
                                                                    )}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                        {provided.placeholder}
                                        <div style={{ display: 'flex', gap: 5, fontSize: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <button onClick={() => addItem(index)}>Adicionar tarefa</button>
                                            <button onClick={() => removeColumn(column.id)}>Excluir</button>
                                        </div>
                                    </div>
                                )}
                            </StrictModeDroppable>
                        </div>
                    ))}
                </DragDropContext>
                <button onClick={addColumn}>Adicionar Coluna</button>
            </div>
        </>
    )
}

export default Home