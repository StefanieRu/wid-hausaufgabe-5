import "./App.css";
import {
  Table,
  Select,
  MenuItem,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import data from "../src/data/tableData.json";
import * as React from "react";
import { useState } from "react";

function App() {
  /*Konstanten definieren für DropDown-Liste (wie bei Hausaufgabe 2)*/
  const service = () => {
    const servicetyp = [
      ...new Set(data.map((element) => element.service).sort()),
    ];
    return servicetyp;
  };

  const anbieter = () => {
    const anbietername = [
      ...new Set(data.map((element) => element.anbieter).sort()),
    ];
    return anbietername;
  };
  /*Filter mit useState setzten, damit nur gewählter Service/Anbieter in Tabelle vorkommt.*/
  /*Konstanten setzen mit Defaultwerten, useState gemäss React-Denkweise*/
  const [selectService, setSelectService] = useState("Alle Dienste");
  const [selectAnbieter, setSelectAnbieter] = useState("Alle Anbieter");
  const [slideScore, setSlideScore] = useState(50);

  /*Filter definieren, Alle Einträge oder falls ander Auswahl, wird eintrag aus DropDown übernommen*/
  const filter = data.filter((eintrag) => {
    const serviceFilter =
      selectService === "Alle Dienste" || eintrag.service === selectService;
    const anbieterFilter =
      selectAnbieter === "Alle Anbieter" || eintrag.anbieter === selectAnbieter;
    const scoreFilter = slideScore === 50 || eintrag.score === slideScore;
    return serviceFilter && anbieterFilter && scoreFilter;
  });

  return (
    <div className="App">
      <div className="App-header" id="HeaderText">
        <div className="App-header" id="HeaderText">
          Ein Katalog für Schweizer Geodienste
        </div>
        <div className="Box">
          <Select
            value={selectService}
            onChange={(e) => setSelectService(e.target.value)}
          >
            <MenuItem value={"Alle Dienste"}>Alle Dienste</MenuItem>
            {service().map((eintrag, id) => (
              <MenuItem key={id} value={eintrag}>
                {eintrag}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={selectAnbieter}
            onChange={(e) => setSelectAnbieter(e.target.value)}
          >
            <MenuItem value={"Alle Anbieter"}>Alle Anbieter</MenuItem>
            {anbieter().map((eintrag, id) => (
              <MenuItem key={id} value={eintrag}>
                {eintrag}
              </MenuItem>
            ))}
          </Select>
          {/*Slider gemäss MozillaDeveloper inkl. Min/Max*/}
          <h5>Score:</h5>
          <input
            type="range"
            value={slideScore}
            min="0"
            max="100"
            step="25"
            onChange={(e) => setSlideScore(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div>
        <Table className="TableWrapper">
          <TableHead>
            <TableRow>
              <TableCell id="TableHeader">anbieter</TableCell>
              <TableCell id="TableHeader">datensatz</TableCell>
              <TableCell id="TableHeader">zusammenfassung</TableCell>
              <TableCell id="TableHeader">service</TableCell>
              <TableCell id="TableHeader">score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter.map((eintrag, id) => (
              <TableRow key={id}>
                <TableCell id="TableBody">{eintrag.anbieter}</TableCell>
                <TableCell id="TableBody">{eintrag.datensatz}</TableCell>
                <TableCell id="TableBody">{eintrag.zusammenfassung}</TableCell>
                <TableCell id="TableBody">{eintrag.service}</TableCell>
                <TableCell id="TableBody">{eintrag.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
