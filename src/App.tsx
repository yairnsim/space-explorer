import { useState } from "react";
import Header from "./components/Header";
import MissionCard from "./components/MissionCard";
import PlanetMap from "./components/PlanetMap";
import Garage from "./components/Garage";
import TreasureBox from "./components/TreasureBox";
import "./styles/app.css";

export type GameData = {
  xp:number;
  coins:number;
  missions:number;
  streak:number;
  treasureReady:boolean;
  treasureOpened:boolean;
};

export default function App(){
 const [gameData,setGameData]=useState<GameData>({
  xp:Number(localStorage.getItem("xp")||0),
  coins:Number(localStorage.getItem("coins")||0),
  missions:Number(localStorage.getItem("missions")||0),
  streak:Number(localStorage.getItem("streak")||0),
  treasureReady:localStorage.getItem("treasureReady")==="true",
  treasureOpened:localStorage.getItem("treasureOpened")==="true"
 });
 return <div className="app" dir="rtl"><div className="container"><Header xp={gameData.xp} coins={gameData.coins} streak={gameData.streak}/><MissionCard gameData={gameData} setGameData={setGameData}/><PlanetMap/><Garage/><TreasureBox gameData={gameData} setGameData={setGameData}/></div></div>
}
