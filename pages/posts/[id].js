import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

    // Auth
    const auth = await google.auth.getClient( { scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    // Query
    const { id } = query;
    const range = `Sheet1!A${id}:C${id}`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,
    });

    // Result
    const [menuType, menu, price] = response.data.values[0];

    return {
        props: {
            menuType,
            menu,
            price

        }
    }
}

export default function Post ({ menuType, menu, price}) {

    return <article>

        <h1> { menuType} </h1>
        <ul>
            <li> { menu} </li>
        </ul>
        <p> { price } </p>
    </article>
}