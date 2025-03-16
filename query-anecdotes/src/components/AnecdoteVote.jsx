import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const AnecdoteVote = ({anecdotes}) => {
    const { dispatch } = useContext(NotificationContext)
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        }
    })

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        dispatch({ type: "SHOW", payload: `anecdote "${anecdote.content}" voted`})
        setTimeout(() => {
            dispatch({ type: 'HIDE' })
        }, 5000)
    }

    return (
        <div>
            {anecdotes?.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteVote