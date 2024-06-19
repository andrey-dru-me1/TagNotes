'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, TextField} from "@mui/material";

interface Note {
    id: number,
    title: string,
    content: string,
}

export default function NoteEdit({params: {noteId}}: { params: { noteId: number } }) {
    const [note, setNote] = useState<Note | null>(null);

    useEffect(() => {
        axios.get(`http://tagnotes/api/note/${noteId}`).then((response) => {
            const payload = response.data;
            setNote(payload);
        })
    }, []);

    const onTitleChange = (event: { target: { value: string } }) => {
        if (note) {
            setNote({...note, title: event.target.value});
        }
    }

    const onContentChange = (event: { target: { value: string } }) => {
        if (note) {
            setNote({...note, content: event.target.value});
        }
    }

    const onSaveClick = () => {
        console.log('Clicked')
        if (note) {
            axios.post(`http://tagnotes/api/note/${noteId}`, note, {headers: {'Content-Type': 'application/json'}}).then((response) => {
                console.log(response)
            });
        } else {
            console.log(note);
        }
    }

    return <Box padding={5} width={700} sx={{borderRadius: 3, backgroundColor: 'lightgray'}}>
        <TextField fullWidth={true} defaultValue={note?.title} onChange={onTitleChange}/>
        <TextField multiline fullWidth={true} defaultValue={note?.content} onChange={onContentChange}/>
        <Button variant={'outlined'} onClick={onSaveClick}>Save</Button>
    </Box>
}
