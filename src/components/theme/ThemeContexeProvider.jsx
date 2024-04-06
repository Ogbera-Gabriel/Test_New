import { createContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export const ThemeContext = createContext();
export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
      
     useEffect(() => {
        localStorage.setItem('theme', theme)
     }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={theme == 'dark' ? darkTheme : lightTheme }>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}