// Testo di partenza: "Perciò, per provare, accendo un’ultima sigaretta e forse la getterò via subito, disgustato"
// Font: "HostGrotesk-Regular.ttf"

const larghezzaTela = 800;
const altezzaTela = 600;
const durataFumoClick = 480;
const altezzaFumoClick = altezzaTela / 2 + 30;
const ampiezzaOscillazioneFumoClick = 24;
const oscillazioniFumoClick = 1;
const passoFaseFumo = 0.08;
const velocitaRaccoltaFumo = 1.5;
const margineTesto = 12;
const testoBase = "Perciò, per provare, accendo un’ultima sigaretta e forse la getterò via subito, disgustato";
const nomeFont = "HostGrotesk-Regular.ttf";
const dimensioneTesto = 14;
const durataCicloAnimazione = 1610.6;
const durataIlluminazione = 24;
const intervalloIlluminazione = 1.5;
const accensioniPerCiclo = 10;
const amplificazioneLuceAccendo = 2.2;
const amplificazioneBaglioreAccendo = 2.8;
const ampiezzaOscillazioneAccendo = 0.18;
const velocitaOscillazioneAccendo = 0.25;
const frameTraAccendoGettero = 90;
const intervalloCadutaGettero = 5;
const durataCadutaGettero = 24;
const attesaRitornoGettero = 60;
const durataAndataRitornoGettero = durataCadutaGettero * 2 + attesaRitornoGettero;
const altezzaCadutaGettero = 180;
const altezzaFumoGettero = 35;
const separazioneFluttuazioneGettero = 8;
const ampiezzaFluttuazioneGettero = 16;
const velocitaFluttuazioneGettero = 0.1;
const intensitaMinimaIlluminazioneCaduta = 0.5;
const caduteGetteroPerCiclo = 10;
const durataRallentamento = 60;
const fattoreVelocitaIlluminazioneGettero = 0.15;

let font;
let caratteriTestuali = [];
let offsetFrase;
let larghezzaTesto;
let fattoreScalaTesto;
let frameInizioRallentamento;
let tempoIlluminazione;
let tempoAnimazione = 0;
let passoTempoAnimazione = 1;
let tempoInizioFumo = null;

async function setup() {
  createCanvas(larghezzaTela, altezzaTela);
  cursor("crosshair");
  font = await loadFont(nomeFont);
  textFont(font);
  textSize(dimensioneTesto);
  textAlign(LEFT, CENTER);
  preparaCaratteri();
  preparaCaduteGettero();
  frameInizioRallentamento = -Infinity;
  tempoIlluminazione = 0;
  tempoAnimazione = 0;
}

function draw() {
  background(0);
  fill(255);
  textFont(font);
  textSize(dimensioneTesto * fattoreScalaTesto);
  textAlign(LEFT, CENTER);

  const rallentamentoAttivo = tempoAnimazione - frameInizioRallentamento < durataRallentamento;
  tempoIlluminazione += (rallentamentoAttivo
    ? fattoreVelocitaIlluminazioneGettero
    : 1) * passoTempoAnimazione;
  tempoAnimazione += passoTempoAnimazione;

  if (tempoInizioFumo !== null
    && tempoAnimazione - tempoInizioFumo >= durataFumoClick) {
    tempoInizioFumo = null;
  }

  for (const carattere of caratteriTestuali) {
    disegnaCarattere(carattere);
  }
}

function mousePressed() {
  if (tempoInizioFumo !== null
    || caratteriTestuali.length === 0) {
    return;
  }

  tempoInizioFumo = tempoAnimazione;
  for (const carattere of caratteriTestuali) {
    carattere.posizioneInizioFumo = {
      x: offsetFrase + carattere.posizioneIniziale,
      y: altezzaTela / 2,
      angolo: 0
    };
  }
}

