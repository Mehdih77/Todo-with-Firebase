import React, {useState} from 'react';
import FirebaseConfig from '../lib/FirebaseConfig';


export default function TodoForm() {

    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');

    // adding new todo
    function onSubmitTodo(e) {
        e.preventDefault();

        FirebaseConfig.firestore().collection('times')
        .add({
            title,
            time_seconds: parseInt(time)
        })
        .then(() => {
            // for clear inputs
            setTitle('')
            setTime('')
        })

    }


    return (
        <form onSubmit={onSubmitTodo} className='todo-form mt-3'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Add Title...' />
            <input value={time} onChange={(e) => setTime(e.target.value)} type="number"  placeholder='Add Time(second)...' />
            <button>Add</button>
        </form>
    )
}
