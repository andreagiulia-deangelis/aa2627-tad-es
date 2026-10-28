# Genera preview.png: il fotogramma iniziale dello sketch.
#
# p5.js gira solo nel browser, quindi questa copia minimale della logica di
# sketch.js serve solo per produrre l'immagine di anteprima. Il fotogramma
# mostrato è quello all'inizio, quando frameCount è zero.

import math
import os
import struct
import zlib

LARGHEZZA = 800
ALTEZZA = 600

# riduzione dell'illusione: la preview deve essere più piccola, così che il
# disegno non venga tagliato e si veda tutto comodamente
SF = 0.75

BIANCO = (255, 255, 255, 255)
NERO = (0, 0, 0, 255)
SFONDO = (128, 128, 128, 255)

CENTRO_X = LARGHEZZA / 2
CENTRO_Y = ALTEZZA / 2

NUMERO_RAGGI = 180
SPESSORE_MASSIMO = 8
SPESSORE_RAGGIO_MAGGIORE = 16
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


def riempie_triangolo(angolo, spessore, colore, scala):
    dx = math.cos(angolo)
    dy = math.sin(angolo)
    mezzo = spessore * SF * scala / 2
    base_raggio = RAGGIO_CAMPO * SF * scala
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
    angolo = 0  # frameCount = 0
    scala = 0.8  # la pulsazione dello sketch al frame 0 accorcia i raggi allo 0,8
    for i in range(NUMERO_RAGGI):
        direzione = angolo + i * (2 * math.pi) / NUMERO_RAGGI
        raggio_maggiore = i == 0 or i == NUMERO_RAGGI // 2
        spessore = SPESSORE_RAGGIO_MAGGIORE if raggio_maggiore else SPESSORE_MASSIMO
        colore = NERO if (raggio_maggiore or i % 2 == 1) else BIANCO
        riempie_triangolo(direzione, spessore, colore, scala)


def disegna_cerchio():
    centro_x = round(CENTRO_X)
    centro_y = round(CENTRO_Y)
    raggio_max = (RAGGIO_CIRCOLO + 20) * SF
    x_min = max(0, round(CENTRO_X - raggio_max))
    x_max = min(LARGHEZZA - 1, round(CENTRO_X + raggio_max))
    y_min = max(0, round(CENTRO_Y - raggio_max))
    y_max = min(ALTEZZA - 1, round(CENTRO_Y + raggio_max))
    for y in range(y_min, y_max + 1):
        for x in range(x_min, x_max + 1):
            distanza = math.sqrt((x - centro_x) ** 2 + (y - centro_y) ** 2)
            if distanza <= raggio_max:
                raggio = min(max(distanza, (RAGGIO_CIRCOLO - 20) * SF), raggio_max)
                opacita = mappa(
                    raggio, (RAGGIO_CIRCOLO - 20) * SF, raggio_max, 255, OPACITA_MINIMA
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
