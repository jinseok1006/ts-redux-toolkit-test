import React, { useRef } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

interface Todo {
  id: number;
  text: string | undefined;
  done: boolean;
}

interface State {
  todos: Todo[];
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [
    {
      id: 1,
      text: '안녕',
      done: false,
    },
  ] as Todo[],
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      // immer 사용중..
      state.push(action.payload);
    },
  },
});

function Todos() {
  const todos = useSelector((state: State) => state.todos);
  const dispatch = useDispatch();

  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      if (inputRef.current.value === '') return alert('빈칸입니다.');

      const todo: Todo = {
        id: nextId.current++,
        text: inputRef.current?.value,
        done: false,
      };
      dispatch(todosSlice.actions.add(todo));

      inputRef.current.value = '';
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} />
        <button>제출</button>
      </form>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

const store = configureStore({
  reducer: { todos: todosSlice.reducer },
});

export default function App() {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  );
}