function preparaCaratteri() {
  textSize(dimensioneTesto);
  let distanza = 0;
  const parole = testoBase.split(" ");
  let indiceIlluminazione = 0;
  for (let indiceParola = 0; indiceParola < parole.length; indiceParola++) {
    const parola = parole[indiceParola];
    for (let indiceCarattere = 0; indiceCarattere < parola.length; indiceCarattere++) {
      const carattere = parola[indiceCarattere];
      const larghezza = fontWidth(carattere);
      caratteriTestuali.push({
        carattere,
        parola,
        indiceParola,
        indiceCarattere,
        indiceIlluminazione,
        larghezza,
        posizioneIniziale: distanza + larghezza / 2,
        faseFluttuazione: random(0, Math.PI * 2),
        faseSpirale: indiceIlluminazione * passoFaseFumo
      });
      distanza += larghezza;
      indiceIlluminazione++;
    }

    if (indiceParola < parole.length - 1) {
      distanza += fontWidth(" ");
      indiceIlluminazione++;
    }
  }

  larghezzaTesto = distanza;
  const larghezzaDisponibile = larghezzaTela - 2 * margineTesto;
  fattoreScalaTesto = Math.min(1, larghezzaDisponibile / larghezzaTesto);
  offsetFrase = (larghezzaTela - larghezzaTesto * fattoreScalaTesto) / 2;

  for (const carattere of caratteriTestuali) {
    carattere.posizioneIniziale *= fattoreScalaTesto;
    carattere.larghezza *= fattoreScalaTesto;
  }
}

function preparaCaduteGettero() {
  for (const carattere of caratteriTestuali) {
    if (carattere.parola !== "getterò") {
      continue;
    }

    carattere.framePrimoLancio = frameTraAccendoGettero
      + carattere.indiceCarattere * intervalloCadutaGettero;
  }
}

function disegnaCarattere(carattere) {
  if (tempoInizioFumo !== null) {
    const tempoFumo = tempoAnimazione - tempoInizioFumo;
    const progresso = Math.min(1, tempoFumo / durataFumoClick);
    const raccolta = Math.min(1, progresso * velocitaRaccoltaFumo);
    const faseFumo = progresso * oscillazioniFumoClick * Math.PI * 2
      + carattere.faseSpirale;
    const oscillazioneFumo = sin(faseFumo)
      * ampiezzaOscillazioneFumoClick * progresso;
    const posizioneIniziale = carattere.posizioneInizioFumo;

    push();
    translate(
      lerp(posizioneIniziale.x, larghezzaTela / 2, raccolta) + oscillazioneFumo,
      lerp(posizioneIniziale.y, altezzaTela / 2, raccolta)
        - altezzaFumoClick * progresso
    );
    rotate(posizioneIniziale.angolo * (1 - raccolta));
    fill(220, 225, 230, 255 * (1 - progresso));
    text(carattere.carattere, -carattere.larghezza / 2, 0);
    pop();
    return;
  }

  const posizione = {
    x: offsetFrase + carattere.posizioneIniziale,
    y: altezzaTela / 2,
    angolo: 0
  };

  fill(255);
  if (carattere.parola === "getterò" && disegnaCadutaGettero(carattere, posizione)) {
    return;
  }

  const tempoDalGettero = tempoAnimazione - frameInizioRallentamento;
  const getteroInMovimento = tempoDalGettero >= 0
    && tempoDalGettero < durataRallentamento;
  const intensitaAccendo = carattere.parola === "accendo" && !getteroInMovimento
    ? calcolaIntensitaIlluminazione(carattere)
    : 0;
  const oscillazioneAccendo = carattere.parola === "accendo"
    ? sin(tempoIlluminazione * velocitaOscillazioneAccendo + carattere.faseFluttuazione)
      * ampiezzaOscillazioneAccendo * intensitaAccendo
    : 0;

  push();
  translate(posizione.x, posizione.y);
  rotate(posizione.angolo + oscillazioneAccendo);
  if (getteroInMovimento && carattere.parola !== "getterò") {
    text(carattere.carattere, -carattere.larghezza / 2, 0);
  } else {
    disegnaIlluminazione(carattere);
  }
  pop();
}

