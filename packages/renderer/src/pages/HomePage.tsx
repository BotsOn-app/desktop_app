import React from 'react';
import { Link } from 'react-router-dom';
/*
const getBots: React.FC = () => {
    return window.api.on("get-bots-reply", (bots: BotInterfaces[]) => {
        let map = bots.map((bot: BotInterfaces) => {
            return <li>{bot.name}</li>
        })

        return map
    })
}
*/

export const HomePage: React.FC = (props) => {
    return (
        <div>
            <h1>Home Page</h1>
            <ul id="bots">
                <Link to="/settings">Go to Settings</Link>
            </ul>
        </div>
    )
}