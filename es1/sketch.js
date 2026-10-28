// Illusione ottica in bianco e nero con un cerchio
// Fonte: https://unsplash.com/it/foto/illusione-ottica-in-bianco-e-nero-con-un-cerchio-gGZGRU0nHiQ
// Regola (consigliata): pattern radiale, in cui linee rette alternate
// bianche e nere partono da un punto centrale comune e si diramano verso
// i bordi. Al centro esatto è presente un cerchio nero pieno sfumato.
// L'effetto visivo di movimento o di "caduta" all'interno del buco è
// creato dalla densità delle linee, che diventano incredibilmente
// fitti e sottili man mano che si avvicinano al centro, unite alla
// sfocatura dei bordi del cerchio centrale.
// Parametri critici: per ciascuno, il nome della variabile
//   numeroRaggi: effetto più evidente con linee fitte e frequenti; nessun effetto con poche linee
//   passiSfumatura: effetto più evidente con il bordo sfumato; nessun effetto con il bordo netto
//   raggioCircolo: effetto più evidente con il cerchio nero sfumato; nessun effetto con un cerchio netto
//   fattoreRiduzione: riduce l'illusione per la preview; nessun effetto visivo di per sé
//   passoRotazione: regola la velocità del movimento; nessun movimento non è l'illusione
//   ampiezzaPulsazione: regola l'accorciamento della pulsazione; nessun effetto senza pulsazione

const larghezzaTela = 800;
const altezzaTela = 600;

// colori: solo bianco, nero e grigi; il grigio di sfondo contrasta sia col
// bianco sia col nero, quindi i raggi alternati restano visibili
const coloreSfondo = 128;
const coloreBianco = 255;
const coloreNero = 0;

// il cerchio nero al centro, con i bordi sfumati
const raggioCircolo = 110;
const passiSfumatura = 16;

// i raggi che si diramano dal centro verso i bordi
const numeroRaggi = 180;
const spessoreMassimo = 8;      // in pixel: il tratto più forte tra i raggi normali
const raggioCampo = 350;        // in pixel: distanza oltre la quale i raggi arrivano ai bordi
const fattoreRiduzione = 0.75;  // riduzione dell'illusione: la versione in preview è più piccola

// il movimento: i raggi ruotano attorno al centro in senso orario
const passoRotazione = 0.003;   // in radianti per fotogramma: un giro completo ogni ~35 secondi

// la pulsazione: i raggi si accorciano e poi si espandono
const ampiezzaPulsazione = 0.2;   // accorciamento massimo dei raggi, fra 0 e 1
const scalaMassima = 1.6;         // espansione massima: porta i raggi oltre il riquadro
const lunghezzaPulsazione = 180; // in fotogrammi: durata di una pulsazione completa

function setup() {
  createCanvas(larghezzaTela, altezzaTela);
  noFill();
}

function draw() {
  background(coloreSfondo);

  const angolo = frameCount * passoRotazione;
  disegnaRaggi(angolo);
  disegnaCercolo();
}

// la pulsazione: restituisce la scala attuale, tra l'accorciamento minimo e l'espansione massima
function fattorePulsazione() {
  const fase = (frameCount % lunghezzaPulsazione) / lunghezzaPulsazione;
  const angoloPulsazione = fase * TWO_PI;
  const scalaMinima = 1 - ampiezzaPulsazione;
  return scalaMinima + (scalaMassima - scalaMinima) * (1 - cos(angoloPulsazione)) / 2;
}

// il cerchio nero pieno sfumato: tratti concentrici con opacità crescente
// verso il centro, così che il bordo appaia sfumato. Viene disegnato per
// ultimo, così che i raggi cadano dentro il buco.
function disegnaCercolo() {
  const centroX = larghezzaTela / 2;
  const centroY = altezzaTela / 2;

  for (let i = 0; i <= passiSfumatura; i++) {
    const raggio = raggioCircolo * fattoreRiduzione + fattoreRiduzione * map(i, 0, passiSfumatura, 20, -20);
    const opacita = map(i, 0, passiSfumatura, 100, 255);
    stroke(coloreNero);
    fill(coloreNero, opacita);
    circle(centroX, centroY, raggio);
  }
}

// i raggi: un triangolo per angolo, con il vertice al centro e la base alla
// fine del raggio. Il triangolo si fa più sottile man mano che ci si avvicina
// al centro, e tutti i raggi si accumulano sul punto centrale, creando la
// densità.
function disegnaRaggi(angolo) {
  const centroX = larghezzaTela / 2;
  const centroY = altezzaTela / 2;

  noStroke();
  for (let i = 0; i < numeroRaggi; i++) {
    const direzione = angolo + i * TWO_PI / numeroRaggi;

    // i due raggi speciali, disegnati negli indici opposti, sono più spessi e neri
    const raggioMaggiore = i === 0 || i === Math.round(numeroRaggi / 2);
    const spessoreRaggio = raggioMaggiore ? spessoreMassimo * 2 : spessoreMassimo;
    fill(raggioMaggiore ? coloreNero : (i % 2 === 0 ? coloreBianco : coloreNero));

    // ogni raggio è un triangolo: vertice al centro, base alla fine del raggio;
    // la base ha larghezza pari allo spessore finale, quindi la forma mantiene
    // le proporzioni di spessore del disegno precedente
    const baseRaggio = raggioCampo * fattoreRiduzione * fattorePulsazione();
    const mezzoLarghezza = spessoreRaggio * fattoreRiduzione * fattorePulsazione() / 2;

    triangle(
      centroX,
      centroY,
      centroX + cos(direzione) * baseRaggio - sin(direzione) * mezzoLarghezza,
      centroY + sin(direzione) * baseRaggio + cos(direzione) * mezzoLarghezza,
      centroX + cos(direzione) * baseRaggio + sin(direzione) * mezzoLarghezza,
      centroY + sin(direzione) * baseRaggio - cos(direzione) * mezzoLarghezza
    );
  }
}
