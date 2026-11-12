// Quadro: Piet Mondriaan, "Composition en rouge, jaune, bleu et noir", 1921
// Fonte: https://www.kunstmuseum.nl/nl/collectie/compositie-met-groot-rood-vlak-geel-zwart-grijs-en-blauw
// Regola cromatica: il rosso occupa il campo più grande; giallo e blu compaiono
// in campi più piccoli. I tre colori primari, piatti e saturi, sono separati
// da linee nere e bilanciati da zone bianche e grigie, molto più luminose.

const larghezzaTela = 600;
const altezzaTela = 600;
const dimensioneComposizione = 560;
const scalaComposizione = Math.min(larghezzaTela, altezzaTela) / dimensioneComposizione;
const posizioneComposizioneX = (larghezzaTela - dimensioneComposizione * scalaComposizione) / 2;
const posizioneComposizioneY = (altezzaTela - dimensioneComposizione * scalaComposizione) / 2;

const saturazioneVivida = 90;
const saturazioneSpenta = 78;
const saturazioneMassima = 100;
const luminositaMassima = 100;
const luminositaRosso = 43;
const luminositaGiallo = 45;
const luminositaBlu = 30;
const luminositaGrigioVivido = 82;
const luminositaGrigioSpento = 68;
const luminositaSfondo = 88;
const luminositaCarta = 94;
const luminositaNero = 5;
const tonoRosso = 0;
const tonoGiallo = 42;
const tonoBlu = 240;
const faseRosso = 0;
const faseGiallo = 2 * Math.PI / 3;
const faseBlu = 4 * Math.PI / 3;
const faseGrigio = Math.PI;
const indiceColoreRosso = 0;
const indiceColoreGiallo = 1;
const indiceColoreBlu = 2;
const indiceColoreGrigio = 3;
const giroTonalita = 360;
const ampiezzaScartoIniziale = 5;
const ampiezzaVariazioneTonalita = 20;
const frequenzaVariazioneTonalita = 0.025;
const frequenzaVariazioneSaturazione = 0.025;
let direzioneVariazioneTemporale = -1;
const paletteColori = [
  { tono: tonoRosso, luminosita: luminositaRosso, fase: faseRosso },
  { tono: tonoGiallo, luminosita: luminositaGiallo, fase: faseGiallo },
  { tono: tonoBlu, luminosita: luminositaBlu, fase: faseBlu },
  { tono: 0, luminosita: 0, fase: faseGrigio }
];

const campitureColorate = [
  { x: 69, y: 71, larghezza: 283, altezza: 284, indiceColore: indiceColoreRosso },
  { x: 342, y: 0, larghezza: 184, altezza: 81, indiceColore: indiceColoreGiallo },
  { x: 342, y: 71, larghezza: 184, altezza: 146, indiceColore: indiceColoreGiallo },
  { x: 0, y: 400, larghezza: 76, altezza: dimensioneComposizione - 400, indiceColore: indiceColoreGiallo },
  { x: 342, y: 415, larghezza: 184, altezza: 114, indiceColore: indiceColoreBlu },
  { x: 516, y: 415, larghezza: dimensioneComposizione - 516, altezza: dimensioneComposizione - 415, indiceColore: indiceColoreRosso }
];

const campitureGrigie = [
  { x: 0, y: 0, larghezza: 145, altezza: 81, indiceColore: indiceColoreGrigio },
  { x: 0, y: 207, larghezza: 76, altezza: 218, indiceColore: indiceColoreGrigio },
  { x: 218, y: 345, larghezza: 134, altezza: 80, indiceColore: indiceColoreGrigio },
  { x: 218, y: 415, larghezza: 134, altezza: 80, indiceColore: indiceColoreGrigio }
];

const riquadriColorati = campitureColorate.concat(campitureGrigie);

const campitureNere = [
  { x: 71, y: 352, larghezza: 147, altezza: 139, indiceColore: 0 },
  { x: 218, y: 492, larghezza: 307, altezza: 37, indiceColore: 1 }
];

const riquadriCliccabili = riquadriColorati.concat(campitureNere);

const lineeOrizzontali = [
  { x: 24, y: 76, larghezza: 502, spessore: 10 },
  { x: 25, y: 212, larghezza: 47, spessore: 9 },
  { x: 347, y: 212, larghezza: 174, spessore: 9 },
  { x: 74, y: 350, larghezza: 451, spessore: 10 },
  { x: 22, y: 420, larghezza: 52, spessore: 10 },
  { x: 217, y: 420, larghezza: dimensioneComposizione - 217, spessore: 10 },
  { x: 71, y: 490, larghezza: 147, spessore: 10 },
  { x: 218, y: 492, larghezza: 129, spessore: 11 }
];

