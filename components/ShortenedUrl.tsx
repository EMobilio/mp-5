import {FormHelperText} from "@mui/material";

export default function ShortenedUrl(props  : {shortenedUrl: string}) {
    return (
        <div className={"mt-5 text-xl text-left w-full"}>
            <FormHelperText sx={{fontSize: "1.1rem"}}>
                Your URL:
            </FormHelperText>

            <a href={props.shortenedUrl}
               target={"_blank"}
               className={"font-semibold text-2xl text-[#D183C9] hover:underline hover:text-[#DCABDF]"}
            >
                {props.shortenedUrl}
            </a>
        </div>
    );
}