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
//   scalaMassima: lunghezza dei raggi, mantenuta costante al valore massimo
//   ampiezzaVariazioneLunghezza: variazione graduale della lunghezza dei raggi
//   fattoreSpessoreRaggiSpeciali: quanto i due raggi speciali superano gli altri
//   fattoreSpessoreMassimo: differenza massima fra il raggio più sottile e quello più largo
//   esponenteProgressione: regola quanto rapidamente aumentano gli spessori
//   durataProgressione: durata dell'alternanza fra spessori uniformi e progressione
//   ampiezzaSpostamentoAngolare: limita quanto i raggi si allontanano dalle posizioni regolari
//   frequenzaMovimentoAngolare e margineSovrapposizioneRaggi: movimento e copertura fra i raggi

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
const spessoreMinimo = 8;       // in pixel: spessore dei raggi quando sono uniformi
const fattoreSpessoreMassimo = 4; // il raggio più largo arriva a quattro volte il più sottile
const fattoreSpessoreRaggiSpeciali = 3; // spessore iniziale dei due raggi speciali
const esponenteProgressione = 4;
const durataProgressione = 360; // in fotogrammi: durata di un ciclo completo
const raggioCampo = 350;        // in pixel: distanza oltre la quale i raggi arrivano ai bordi
const fattoreRiduzione = 0.75;  // riduzione dell'illusione: la versione in preview è più piccola
const ampiezzaSpostamentoAngolare = 0.3; // in radianti: mantiene regolare la distanza fra i raggi
const frequenzaMovimentoAngolare = 0.005; // velocità dell'oscillazione dei raggi
const margineSovrapposizioneRaggi = 1.05; // evita che si aprano spazi fra i raggi

// il movimento: il verso varia gradualmente, senza accumulare spazi vuoti

const scalaMassima = 2.2; // i raggi restano sempre a questa lunghezza
const ampiezzaVariazioneLunghezza = 0.1; // i raggi variano gradualmente fra il 90% e il 110%

function setup() {
  createCanvas(larghezzaTela, altezzaTela);
  noFill();
}

function draw() {
  background(coloreSfondo);

  const faseProgressione = (1 - cos(TWO_PI * frameCount / durataProgressione)) / 2;
  disegnaRaggi(faseProgressione);
  disegnaCercolo();
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

// La lunghezza varia in modo continuo attorno al centro e lo spessore passa
// gradualmente da uniforme a esponenziale lungo la circonferenza.
function disegnaRaggi(faseProgressione) {
  const centroX = larghezzaTela / 2;
  const centroY = altezzaTela / 2;
  const scala = fattoreRiduzione * scalaMassima;

  noStroke();
  const faseMovimento = frameCount * frequenzaMovimentoAngolare;
  const direzioni = [];
  const lunghezze = [];
  const larghezzeAngolari = [];

  for (let i = 0; i < numeroRaggi; i++) {
    const direzione = direzioneRaggio(i, faseMovimento);
    const direzionePrecedente = direzioneRaggio(i - 1, faseMovimento);
    const direzioneSuccessiva = direzioneRaggio(i + 1, faseMovimento);
    const spaziaturaAngolare = max(
      direzione - direzionePrecedente,
      direzioneSuccessiva - direzione
    );
    const fattoreLunghezza =
      1 + ampiezzaVariazioneLunghezza * sin(TWO_PI * i / numeroRaggi);
    const posizione = i / (numeroRaggi - 1);
    const progressioneEsponenziale =
      (Math.exp(esponenteProgressione * posizione) - 1) /
      (Math.exp(esponenteProgressione) - 1);
    const fattoreSpessoreNormale =
      1 + (fattoreSpessoreMassimo - 1) * faseProgressione * progressioneEsponenziale;
    const raggioSpeciale = i === 0 || i === Math.round(numeroRaggi / 2);
    const fattoreSpessore = raggioSpeciale
      ? fattoreSpessoreRaggiSpeciali
        + (fattoreSpessoreMassimo - 1) * faseProgressione
      : fattoreSpessoreNormale;
    const spessoreMinimoPerCopertura =
      raggioCampo * fattoreLunghezza * spaziaturaAngolare * margineSovrapposizioneRaggi;
    const spessoreRaggio = max(
      spessoreMinimo * fattoreSpessore,
      spessoreMinimoPerCopertura
    );
    direzioni.push(direzione);
    lunghezze.push(fattoreLunghezza);
    larghezzeAngolari.push(spessoreRaggio / (raggioCampo * fattoreLunghezza));
  }

  for (let i = 0; i < numeroRaggi; i++) {
    const indicePrecedente = (i - 1 + numeroRaggi) % numeroRaggi;
    const indiceSuccessivo = (i + 1) % numeroRaggi;
    const direzionePrecedente = i === 0
      ? direzioni[indicePrecedente] - TWO_PI
      : direzioni[indicePrecedente];
    const direzioneSuccessiva = i === numeroRaggi - 1
      ? direzioni[indiceSuccessivo] + TWO_PI
      : direzioni[indiceSuccessivo];
    const confineSinistro = confineAngolare(
      direzionePrecedente,
      direzioni[i],
      larghezzeAngolari[indicePrecedente],
      larghezzeAngolari[i]
    );
    const confineDestro = confineAngolare(
      direzioni[i],
      direzioneSuccessiva,
      larghezzeAngolari[i],
      larghezzeAngolari[indiceSuccessivo]
    );
    const raggioSpeciale = i === 0 || i === Math.round(numeroRaggi / 2);
    fill(raggioSpeciale || i % 2 === 1 ? coloreNero : coloreBianco);

    const baseRaggio = raggioCampo * scala * lunghezze[i];
    disegnaRaggio(centroX, centroY, confineSinistro, confineDestro, baseRaggio);
  }
}

function confineAngolare(primo, secondo, larghezzaPrimo, larghezzaSecondo) {
  return primo + (secondo - primo) * larghezzaPrimo /
    (larghezzaPrimo + larghezzaSecondo);
}

function direzioneRaggio(indice, faseMovimento) {
  const angoloBase = indice * TWO_PI / numeroRaggi;
  return angoloBase
    + ampiezzaSpostamentoAngolare * sin(2 * angoloBase + faseMovimento);
}

function disegnaRaggio(centroX, centroY, confineSinistro, confineDestro, baseRaggio) {
  triangle(
    centroX,
    centroY,
    centroX + cos(confineSinistro) * baseRaggio,
    centroY + sin(confineSinistro) * baseRaggio,
    centroX + cos(confineDestro) * baseRaggio,
    centroY + sin(confineDestro) * baseRaggio
  );
}
