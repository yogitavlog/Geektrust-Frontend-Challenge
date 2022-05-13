import React, {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import "./geektrust.css"

const Header = ({performSearch}) => {
    const [deBounceTimeout, setDeBounceTimeout] = useState(0);
    const debounceSearch = (event, debounceTimeout) => {
        const value = event.target.value;
        if(deBounceTimeout !== 0){
          clearTimeout(deBounceTimeout)
        }
        const newTimeout = setTimeout(() => performSearch(value), debounceTimeout);
        setDeBounceTimeout(newTimeout);
      };
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "1rem", mb: "2rem" }}>
                <Box className="header">
                    <input
                        type="text"
                        name="input"
                        placeholder="Search by name, email or role"
                        onChange={(event)=> debounceSearch(event,500)}
                    />
                    <Button
                        sx={{
                            backgroundColor: "#b3ffcc",
                            borderTopRightRadius: "60px",
                            borderBottomRightRadius: "60px",
                            cursor: "pointer",
                            width: "1rem",
                            "&:hover": {
                                backgroundColor: "#b3ffcc",
                            },
                        }}
                        endIcon={<SearchIcon sx={{ color: "#FFFFFF", width: "2rem", height: "2rem", paddingY: "0.2rem" }} />}
                        onClick={() => performSearch()}
                    ></Button>
                </Box>
            </Box>

        </>
    )
}
export default Header;