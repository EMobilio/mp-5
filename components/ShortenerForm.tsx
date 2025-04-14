"use client";
import { Button, FormHelperText, TextField, InputLabel } from "@mui/material";
import {FormEvent, useState} from "react";
import createNewUrl from "@/lib/createNewUrl";
import ShortenedUrl from "@/components/ShortenedUrl";


export default function ShortenerForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");

    async function handleSubmit(event : FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setShortenedUrl("");
        setErrorMessage("");

        // call createNewUrl to shorten the URL, set the shortened URL state if successful,
        // and set the error message in case of an error
        try {
            const res = await createNewUrl(url, alias);

            if (res.success) {
                setShortenedUrl("https://mp-5-tau.vercel.app/" + alias);
            } else {
                const err = res.error as string;
                setErrorMessage(err);
            }
        } catch {
            setErrorMessage("Server error: Please try again later");
        }
    }

    return (
        <div className={"flex flex-col items-center bg-white rounded-2xl w-[95%] sm:w-[50%] border-1 border-[#8797B2] p-10"}>
            <form className={"flex flex-col items-center w-full"}
                  onSubmit={handleSubmit}
            >
                <h2 className={"text-3xl font-semibold"}>URL Shortener</h2>

                {/* MUI helper text */}
                <FormHelperText sx={{ fontSize: "1.1rem" }}>
                    Enter a URL to create a shorter one!
                </FormHelperText>

                {/* MUI text field for URL */}
                <TextField
                    id={"URL"}
                    label={"URL"}
                    variant={"outlined"}
                    fullWidth
                    required
                    placeholder={"https://example.io/long/example"}
                    sx={{ backgroundColor: "white", margin: "3%",
                        "& .MuiInputBase-input": {
                            paddingLeft: "10px",
                        }
                    }}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                {/* MUI text field for alias */}
                <div className={"flex items-center w-full"}>
                    <InputLabel sx={{ fontSize: "1.1rem", maxWidth: "fit-content"}}>https://mp-5-tau.vercel.app/</InputLabel>
                    <TextField
                        id={"alias"}
                        label={"Custom Alias"}
                        variant={"outlined"}
                        placeholder={"your-alias"}
                        required
                        sx={{ backgroundColor: "white", margin: "3%",
                            "& .MuiInputBase-input": {
                                paddingLeft: "10px",
                            }
                        }}
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                    />
                </div>

                {/* MUI submit button */}
                <Button
                    sx={{  backgroundColor: "#D183C9", color: "white", height: "40px", "&:hover": { backgroundColor: "#DCABDF" } }}
                    fullWidth
                    type={"submit"}
                    variant={"contained"}
                >
                    Shorten
                </Button>

                {/* conditionally render the error message if there is one */}
                {errorMessage && (<FormHelperText sx={{ fontSize: "1.1rem", marginTop: "3%", color: "red" }}>{errorMessage}</FormHelperText>)}
            </form>

            {/* conditionally render the shortened URL if the creation was successful and there is one */}
            {shortenedUrl && (<ShortenedUrl shortenedUrl={shortenedUrl} />)}
        </div>
    );
}