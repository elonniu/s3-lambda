import {jsonResponse} from "sst-helper";

export function handler(event: any) {
    console.log(JSON.stringify(event, null, 2));
    return jsonResponse({event});
}
