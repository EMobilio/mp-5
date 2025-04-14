import {redirect} from "next/navigation";
import getRedirectUrl from "@/lib/getRedirectUrl";


export default async function AliasPage({
        params,
    }: {
        params: Promise<{ alias: string }>
    }) {
    const alias = await params;
    const redirectUrl = await getRedirectUrl(alias.alias);

    if (!redirectUrl) {
        redirect('/');
    } else {
        const url = redirectUrl.url;
        redirect(url);
    }
}