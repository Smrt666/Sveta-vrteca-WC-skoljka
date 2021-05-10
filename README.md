# Sveta vrteča WC  školjka

Projekt pri matematiki in informatiki v drugem letniku.

## Vsebina projekta

Končni izdelek bo spletna stran o prostorskih dimenzijah.Projekt bo vseboval:

* nekaj teorije o dimenzijah (kaj pomenijo, dimenzije fraktalov).
* Prokazovalnik večdimenzionalnega sveta, kjer je število dimenzij naravno število
* izrisovalnik fraktalov

## Uporaba git-a - za Jošta in Andreja

Za preverjanje verzije programa:

`git status`

Za posodabljanje je čarobni ukaz:

`git pull`

Za vračanje programa na prejšnjo shranjeno verzijo

`git resore ime_programa`

Za shranjevanje programov:

```
git add *
git commit -m 'Sporočilo o spremebah. (nekaj besed)'
git push
```

`git add ime_programa` če želiš shraniti samo določene programe, * pomeni vse.

`git push` shrani podatke na github.

Da prešteješ število vrstic v datotekah:

`git ls-files | xargs wc -l`

Za brisanje datotek:

`git rm ime_datoteke`

Za preimenovanje:

`git mv ime_datoteke novo_ime_datoteke`

Za premikanje po mapah:

`git mv ime_datoteke ime_mape`

Za brisanje vseh datotek v mapi:

`git rm -rf ime_mape`

## Teorija

### Celih dimenzij

* lastnosti osnovnih oblik
* kompleksna števila (argument, množenje - rotacija, seštevanje - premikanje, korenjenje, zrcaljenje)
* kvaternioni
* matrike, vektorji (definicija, lastnosti, n+1 dimenzij - pospešena grafika)
* projekcija

### Ne celih dimenzij

* fraktalna definicija dimenzij
* samopodobni fraktali
* nesamopodbni fraktali

## Praktičen del

### Celih dimenzij

N-D svet - grafični prikaz preprostih oblik v poljubno dimenzionalnem svetu.

### Ne celih dimenzij

1. Opis parih fraktalov
2. Način risanja fraktalov
3. Par jih narišeš

## Pisanje enačb

Znotraj besedila \(\frac{1}{2}\)

$$
1 + 2 = 3

$$

podpisano:
x_{to je spodej}^{to je zgorej}
\phi \alpha
