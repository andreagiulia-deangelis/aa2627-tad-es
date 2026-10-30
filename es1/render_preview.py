# Genera preview.png: il fotogramma in cui la progressione è al massimo.
#
# p5.js gira solo nel browser, quindi questa copia minimale della logica di
# sketch.js serve solo per produrre l'immagine di anteprima. Il fotogramma
# usa le stesse dimensioni e gli stessi parametri del canvas.

import math
import os
import struct
import zlib

LARGHEZZA = 800
ALTEZZA = 600

# La preview usa la stessa scala del canvas dello sketch.
SF = 1

BIANCO = (255, 255, 255, 255)
NERO = (0, 0, 0, 255)
SFONDO = (128, 128, 128, 255)

CENTRO_X = LARGHEZZA / 2
CENTRO_Y = ALTEZZA / 2

NUMERO_RAGGI = 180
SPESSORE_MINIMO = 8
FATTORE_SPESSORE_MASSIMO = 4
FATTORE_SPESSORE_RAGGI_SPECIALI = 3
ESPONENTE_PROGRESSIONE = 4
AMPIEZZA_VARIAZIONE_LUNGHEZZA = 0.1
AMPIEZZA_SPOSTAMENTO_ANGOLARE = 0.3
FREQUENZA_MOVIMENTO_ANGOLARE = 0.005
MARGINE_SOVRAPPOSIZIONE_RAGGI = 1.05
SCALA_MASSIMA = 2.2
FATTORE_RIDUZIONE = 0.75
FRAME_COUNT = 180
RAGGIO_CAMPO = 350
RAGGIO_CIRCOLO = 110
PASSI_SFUMATURA = 16
OPACITA_MINIMA = 100


def mappa(valore, inizio1, fine1, inizio2, fine2):
    return inizio2 + (fine2 - inizio2) * (valore - inizio1) / (fine1 - inizio1)


def sovrapponi(base, sopra, trasparenza):
    alpha = trasparenza / 255
    return tuple(
        round(sopra[i] * alpha + base[i] * (1 - alpha)) for i in range(4)
    )


canvas = [[SFONDO for _ in range(LARGHEZZA)] for _ in range(ALTEZZA)]


def riempie_triangolo(angolo, spessore, colore, scala, fattore_lunghezza):
    dx = math.cos(angolo)
    dy = math.sin(angolo)
    mezzo = spessore * SF * scala / 2
    base_raggio = RAGGIO_CAMPO * SF * scala * fattore_lunghezza
    bx1 = CENTRO_X + dx * base_raggio - dy * mezzo
    by1 = CENTRO_Y + dy * base_raggio + dx * mezzo
    bx2 = CENTRO_X + dx * base_raggio + dy * mezzo
    by2 = CENTRO_Y + dy * base_raggio - dx * mezzo
    x_min = max(0, round(min(CENTRO_X, bx1, bx2)))
    x_max = min(LARGHEZZA - 1, round(max(CENTRO_X, bx1, bx2)))
    y_min = max(0, round(min(CENTRO_Y, by1, by2)))
    y_max = min(ALTEZZA - 1, round(max(CENTRO_Y, by1, by2)))
    for y in range(y_min, y_max + 1):
        for x in range(x_min, x_max + 1):
            t = (x - CENTRO_X) * dx + (y - CENTRO_Y) * dy
            if t < 0:
                continue
            perpendicolare = abs(dx * (y - CENTRO_Y) - dy * (x - CENTRO_X))
            if perpendicolare <= mezzo * t / base_raggio and t <= base_raggio:
                canvas[y][x] = sovrapponi(canvas[y][x], colore, 255)


