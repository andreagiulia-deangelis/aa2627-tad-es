---
description: Aggiorna i file del corso all'ultima versione del modello, senza toccare le esercitazioni
---

Aggiornare questo repository all'ultima versione del modello del corso, `https://github.com/belluscio-abafr/aa2627-tad-es-modello`, conservando il lavoro dello studente. Ogni file del modello si legge da `https://raw.githubusercontent.com/belluscio-abafr/aa2627-tad-es-modello/main/` seguito dal suo percorso, per esempio `.../main/AGENTS.md`, con lo strumento per leggere le pagine web, che non chiede permessi, e non con `curl` o altri comandi di shell, che li chiedono.

**Prima di tutto** leggere la versione più recente di queste istruzioni, `https://raw.githubusercontent.com/belluscio-abafr/aa2627-tad-es-modello/main/.opencode/commands/aggiorna.md`: se è diversa da quella che si sta eseguendo, seguire quella al posto di questa.

Le cartelle delle esercitazioni (`es0`, `es1`, …) **non si toccano**, né i file né i nomi, con due sole eccezioni, da proporre allo studente e da fare solo se conferma:

- i `README.md` creati dalla versione precedente di `/crea` non servono più, e si possono cancellare;
- se lo `style.css` di una cartella non centra la tela nella finestra, gli si possono aggiungere le regole che `/crea` scrive ora (si leggono nel `crea.md` del modello), conservando quelle scritte dallo studente.

1. Sostituire per intero con la versione del modello, senza altre modifiche: `AGENTS.md`, `opencode.json` e i comandi di `.opencode/commands/`, cioè `inizio.md`, `crea.md`, `verifica.md`, `consegna.md` e questo, `aggiorna.md`. OpenCode chiede il permesso per ciascuno: è normale.
2. Per l'`index.html` della radice, partire da quello del modello e riportarci dall'`index.html` attuale il nome dello studente, al posto di `Nome Cognome`, e tutte le voci dell'elenco, nello stesso ordine. Ogni voce resta un semplice link alla cartella, `<li><a href="es1/">Es1. Titolo</a></li>`: l'anteprima la aggiunge la pagina da sola. Se c'è almeno una voce, la riga «Ancora nessun lavoro pubblicato» va tolta.
3. Per il `README.md` della radice, partire da quello del modello e rifare le personalizzazioni del comando `/inizio`: `NOMEUTENTE` sostituito dal nome utente di GitHub, ricavato dall'indirizzo del repository remoto (`git remote -v`), e subito dopo il titolo la riga `Lavori pubblicati: https://NOMEUTENTE.github.io/aa2627-tad-es/`, con il nome utente vero.
4. Elencare le voci dell'elenco prima e dopo l'aggiornamento, perché lo studente controlli che non ne manchi nessuna, poi proporre commit e sincronizzazione.
5. Chiudere ricordando di chiudere e riaprire Visual Studio Code: i comandi aggiornati si leggono all'avvio.
