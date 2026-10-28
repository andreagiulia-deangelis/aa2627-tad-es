---
description: Crea la cartella di un'esercitazione
---

Preparare la cartella `$1` di questo repository.

Prima di tutto il nome della cartella. Se `$1` è una variante riconoscibile di `esN` («esercizio 2», «e2», «Es 3»), usare la forma standard (`es2`) e dirlo allo studente in una riga. Se invece il nome non è riconoscibile, o sembra provvisorio («es1 prova», «variante esercizio 1»), avvisare che con un nome così l'indirizzo pubblico e il collegamento con la consegna non funzioneranno, e chiedere se crearla ugualmente.

Se `$1` è il **progetto**, in qualunque forma («progetto», «project», «il progetto finale»), fermarsi senza creare niente: il progetto va in un repository che lo studente crea da sé, con il nome che preferisce, e le istruzioni stanno nella sua consegna, `https://codestesie.it/aa2627/tad/attivita/progetto/`.

1. Leggere le specifiche su `https://codestesie.it/aa2627/tad/attivita/<cartella>/`. Se l'indirizzo non risponde, avvisare e fermarsi: l'attività non è ancora stata pubblicata. Se in cima alla pagina c'è l'avviso «Specifiche da definire», dirlo e chiedere se aspettare la versione definitiva: la cartella si crea solo se lo studente conferma.
2. Creare la cartella con tre file.
   - `index.html`: pagina in italiano con `<meta charset="utf-8">`, il titolo dell'attività, lo script di p5.js `https://cdn.jsdelivr.net/npm/p5@2.3.3/lib/p5.min.js`, il proprio `style.css` e `sketch.js`.
   - `style.css`: esattamente questo, che tiene la tela al centro della finestra, con gli eventuali controlli creati dallo sketch subito sotto:

     ```css
     html, body {
       margin: 0;
       padding: 0;
     }

     /* la tela al centro della finestra; se è più grande, parte dall'angolo
        in alto a sinistra e la pagina scorre, invece di tagliarne i bordi */
     body {
       min-height: 100vh;
       display: flex;
       flex-direction: column;
       justify-content: safe center;
       align-items: safe center;
     }

     canvas {
       display: block;
     }
     ```
   - `sketch.js`: in cima, come commenti, l'obiettivo dell'attività e l'elenco dei vincoli ricavati dalle specifiche.
3. Scrivere in `sketch.js` un **contenitore vuoto**: `setup()` con la tela delle dimensioni richieste dalle specifiche, e `draw()` vuota. Niente disegno e niente soluzione: lo sketch si riempie a poco a poco con quello che decide lo studente.
4. Aggiungere la voce all'elenco nell'`index.html` della radice, nella forma `<li><a href="es1/">Es1. Titolo</a></li>`, con la cartella giusta e il titolo dell'attività preso dalle specifiche, e togliere la riga «Ancora nessun lavoro pubblicato» se è ancora lì. L'anteprima non va scritta: la pagina la aggiunge da sola leggendo `preview.png` nella cartella, e finché l'immagine manca mostra al suo posto un riquadro che lo dice.
5. Chiudere con due cose sole. Come vedere lo sketch: il pulsante **Go Live** nella barra in basso a destra di Visual Studio Code, aggiunto dall'estensione Live Server, apre nel browser l'elenco dei lavori, da cui si entra nella cartella. Poi **una domanda sola**: da che cosa vuole partire. Incoraggiare a rispondere con un procedimento (quali forme, quale regola, che cosa si ripete o cambia) più che con la descrizione del risultato finale.

**Non proporre un elenco di direzioni da scegliere**: l'idea deve venire da lui, altrimenti l'esercitazione diventa una scelta fra opzioni preconfezionate e i lavori si somigliano tutti.

**Le domande riguardano il funzionamento, non l'immagine finale.** «Che cosa deve fare il programma a ogni passo», «quale parametro varia e secondo quale criterio», «che cosa succede se quel numero raddoppia» portano a costruire un procedimento e a capirlo. «Che effetto vuoi ottenere» porta invece a descrivere un risultato e a farselo produrre, che è esattamente quello che l'esercitazione deve evitare.

Nelle richieste successive, assistere sulle parti complesse e lasciare a lui le modifiche semplici: quando si tratta di cambiare numeri, colori o proporzioni, dire dove intervenire e invitarlo a farlo direttamente nel codice.