function calcolaIntensitaIlluminazione(carattere, intensitaMinima = 0) {
  const framePerAccensione = durataCicloAnimazione / accensioniPerCiclo;
  const fase = tempoIlluminazione % framePerAccensione;
  const inizio = carattere.indiceIlluminazione * intervalloIlluminazione;
  const progresso = (fase - inizio) / durataIlluminazione;
  const intensitaNaturale = progresso >= 0 && progresso <= 1
    ? sin(progresso * Math.PI)
    : 0;
  const intensitaAmplificata = carattere.parola === "accendo"
    ? intensitaNaturale * amplificazioneLuceAccendo
    : intensitaNaturale;
  return Math.max(Math.min(intensitaAmplificata, 1), intensitaMinima);
}

function disegnaIlluminazione(carattere, intensitaMinima = 0) {
  const intensita = calcolaIntensitaIlluminazione(carattere, intensitaMinima);
  const amplificazioneBagliore = carattere.parola === "accendo"
    ? amplificazioneBaglioreAccendo
    : 1;

fill(lerpColor(color(255), color(255, 150, 0), intensita));
drawingContext.shadowColor = `rgba(255, 150, 0, ${intensita})`;
  drawingContext.shadowBlur = intensita * 8 * amplificazioneBagliore;
  text(carattere.carattere, -carattere.larghezza / 2, 0);
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "rgba(0, 0, 0, 0)";
}

function disegnaCadutaGettero(carattere, posizione) {
  const framePerCaduta = durataCicloAnimazione / caduteGetteroPerCiclo
    + (durataRallentamento - 1) * (1 - fattoreVelocitaIlluminazioneGettero);
  const tempoDalLancio = (tempoAnimazione - carattere.framePrimoLancio) % framePerCaduta;
  if (tempoDalLancio < 0 || tempoDalLancio >= durataAndataRitornoGettero) {
    return false;
  }

  if (tempoDalLancio < passoTempoAnimazione) {
    if (carattere.indiceCarattere === 0) {
      frameInizioRallentamento = tempoAnimazione;
      const framePerAccensione = durataCicloAnimazione / accensioniPerCiclo;
      const cicloIlluminazione = Math.floor(tempoIlluminazione / framePerAccensione);
      tempoIlluminazione = cicloIlluminazione * framePerAccensione
        + carattere.indiceIlluminazione * intervalloIlluminazione;
    }
  }

  const inizioRitorno = durataCadutaGettero + attesaRitornoGettero;
  const progresso = tempoDalLancio <= durataCadutaGettero
    ? tempoDalLancio / durataCadutaGettero
    : tempoDalLancio <= inizioRitorno
      ? 1
      : 1 - (tempoDalLancio - inizioRitorno) / durataCadutaGettero;
  const tempoAttesa = tempoDalLancio - durataCadutaGettero;
  const progressoFumo = Math.min(1, Math.max(0, tempoAttesa / attesaRitornoGettero));
  const intensitaFumo = tempoDalLancio <= inizioRitorno
    ? sin(progressoFumo * Math.PI / 2)
    : 1 - (tempoDalLancio - inizioRitorno) / durataCadutaGettero;
  const faseFluttuazione = tempoDalLancio * velocitaFluttuazioneGettero
    + carattere.faseFluttuazione;
  const indiceCentrato = carattere.indiceCarattere - (carattere.parola.length - 1) / 2;
  const spostamentoX = (
    indiceCentrato * separazioneFluttuazioneGettero
    + sin(faseFluttuazione) * ampiezzaFluttuazioneGettero
  ) * intensitaFumo;
  const spostamentoY = (
    -altezzaFumoGettero * progressoFumo
    + sin(faseFluttuazione + Math.PI / 2) * ampiezzaFluttuazioneGettero
  ) * intensitaFumo;

  push();
  translate(
    posizione.x + spostamentoX,
    posizione.y + altezzaCadutaGettero * progresso + spostamentoY
  );
  rotate(posizione.angolo + progresso * 0.8);
  disegnaIlluminazione(carattere, intensitaMinimaIlluminazioneCaduta);
  pop();
  return true;
}
