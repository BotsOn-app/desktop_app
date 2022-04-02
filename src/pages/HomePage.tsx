import React from 'react';
import { BotInterfaces } from '../app/bots';
import ReactDOM from 'react-dom';
export class HomePage extends React.Component {

    getBots () {
        return window.api.on("bots", (bots: BotInterfaces[]) => {
            let map = bots.map((bot: BotInterfaces) => {
                return <li>{bot.token}</li>
            })

            return ReactDOM.render(
                map,
                document.getElementById('bots')
            )
        })
    }

    render() {
        window.api.getAllBot()

        return (
            <div>
                <h1>Home Page</h1>
                <ul id="bots">
                    {this.getBots()}
                </ul>
            </div>
        )
    }
}