def disegna_raggi():
    fase_progressione = (1 - math.cos(2 * math.pi * FRAME_COUNT / 360)) / 2
    scala = FATTORE_RIDUZIONE * SCALA_MASSIMA
    fase_movimento = FRAME_COUNT * FREQUENZA_MOVIMENTO_ANGOLARE
    direzioni = []
    lunghezze = []
    larghezze_angolari = []

    for i in range(NUMERO_RAGGI):
        direzione = direzione_raggio(i, fase_movimento)
        direzione_precedente = direzione_raggio(i - 1, fase_movimento)
        direzione_successiva = direzione_raggio(i + 1, fase_movimento)
        spaziatura_angolare = max(
            direzione - direzione_precedente,
            direzione_successiva - direzione,
        )
        fattore_lunghezza = 1 + AMPIEZZA_VARIAZIONE_LUNGHEZZA * math.sin(
            2 * math.pi * i / NUMERO_RAGGI
        )
        posizione = i / (NUMERO_RAGGI - 1)
        progressione_esponenziale = (
            math.exp(ESPONENTE_PROGRESSIONE * posizione) - 1
        ) / (math.exp(ESPONENTE_PROGRESSIONE) - 1)
        fattore_spessore_normale = (
            1
            + (FATTORE_SPESSORE_MASSIMO - 1)
            * fase_progressione
            * progressione_esponenziale
        )
        raggio_speciale = i == 0 or i == round(NUMERO_RAGGI / 2)
        fattore_spessore = (
            FATTORE_SPESSORE_RAGGI_SPECIALI
            + (FATTORE_SPESSORE_MASSIMO - 1) * fase_progressione
            if raggio_speciale
            else fattore_spessore_normale
        )
        spessore = max(
            SPESSORE_MINIMO * fattore_spessore,
            RAGGIO_CAMPO
            * fattore_lunghezza
            * spaziatura_angolare
            * MARGINE_SOVRAPPOSIZIONE_RAGGI,
        )
        direzioni.append(direzione)
        lunghezze.append(fattore_lunghezza)
        larghezze_angolari.append(spessore / (RAGGIO_CAMPO * fattore_lunghezza))

    for i in range(NUMERO_RAGGI):
        indice_precedente = (i - 1 + NUMERO_RAGGI) % NUMERO_RAGGI
        indice_successivo = (i + 1) % NUMERO_RAGGI
        direzione_precedente = direzioni[indice_precedente]
        direzione_successiva = direzioni[indice_successivo]
        if i == 0:
            direzione_precedente -= 2 * math.pi
        if i == NUMERO_RAGGI - 1:
            direzione_successiva += 2 * math.pi

        confine_sinistro = confine_angolare(
            direzione_precedente,
            direzioni[i],
            larghezze_angolari[indice_precedente],
            larghezze_angolari[i],
        )
        confine_destro = confine_angolare(
            direzioni[i],
            direzione_successiva,
            larghezze_angolari[i],
            larghezze_angolari[indice_successivo],
        )
        raggio_speciale = i == 0 or i == round(NUMERO_RAGGI / 2)
        colore = NERO if raggio_speciale or i % 2 == 1 else BIANCO
        angolo = (confine_sinistro + confine_destro) / 2
        spessore = (
            2
            * RAGGIO_CAMPO
            * lunghezze[i]
            * math.tan((confine_destro - confine_sinistro) / 2)
        )
        riempie_triangolo(angolo, spessore, colore, scala, lunghezze[i])


def confine_angolare(primo, secondo, larghezza_primo, larghezza_secondo):
    return primo + (secondo - primo) * larghezza_primo / (
        larghezza_primo + larghezza_secondo
    )


def direzione_raggio(indice, fase_movimento):
    angolo_base = indice * (2 * math.pi) / NUMERO_RAGGI
    return angolo_base + AMPIEZZA_SPOSTAMENTO_ANGOLARE * math.sin(
        2 * angolo_base + fase_movimento
    )


def disegna_cerchio():
    centro_x = round(CENTRO_X)
    centro_y = round(CENTRO_Y)
    raggio_max = (
        RAGGIO_CIRCOLO * FATTORE_RIDUZIONE + 20 * FATTORE_RIDUZIONE
    ) / 2
    raggio_min = (
        RAGGIO_CIRCOLO * FATTORE_RIDUZIONE - 20 * FATTORE_RIDUZIONE
    ) / 2
    x_min = max(0, round(CENTRO_X - raggio_max))
    x_max = min(LARGHEZZA - 1, round(CENTRO_X + raggio_max))
    y_min = max(0, round(CENTRO_Y - raggio_max))
    y_max = min(ALTEZZA - 1, round(CENTRO_Y + raggio_max))
    for y in range(y_min, y_max + 1):
        for x in range(x_min, x_max + 1):
            distanza = math.sqrt((x - centro_x) ** 2 + (y - centro_y) ** 2)
            if distanza <= raggio_max:
                raggio = min(max(distanza, raggio_min), raggio_max)
                opacita = mappa(
                    raggio, raggio_min, raggio_max, 255, OPACITA_MINIMA
                )
                canvas[y][x] = sovrapponi(canvas[y][x], NERO, opacita)


def chunk(tipo, dati):
    intestazione = tipo + dati
    controllo = zlib.crc32(intestazione) & 0xFFFFFFFF
    return (
        struct.pack(">I", len(dati))
        + intestazione
        + struct.pack(">I", controllo)
    )


def salva(larghezza, altezza, pixel):
    intestato = struct.pack(">IIBBBBB", larghezza, altezza, 8, 6, 0, 0, 0)
    righe = bytearray()
    for y in range(altezza):
        righe.append(0)
        for x in range(larghezza):
            righe.extend(pixel[y][x])
    immagine = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", intestato)
        + chunk(b"IDAT", zlib.compress(bytes(righe), 6))
        + chunk(b"IEND", b"")
    )
    percorso = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "preview.png"
    )
    with open(percorso, "wb") as file:
        file.write(immagine)
    print("scritto", percorso)


disegna_raggi()
disegna_cerchio()
salva(LARGHEZZA, ALTEZZA, canvas)
