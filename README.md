# Tecnologie e applicazioni digitali 2026/27: esercitazioni

Repository personale per le esercitazioni del corso di **Tecnologie e applicazioni digitali**, Accademia di Belle Arti di Frosinone.

Le specifiche precise, con obiettivi, vincoli e modalità di realizzazione, si trovano nella sezione [Attività](https://codestesie.it/aa2627/tad/attivita/) del sito del corso.

## Prima di iniziare

Servono **Visual Studio Code**, **Git**, **OpenCode** e due estensioni, OpenCode e Live Server. L'installazione, passo per passo e con le soluzioni di eventuali problemi, è descritta nella guida [Visual Studio Code e OpenCode](https://codestesie.it/guide/vscode-opencode/), con le indicazioni per Windows e per macOS.

Serve anche un **profilo su [github.com](https://github.com/signup)**. Il nome utente comparirà negli indirizzi dei propri lavori, quindi conviene sceglierlo breve e leggibile. Registrandosi con la posta dell'Accademia si può poi chiedere il [GitHub Student Developer Pack](https://education.github.com/pack), che dà gratuitamente il piano Pro.

Al primo avvio l'agente sceglie da sé un modello gratuito, e per cambiarlo si scrive `/models` nella conversazione e si sceglie dall'elenco; per usare modelli a pagamento occorre prima collegare un account con `/connect`.

Le scorciatoie da tastiera indicate qui e più avanti sono quelle di Windows: su macOS, al posto di `Ctrl`, si usa `Cmd`.


## Come si prepara il repository

Una volta sola, all'inizio del corso. I primi due passaggi si fanno **sul sito di GitHub**, con il browser; il terzo comincia lì e finisce in **Visual Studio Code**, dove si svolge anche l'ultimo.

1. **Creare la propria copia del modello**, dalla pagina del [modello del corso](https://github.com/belluscio-abafr/aa2627-tad-es-modello), che è quella in cui si legge questo testo la prima volta: \
   *Use this template › Create a new repository* \
   Dare alla copia il nome `aa2627-tad-es`, lasciarla *Public* e premere *Create repository*. È un repository indipendente e resta sul proprio profilo.
2. **Attivare GitHub Pages**, che pubblica i lavori in rete: \
   *Settings* (in alto a destra) *› Pages › Source: Deploy from a branch › main › / (root) › Save* \
   Dopo un minuto circa, in cima alla stessa pagina dovrebbe comparire l'indirizzo pubblico del proprio sito, «Your site is live at…».
3. **Scaricare il repository sul proprio computer.** \
   Su GitHub si copia l'indirizzo del repository appena creato: \
   *Code* (sezione) *› Code* (pulsante verde) *› HTTPS ›* icona della copia. \
   In Visual Studio Code si clona il repository: \
   *Visualizza › Riquadro comandi* (`Ctrl+Shift+P`) *› Git: Clona* \
   Si incolla l'indirizzo copiato, si indica la cartella dove mettere il repository e, alla domanda se aprirlo, si risponde di sì.
4. **Personalizzare il repository con il proprio nome**, con il comando `/inizio`. \
   La chat di OpenCode, che al primo avvio è chiusa, si apre con la piccola icona di OpenCode in alto a destra nel pannello attivo: `/inizio` si scrive nel campo editabile centrale. \
   Il comando scrive il nome nelle pagine e l'indirizzo pubblico in questo file, così gli indirizzi che si leggono qui sono già i propri. Se OpenCode chiede il permesso di eseguire qualche comando, è normale: per i comandi del corso si può rispondere di sì.

## Come si lavora

Da qui in avanti si lavora **in Visual Studio Code**, nella cartella scaricata sul proprio computer: sul sito di GitHub non c'è più niente da fare a mano.

1. **Creare la cartella dell'esercitazione**, con il comando `/crea es1`, cambiando `es1` con la sigla dell'esercitazione: `es2`, `es3` e così via. Vale anche per gli altri comandi qui sotto.
2. **Scrivere il codice** in `sketch.js`, dentro quella cartella.
3. **Vedere il risultato nel browser**: \
   tasto destro su `index.html` della cartella *› Open with Live Server*
   > Conviene attivare il salvataggio automatico, *File › Salvataggio automatico*: con Live Server il browser si aggiorna a ogni salvataggio, quindi le modifiche si vedono mentre si scrive, senza premere ogni volta `Ctrl+S`.
4. **Controllare il lavoro con la consegna**, con il comando `/verifica es1`. \
   Rilegge le specifiche sul sito del corso e dice quali vincoli non sono ancora rispettati. Conviene darlo mentre si lavora, non solo alla fine: serve a sapere dove si è, non a dare un voto.
5. **Pubblicare il lavoro**, se lo si vuole vedere subito online, dal pannello del controllo di versione: \
   *Visualizza › Controllo del codice sorgente* (`Ctrl+Shift+G`) \
   Si scrive un messaggio che dica che cosa è stato fatto, si preme *Commit* e poi *Sincronizza*.
   > Il messaggio non è facoltativo: senza, il pulsante *Commit* non conclude niente, ed è il motivo per cui a volte sembra che non funzioni. Bastano poche parole, come «prima versione di es1» o «colori più scuri e sfondo nero».

Dopo circa un minuto il lavoro è online all'indirizzo `https://NOMEUTENTE.github.io/aa2627-tad-es/es1/`, con il proprio nome utente di GitHub al posto di `NOMEUTENTE` e la cartella giusta al posto di `es1`.

Le cartelle si chiamano `es1`, `es2` e così via: sono gli stessi nomi delle consegne sul sito, e non sono nomi liberi, perché su quelli si costruiscono l'indirizzo del lavoro pubblicato e il collegamento con la consegna.

## Come si consegna

Il primo passaggio si fa **in Visual Studio Code**, il secondo **nel browser**.

1. **Pubblicare il lavoro e ottenerne l'indirizzo**, con il comando `/consegna es1`. \
   Controlla che la cartella sia completa; se è tutto a posto, fa il commit e la sincronizzazione, e mostra l'indirizzo pubblico da segnalare, altrimenti chiede la conferma per proseguire comunque.
2. **Compilare il [modulo delle consegne](https://docs.google.com/forms/d/e/1FAIpQLSe3wKbZj7PfOUy5IzgyU52e81S9aKXqTJ7kRxIzhPrDiBH10Q/viewform?usp=pp_url&entry.1318995029=TAD+2026/27)**: \
   l'esercitazione, cognome e nome, l'indirizzo appena mostrato dal comando ed eventuali note.

Non è necessario nessun account Google per compilare il modulo. 

**La revisione arriva nella chat di Teams**, non qui. Se dopo la consegna si continua a lavorare sulla stessa esercitazione, si rifà la consegna: vale l'ultima.

> Se l'indirizzo serve senza passare dal `/consegna`, si pubblica il lavoro con Commit e Sincronizza, si apre nel browser il proprio elenco dei lavori, `https://NOMEUTENTE.github.io/aa2627-tad-es/`, si entra nella cartella dell'esercitazione e si copia l'indirizzo dalla barra. Attenzione a non confonderlo con quello di Live Server, che comincia per `127.0.0.1` e funziona solo sul proprio computer.

## I comandi di OpenCode

Quattro comandi sono stati scritti per questo corso e funzionano solo in questo repository:

- `/inizio`: scrive il proprio nome e l'indirizzo pubblico del repository;
- `/crea es1`: crea la cartella dell'esercitazione, leggendo la consegna dal sito del corso;
- `/verifica es1`: confronta il lavoro con i vincoli della consegna e dice quali non sono rispettati;
- `/consegna es1`: controlla, pubblica e ricorda l'indirizzo da segnalare.

Gli altri sono di OpenCode e funzionano in qualsiasi cartella. I più utili:

- `/help`: elenco completo dei comandi;
- `/models`: cambia il modello linguistico in uso;
- `/connect`: collega un account, per usare modelli a pagamento;
- `/undo`: annulla l'ultima richiesta e le modifiche ai file che ha prodotto (`/redo` le rimette);
- `/new`: comincia una conversazione nuova, quando si cambia argomento;
- `/sessions`: riprende una conversazione precedente;
- `/init`: rilegge il progetto e aggiorna il file `AGENTS.md`;
- `/export`: salva la conversazione in un file di testo.
