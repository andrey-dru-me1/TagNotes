'use client'

import {Box, TextField} from "@mui/material";
import {Stack} from "@mui/material";
import {Button} from "@mui/material";
import {useState} from "react";
import axios from "axios";

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = () => {
        axios({
            method: "post",
            url: "http://tagnotes/api/login",
            data: {"name": username, "password": password},
            headers: {"Content-Type": "application/json"},
        }).then((response => console.log(response))).catch(e => console.log(e));
    }

    return <Box alignItems="center" justifyContent="center" height="100vh">
        <Stack spacing={2} alignItems="center" justifyContent="center" height="100vh">
            <TextField label="Username" type={"text"} placeholder="Username" variant="outlined" required={true}
                       onChange={(t) => setUsername(t.target.value)}/>
            <TextField label="Password" type={"password"} placeholder="Password" variant="outlined" required={true}
                       onChange={(t) => setPassword(t.target.value)}/>
            <Button variant="contained" color="primary" type="submit" onClick={handleClick}>Login</Button>
        </Stack>
    </Box>;
}
