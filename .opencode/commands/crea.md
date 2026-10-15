---
description: Crea la cartella di un'esercitazione
---

Preparare la cartella `$1` di questo repository.

Prima di tutto il nome della cartella. Se `$1` è una variante riconoscibile di `esN` («esercizio 2», «e2», «Es 3»), usare la forma standard (`es2`) e dirlo allo studente in una riga. Se invece il nome non è riconoscibile, o sembra provvisorio («es1 prova», «variante esercizio 1»), avvisare che con un nome così l'indirizzo pubblico e il collegamento con la consegna non funzioneranno, e chiedere se crearla ugualmente.

Se `$1` è il **progetto**, in qualunque forma («progetto», «project», «il progetto finale»), fermarsi senza creare niente: il progetto va in un repository che lo studente crea da sé, con il nome che preferisce, e le istruzioni stanno nella sua consegna, `https://codestesie.it/aa2627/tad/attivita/progetto/`.

1. Leggere le specifiche su `https://codestesie.it/aa2627/tad/attivita/<cartella>/`. Se l'indirizzo non risponde, avvisare e fermarsi: l'attività non è ancora stata pubblicata. Se in cima alla pagina c'è l'avviso «Specifiche da definire», dirlo e chiedere se aspettare la versione definitiva: la cartella si crea solo se lo studente conferma.
2. Creare la cartella con quattro file.
   - `index.html`: pagina in italiano con `<meta charset="utf-8">`, il titolo dell'attività, lo script di p5.js `https://cdn.jsdelivr.net/npm/p5@2.3.3/lib/p5.min.js`, il proprio `style.css` e `sketch.js`.
   - `style.css`: solo l'essenziale, cioè margini a zero e la tela come blocco.
   - `sketch.js`: in cima, come commenti, l'obiettivo dell'attività e l'elenco dei vincoli ricavati dalle specifiche.
   - `README.md`: il titolo con il nome dell'attività, l'immagine dell'anteprima scritta come `![Anteprima del lavoro](preview.png)`, la riga con l'indirizzo pubblico del lavoro ricavato dal remoto Git, e una riga che dica che `preview.png` va creata quando il lavoro è pronto, perché serve all'anteprima nella pagina delle revisioni del corso. GitHub mostra il README sotto l'elenco dei file della cartella: finché l'immagine non c'è si vede il segno di un'immagine mancante, ed è il modo più semplice per accorgersene.
3. Scrivere in `sketch.js` un **contenitore vuoto**: `setup()` con la tela delle dimensioni richieste dalle specifiche, e `draw()` vuota. Niente disegno e niente soluzione: lo sketch si riempie a poco a poco con quello che decide lo studente.
4. Aggiungere la voce all'elenco nell'`index.html` della radice, togliendo la riga «Ancora nessun lavoro pubblicato» se è ancora lì.
5. Chiudere con due cose sole. Come vedere lo sketch: il pulsante **Go Live** nella barra in basso a destra di Visual Studio Code, aggiunto dall'estensione Live Server, apre nel browser l'elenco dei lavori, da cui si entra nella cartella. Poi **una domanda sola**: da che cosa vuole partire. Incoraggiare a rispondere con un procedimento (quali forme, quale regola, che cosa si ripete o cambia) più che con la descrizione del risultato finale.

**Non proporre un elenco di direzioni da scegliere**: l'idea deve venire da lui, altrimenti l'esercitazione diventa una scelta fra opzioni preconfezionate e i lavori si somigliano tutti.

**Le domande riguardano il funzionamento, non l'immagine finale.** «Che cosa deve fare il programma a ogni passo», «quale parametro varia e secondo quale criterio», «che cosa succede se quel numero raddoppia» portano a costruire un procedimento e a capirlo. «Che effetto vuoi ottenere» porta invece a descrivere un risultato e a farselo produrre, che è esattamente quello che l'esercitazione deve evitare.

Nelle richieste successive, assistere sulle parti complesse e lasciare a lui le modifiche semplici: quando si tratta di cambiare numeri, colori o proporzioni, dire dove intervenire e invitarlo a farlo direttamente nel codice.
