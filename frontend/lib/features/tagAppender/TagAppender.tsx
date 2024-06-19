import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, TextField} from "@mui/material";

interface Note {
    id: number,
    title: string,
    content: string,
}

interface Tag {
    id: number,
    name: string,
}

export default function TagAppender({note}: { note: Note | null }) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [newTagName, setNewTagName] = useState("");

    const updateTags = () => {
        axios.get(`http://tagnotes/api/note/${note?.id}/tags`).then((response) => {
            const payload = response.data;
            setTags(payload);
        })
    }

    useEffect(updateTags, []);

    const onDelClick = (tagId: number) => {
        axios.delete(`http://tagnotes/api/note/${note?.id}/tag/${tagId}`, {})
            .then(updateTags)
    }

    const onAddClick = () => {
        axios.post(`http://tagnotes/api/tag`, {name: newTagName}, {})
            .then((response) => {
                    const tag = response.data;
                    axios.post(`http://tagnotes/api/note/${note?.id}/tag/${tag.id}`)
                        .then(updateTags)
                        .catch((e)=>console.log(e))
                }
            )
            .catch((e)=>console.log(e))
    }

    const onChange = ({target: {value}}: { target: { value: string } }) => {
        setNewTagName(value)
    }

    return <Box bgcolor={'white'} height={200} width={400} padding={3} sx={{borderRadius: 3}}>
        {tags.map(tag => <Box fontSize={20}>{tag.name} <Button onClick={() => onDelClick(tag.id)}>Del</Button></Box>)}
        <TextField onChange={onChange}></TextField>
        <Button onClick={onAddClick}>Add tag</Button>
    </Box>
}
