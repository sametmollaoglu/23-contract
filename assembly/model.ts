import { u128, context, PersistentMap, math, storage} from "near-sdk-as";

export const games = new PersistentMap<u32, game_23>("game");

@nearBindgen
export class player {
    playerId: string;
    gameId: u32;
    sum: u32;
    isMyTurn: bool;

    constructor() {
        this.playerId= context.sender;
        this.sum= 0;
        this.isMyTurn=false;
    }
}

@nearBindgen
export class game_23 {

    gameId: u32;
    bet: u128;
    initiatorPlayer: player;
    guestPlayer: player;
    readyToStart: bool;


    constructor() {
        this.gameId = math.hash32<string>(context.sender);
        this.bet = context.attachedDeposit;
        this.readyToStart= false;

        storage.set<u32>("gameId", this.gameId);
    }

    
    static getGameId(): u32 {
        const storedGameId = storage.getPrimitive<u32>("gameId", 0);
        return storedGameId;
      }
}

