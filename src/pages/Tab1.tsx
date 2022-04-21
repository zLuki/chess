import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonAlert } from '@ionic/react';
import { useState } from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {
  
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [globalBoard, setGlobalBoard] = useState([...Array(8)].map(e => [...Array(8)].map(e => '')));
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const buildPosition = () => {
    if (!fen.match(/\s*^(((?:[rnbqkpRNBQKP1-8]+\/){7})[rnbqkpRNBQKP1-8]+)\s([b|w])\s(-|[K|Q|k|q]{1,4})\s(-|[a-h][1-8])\s(\d+\s\d+)$/)) {
      setShowErrorAlert(true);
      return;
    }
    const board = globalBoard.map(e => e.slice());
    const position = fen.slice(0, fen.indexOf(" ")).split("/");
    console.log(position);
    for (let i = 0; i < position.length; i++) {
      let column = 0;
      for (let x = 0; x < position[i].length; x++) {
        if (/\d/.test(position[i])) {
          column += parseInt(position[i][x]);
          continue;
        }
        board[i][column] = position[i][x];
        column++;
      }
    }
    setGlobalBoard(board);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schach</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        {/* <IonTextarea>Hallo Welt</IonTextarea> */}
        <IonInput value={fen} onIonChange={e => setFen(e.detail.value!)}></IonInput>
        <IonButton onClick={buildPosition}>Stellung aufbauen</IonButton>
        
        {
          globalBoard.map((e,i) =>
          <div key={"row_"+i} className="outer-div">
            {e.map((e2,i2) =>
            <div key={"cell_"+(i+i2)} className={"inner-div " + ((i+i2)%2===0?"white":"black")}>
              {e2.length > 0 ? <img className='piece' alt="chess_piece"
                src={"assets/"+(e2.toLowerCase()===e2?"b_":"w_")+e2+".png"}
              /> : null}
            </div>)}
          </div>)
        }
        <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          message={"Invalid FEN!"}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
