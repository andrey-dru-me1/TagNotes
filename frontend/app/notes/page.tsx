'use client'

import axios from "axios";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";

interface Note {
    id: number,
    title: string,
    content: string,
}

interface NoteCardProps {
    note: Note,
}

function NoteCard(props: NoteCardProps) {
    return <Box key={props.note.id} margin={2} padding={1} height={70} sx={{backgroundColor: "lightgray", borderRadius: 2}}>
        <Box fontSize={26} sx={{fontWeight: 'bold'}}>{props.note.title}</Box>
    </Box>
}


export default function Notes() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<Note[]>([]);

    useEffect(() => {
        axios.get<Note[]>("http://tagnotes/api/notes").then((response) => {
                setIsLoading(false);
                const payload: Note[] = response.data;
                setData(payload);
            }
        ).catch(err => {
                console.log(err);
                setIsLoading(false);
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
        {data?.map((note) => (<NoteCard key={note.id} note={note}/>))}
    </ul>
}