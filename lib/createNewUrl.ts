"use server";
import getCollection, { URLS_COLLECTION } from "@/db";
import {UrlProps} from "@/types";


export default async function createNewUrl(
    url: string,
    alias: string,
) : Promise<{success: boolean, error?: string, data?: UrlProps}> {
    console.log("Creating new url...");

    const shortened : UrlProps = {
        url: url,
        alias: alias,
    }

    // get the URLs collection
    const urlsCollection = await getCollection(URLS_COLLECTION);

    // check if the URL is invalid and throw an error if so
    try {
        await fetch(url);
    } catch {
        return { success: false, error: "Invalid URL: Please enter a valid URL" };
    }

    // check if the alias is already in the db and throw an error if so
    const existingAlias = await urlsCollection.findOne({ alias: alias })
    if (existingAlias) {
        return { success: false, error: "Invalid alias: This alias is already taken" };
    }

    // insert the shortened URL into the db
    const res = await urlsCollection.insertOne({...shortened})
    if (!res.acknowledged) {
        return { success: false, error: "DB insert failed" };
    }

    return { success: true, data: {...shortened} };
}