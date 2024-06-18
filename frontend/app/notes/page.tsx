'use client'

import axios from "axios";
import {useEffect, useState} from "react";

interface Note {
    id: number,
    title: string,
    content: string,
}


export default function Notes() {
    const [isLoading , setIsLoading] = useState(true);
    const[isError, setIsError] = useState(false);
    const[data, setData] = useState<Note[]>([]);

    useEffect( () => {
        axios.get<Note[]>("http://tagnotes/api/notes").then( (response) => {
            setIsLoading(false);
            const payload :Note[] = response.data;
            setData(payload);
        }
        ).catch( err => {
            console.log(err);
            setIsError(true);
        }
        );
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error!</div>
    }

    return <ul>
        {data?.map((note) => (<li key={note.id}>
            <div style={{fontWeight: 700}}>{note.title}</div>
            <div>{note.content}</div>
        </li>))}
    </ul>
}