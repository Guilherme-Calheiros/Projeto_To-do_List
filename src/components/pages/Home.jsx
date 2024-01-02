import { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from '../react-beatiful-dnd/Column.jsx';
import Header from '../Header.jsx';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://to-do.pockethost.io').autoCancellation(false);

function Home() {

    const [columns, setColumns] = useState([])
    const [editStates, setEditStates] = useState({});
    const [newText, setNewText] = useState()
    const [username, setUsername] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        const pbData = async () => {
            const authDataString = localStorage.getItem('authData')
            const authData = JSON.parse(authDataString)
            const userId = authData.record.id
            const userName = authData.record.username

            try {
                const record = await pb.collection('users').getOne(userId);
                const data = record.tasks
                setColumns(data)
                setUsername(userName)
                setUserId(userId)
            } catch (error) {
                console.error(error)
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
                    "tasks": jsonTable
                };

                const record = await pb.collection('users').update(userId, data);

            } catch (error) {
                console.error(error)
            }
        }
        update()

    }, [columns])

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result

        const sourceColumn = columns.find((column) => column.id === source.droppableId)
        const destinationColumn = columns.find((column) => column.id === destination.droppableId)
        const draggedItem = sourceColumn.items.find((item) => item.id === draggableId)

        const filteredSourceColumnItems = sourceColumn.items.filter((item) => item.id !== draggableId)

        if (source.droppableId === destination.droppableId) {
            filteredSourceColumnItems.splice(destination.index, 0, draggedItem);
            setColumns((prevColumns) => {
                const columnsCopy = [...prevColumns]
                columnsCopy.find((column) => column.id === source.droppableId).items = filteredSourceColumnItems;
                return columnsCopy;
            })
        } else {
            const destinationItems = [...destinationColumn.items];
            destinationItems.splice(destination.index, 0, draggedItem);

            setColumns((prevColumns) => {
                const columnsCopy = [...prevColumns];
                columnsCopy.find((column) => column.id === source.droppableId).items = filteredSourceColumnItems;
                columnsCopy.find((column) => column.id === destination.droppableId).items = destinationItems;
                return columnsCopy;
            });
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
        setEditStates((prevStates) => ({
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
            <Header username={username} key={userId}/>
            <div className='flex gap-5 flex-wrap flex-col items-center lg:flex-row lg:items-start px-3 mt-6'>
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map((column, index) => (
                        <Column
                            key={column.id}
                            column={column}
                            editStates={editStates}
                            handleShowDiv={handleShowDiv}
                            handleText={handleText}
                            saveNewNameColumn={saveNewNameColumn}
                            removeColumn={removeColumn}
                            addItem={addItem}
                            removeItem={removeItem}
                            saveNewNameItem={saveNewNameItem}
                            index={index}
                        />
                    ))}
                </DragDropContext>
                <button onClick={addColumn}>Adicionar Coluna</button>
            </div>
        </>
    )
}

export default Home