const lineeVerticali = [
  { x: 74, y: 76, altezza: 459, spessore: 10 },
  { x: 141, y: 24, altezza: 49, spessore: 8 },
  { x: 218, y: 350, altezza: 179, spessore: 10 },
  { x: 347, y: 20, altezza: 509, spessore: 10 },
  { x: 438, y: 212, altezza: 140, spessore: 9 },
  { x: 521, y: 27, altezza: 509, spessore: 10 }
];

let scartoTonalitaIniziale;
let rotazioneOrdineColori = 0;
let tempoVariazione = 0;
let posizioneRiquadroNero = -1;
let neroSpostato = false;

function setup() {
  createCanvas(larghezzaTela, altezzaTela);
  colorMode(HSL, giroTonalita, saturazioneMassima, luminositaMassima);
  rectMode(CORNER);
  noStroke();
  scartoTonalitaIniziale = random(-ampiezzaScartoIniziale, ampiezzaScartoIniziale);
}

function draw() {
  tempoVariazione += direzioneVariazioneTemporale;
  cursor(mouseSuRiquadroCliccabile() ? HAND : ARROW);
  push();
  translate(posizioneComposizioneX, posizioneComposizioneY);
  scale(scalaComposizione);
  background(0, 0, luminositaSfondo);
  noStroke();
  fill(40, 12, luminositaCarta);
  rect(posizioneComposizioneX, posizioneComposizioneY, dimensioneComposizione, dimensioneComposizione);

  for (const campo of campitureNere) {
    if (!neroSpostato) {
      fill(0, 0, luminositaNero);
    } else {
      const indiceColore = (campo.indiceColore + rotazioneOrdineColori) % paletteColori.length;
      impostaColoreCampitura(indiceColore);
    }
    rect(
      posizioneComposizioneX + campo.x,
      posizioneComposizioneY + campo.y,
      campo.larghezza,
      campo.altezza
    );
  }

  for (const campo of riquadriColorati) {
    const indiceColore = (campo.indiceColore + rotazioneOrdineColori) % paletteColori.length;
    impostaColoreCampitura(indiceColore);
    rect(
      posizioneComposizioneX + campo.x,
      posizioneComposizioneY + campo.y,
      campo.larghezza,
      campo.altezza
    );
  }

  if (neroSpostato) {
    const campo = riquadriCliccabili[posizioneRiquadroNero];
    fill(0, 0, luminositaNero);
    rect(
      posizioneComposizioneX + campo.x,
      posizioneComposizioneY + campo.y,
      campo.larghezza,
      campo.altezza
    );
  }

  fill(0, 0, luminositaNero);
  for (const linea of lineeOrizzontali) {
    rect(
      posizioneComposizioneX + linea.x,
      posizioneComposizioneY + linea.y - linea.spessore / 2,
      linea.larghezza,
      linea.spessore
    );
  }

  for (const linea of lineeVerticali) {
    rect(
      posizioneComposizioneX + linea.x - linea.spessore / 2,
      posizioneComposizioneY + linea.y,
      linea.spessore,
      linea.altezza
    );
  }

  noStroke();
  pop();
}

function impostaColoreCampitura(indiceColore) {
  const colore = paletteColori[indiceColore];
  const faseTonalita = tempoVariazione * frequenzaVariazioneTonalita + colore.fase;
  const faseSaturazione = (1 - cos(
    tempoVariazione * frequenzaVariazioneSaturazione + colore.fase
  )) / 2;
  if (indiceColore === indiceColoreGrigio) {
    const luminosita = luminositaGrigioVivido
      + (luminositaGrigioSpento - luminositaGrigioVivido) * faseSaturazione;
    fill(0, 0, luminosita);
  } else {
    const tonalita = (
      colore.tono
      + scartoTonalitaIniziale
      + ampiezzaVariazioneTonalita * sin(faseTonalita)
      + giroTonalita
    ) % giroTonalita;
    const saturazione = saturazioneVivida
      + (saturazioneSpenta - saturazioneVivida) * faseSaturazione;
    fill(tonalita, saturazione, colore.luminosita);
  }
}

function mouseSuRiquadroCliccabile() {
  const x = (mouseX - posizioneComposizioneX) / scalaComposizione;
  const y = (mouseY - posizioneComposizioneY) / scalaComposizione;
  return riquadriCliccabili.some(campo =>
    x >= campo.x &&
    x <= campo.x + campo.larghezza &&
    y >= campo.y &&
    y <= campo.y + campo.altezza
  );
}

function mousePressed() {
  if (mouseSuRiquadroCliccabile()) {
    rotazioneOrdineColori = (rotazioneOrdineColori + 1) % paletteColori.length;
    posizioneRiquadroNero = (posizioneRiquadroNero + 1) % riquadriCliccabili.length;
    neroSpostato = true;
    direzioneVariazioneTemporale *= -1;
  }
}