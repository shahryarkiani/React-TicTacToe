import os from 'os'
import {WebSocketServer} from 'ws'

//Some code to get the local network address
const interfaces = os.networkInterfaces()
const addresses = []
for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
        const address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address)
        }
    }
}

const hostname = addresses[0]
const port = 8000

const wss = new WebSocketServer({host: hostname, port: port})

function Game(p1, p2) {
    this.p1 = p1
    this.p2 = p2
    this.xTurn = true
}

let latestGame = new Game(undefined, undefined, true)

wss.on('connection', (ws) => {

    ws.game = undefined


    if (latestGame.p1 === undefined) {
        console.log('Creating new game')
        ws.game = new Game(ws, undefined)
        latestGame = ws.game
    } else if (latestGame.p2 === undefined) {
        latestGame.p2 = ws
        ws.game = latestGame
        console.log('Game filled, Creating new')
        latestGame = new Game(undefined, undefined, true)
    }

    ws.on('message', (data) => {
        console.log(data.toString())


        if (ws.game.p1 === ws && ws.game.xTurn) {
            if (ws.game.p2 === undefined)
                return
            ws.game.p2.send(data.toString())
            ws.send(data.toString())
            ws.game.xTurn = !ws.game.xTurn
        } else if (ws.game.p2 === ws && !ws.game.xTurn) {
            ws.game.p1.send(data.toString())
            ws.send(data.toString())
            ws.game.xTurn = !ws.game.xTurn
        } else {
            console.log('Illegal Move')
        }
    })


})

console.log('Listening at ' + hostname + ':' + port)

