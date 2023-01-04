import { postURLreservations } from './constants.js';

const dataForm = async (event, id, name, start, end) => {
    event.preventDefault();
    console.log(id, typeof id)
    console.log(name, typeof name)
    const response = await fetch(postURLreservations, {
        method: 'POST',
        body: JSON.stringify({
            "item_id": `"${id}"`,
            "username": `"${name}"`,
            "date_start": `"${start}"`,
            "date_end": `"${end}"`,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return response.json();
}

export default dataForm;
