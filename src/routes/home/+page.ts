import type {Load} from "@sveltejs/kit";
import {env} from "$env/dynamic/public";

export const load: Load = async ({ fetch }) => {
    let res = await fetch(`${env.PUBLIC_API_URL}`);
    let data = await res.json();
    return {
        author:  {
            name: "Saimogu",
            extensions: []
        }
    }
}