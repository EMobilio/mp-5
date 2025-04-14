import {UrlProps} from "@/types";
import getCollection, {URLS_COLLECTION} from "@/db";


export default async function getRedirectUrl(alias: string): Promise<UrlProps | null> {
    // find the url object corresponding to this alias in the db
    const urlsCollection = await getCollection(URLS_COLLECTION);
    const res = await urlsCollection.findOne({ alias: alias });

    // return null if there is no object with this alias
    if (res === null) {
        return null;
    }

    const redirectUrl : UrlProps = {
        url: res.url,
        alias: res.alias,
    }

    return redirectUrl;
}