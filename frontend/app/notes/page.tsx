'use client'

import axios from "axios";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'

interface Note {
    id: number,
    title: string,
    contents: string,
}

const queryClient = new QueryClient();

export default function WrapperNotes() {
    return <QueryClientProvider client={queryClient}>
        <Notes/>
    </QueryClientProvider>
}

function Notes() {
    const getNotes = async () => {
        const response = await axios.get<Note[]>("http://tagnotes/api/notes");
        return response.data;
    };
    const {isLoading, isError, data} = useQuery<Note[], Error>("notes", getNotes)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error!</div>
    }

    if (data === null || data === undefined) {
        return <div>Not Found!</div>
    }

    console.log(data);

    return <ul>
        {data?.map((note) => (<li key={note.id}>{note.title}</li>))}
    </ul>
}