import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const AnecdoteForm = () => {
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({ type: "SHOW", payload: `Successfully added "${newAnecdote.content}"`})
      setTimeout(() => {
        dispatch({ type: "HIDE" })
      }, 5000)
    },
    onError: (error) => {
      dispatch({ type: "SHOW", payload: error.response.data.error})
      setTimeout(() => {
        dispatch({ type: "HIDE" })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      dispatch({ type: "SHOW", payload: 'too short anecdote, must have length 5 or more '})
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
      return
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
