import {Box, TextField} from "@mui/material";
import {Stack} from "@mui/material";
import {Button} from "@mui/material";

export default function SignupPage() {
    return <Box alignItems="center" justifyContent="center">
        <Stack spacing={2} alignItems="center">
            <TextField label="Username" type={"text"} placeholder="Username" variant="outlined" required={true}/>
            <TextField label="Password" type={"password"} placeholder="Password" variant="outlined" required={true} />
            <Button variant="contained" color="primary" type="submit">Sign up</Button>
        </Stack>
    </Box>
}
