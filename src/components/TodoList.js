import React, {useEffect, useState} from 'react';
import FirebaseConfig from '../lib/FirebaseConfig';

const SORT_OPTIONS = {
    "TIME_ASC": {
        column: "time_seconds",
        direction: "asc"
    },
    "TIME_DESC": {
        column: "time_seconds",
        direction: "desc"
    },

    "TITLE_ASC": {
        column: "title",
        direction: "asc"
    },
    "TITLE_DESC": {
        column: "title",
        direction: "desc"
    }
}

function useTodos(sortBy = "TIME_ASC") {
    const [todos,setTodos] = useState([]);

    useEffect(() => {
        const unsubscribe = FirebaseConfig
            .firestore()
            .collection('times')
            .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                const newTodos = snapshot
                    .docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                setTodos(newTodos);
            })
        // for unmounting
        return () => unsubscribe();
    }, [sortBy])

    return todos;
}

// deleting todos item8
const handleDelete = (todoId) => {
    FirebaseConfig.firestore().collection('times').doc(todoId).delete();
}


export default function TodoList() {
    const [sortBy,setSortBy] = useState("TIME_ASC")
    const todos = useTodos(sortBy);

    return (
        <div className='todo-list'>

            <div className='sorting'>
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="TIME_ASC">Time (Fastest First)</option>
                    <option value="TIME_DESC">Time (Slowest First)</option>
                    <option value="TITLE_ASC">Title (a - z)</option>
                    <option value="TITLE_DESC">Title (z - a)</option>
                </select>
            </div>

            <div className='lists'>
                <ol>
                    {todos.map(todo => (
                        <li>{todo.title}
                            <code>{todo.time_seconds}
                                seconds
                            </code>
                            <i onClick={() => handleDelete(todo.id)} className="fas fa-trash"></i>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
