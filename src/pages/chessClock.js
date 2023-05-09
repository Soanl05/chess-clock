import React, { useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


function ChessClock() {
  const [initialTime, setInitialTime] = useState(0);
  const [player1Time, setPlayer1Time] = useState(0);
  const [player2Time, setPlayer2Time] = useState(0);

  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);


  const handleStart = () => {
    setPlayer1Time(initialTime);
    setPlayer2Time(initialTime);

  };

  const handleReset = () => {
    setPlayer1Time(0);
    setPlayer2Time(0);
    setInitialTime(0);
  };


  useEffect(() => {
    let timer;

    if (isPlayer1Turn && player1Time > 0) {
      timer = setTimeout(() => {
        setPlayer1Time((time) => time - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isPlayer1Turn, player1Time]);

  useEffect(() => {
    let timer;

    if (!isPlayer1Turn && player2Time > 0) {
      timer = setTimeout(() => {
        setPlayer2Time((time) => time - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isPlayer1Turn, player2Time]);

  const handleStop = () => {
    setIsPlayer1Turn((isPlayer1Turn) => !isPlayer1Turn);
  };

  useEffect(() => {
    if (player1Time === 0 && !isPlayer1Turn) {
      alert("Player 2 wins!");
    } else if (player2Time === 0 && !isPlayer1Turn) {
      alert("Player 1 wins!");
    }
  }, [player1Time, player2Time]);

  return (
    <div className="container">
       <h1 style={{ textAlign:"center",     margin: "0 auto",
        float: "none",
        marginBottom: "10px",
        marginTop: "20px"}}>
        Chess Clock
      </h1>
      <Card style={{
        width: '18rem', alignItems: "center",
        margin: "0 auto",
        float: "none",
        marginBottom: "10px",
        marginTop: "20px"
      }}>
        <Card.Body>
          <Form.Label htmlFor="inputPassword5">  Initial Time (in seconds):</Form.Label>
          <Form.Control
            type="number"
            value={initialTime}
            onChange={(event) => setInitialTime(parseInt(event.target.value))}
            style={{ width: "150px" }}
          />
          <br />
          <Stack direction="horizontal" gap={2}>

          <Button variant="primary" onClick={handleStart}>Start</Button>
          <Button  variant="success" onClick={handleReset}>
    Reset
  </Button>
  </Stack>
          <div>
            <h3>Player 1:</h3>
            <p>{player1Time} seconds</p>
            {isPlayer1Turn && <Button variant="danger" onClick={handleStop}>Stop</Button>}
          </div>
          <div>
            <h3>Player 2:</h3>
            <p>{player2Time} seconds</p>
            {!isPlayer1Turn && <Button variant="danger" onClick={handleStop}>Stop</Button>}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ChessClock;
