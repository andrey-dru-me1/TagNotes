'use client'

import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Link, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface Note {
    id: number,
    title: string,
    content: string,
}

function NoteCard(props: { note: Note }) {

    return <Box key={props.note.id} margin={2} padding={1} height={70} width={700}
                sx={{backgroundColor: "lightgray", borderRadius: 2, input: {cursor: 'pointer'}}}>
        <Box fontSize={26} sx={{fontWeight: 'bold'}}>
            {props.note.title}
            <Link fontSize={14} sx={{fontWeight: 'normal'}} href={`/note/${props.note.id}`}> Edit</Link>
        </Box>
    </Box>
}

function NotesView(props: { notes: Note[] }) {
    const {notes} = props;
    return <ul>
        {notes?.map((note) => (<NoteCard key={note.id} note={note}/>))}
    </ul>
}

function NoteElement(props: { note: Note }) {
    const {note} = props;
    return <Box key={note.id} width={500}>
        <Box fontSize={26} sx={{fontWeight: 'bold'}}>
            {note.title}
            <Link fontSize={14} sx={{fontWeight: 'normal'}} href={`/note/${props.note.id}`}> Edit</Link>
        </Box>
        <Box>{note.content}</Box>
    </Box>
}

function OneNoteView(props: { notes: Note[] }) {
    const {notes} = props;
    return <ul>
        {notes.map((note) => (<NoteElement key={note.id} note={note}/>))}
    </ul>
}

enum NoteView {Notes, OneNote}


export default function Notes() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<Note[]>([]);
    const [view, setView] = useState<NoteView>(NoteView.Notes);

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

    const handleChange = (event: SelectChangeEvent<NoteView>) => {
        const {target: {value}} = event;
        if (typeof value !== 'string') {
            setView(value);
        }
    }

    return <Box>
        <Select onChange={handleChange} value={view}>
            <MenuItem value={NoteView.Notes}>Notes</MenuItem>
            <MenuItem value={NoteView.OneNote}>OneNote</MenuItem>
        </Select>
        {view == NoteView.Notes && <NotesView notes={data}/>}
        {view == NoteView.OneNote && <OneNoteView notes={data}/>}
    </Box>
}