# Sveta vrteča WC  školjka

Projekt pri matematiki in informatiki v drugem letniku.

## Vsebina projekta

Končni izdelek bo spletna stran o prostorskih dimenzijah.Projekt bo vseboval:

* nekaj teorije o dimenzijah (kaj pomenijo, dimenzije fraktalov).
* Prokazovalnik večdimenzionalnega sveta, kjer je število dimenzij naravno število
* izrisovalnik fraktalov

## Priprava lokalnega git repositorija

Najprej naloži [Git for Windows](https://gitforwindows.org/), če ga še nimaš. Vpišeš se noter.

Potem uporabiš čarobni ukaz:

`git clone https://github.com/Smrt666/Sveta-vrteca-WC-skoljka`

in moral bi se ti naložiti projekt v mapo Sveta-vrteca-WC-skoljka. Greš vanjo.

## Uporaba git-a

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

* lastnosti prostorov
* lastnosti osnovnih oblik
* obnašanje vektorjev pri translacijah, rotacijah

### Ne celih dimenzij

* definicija dimenzij
* fraktali
* ostalo

## Praktičen del

### Celih dimenzij

N-D svet - grafični prikaz preprostih oblik v poljubno dimenzionalnem svetu.

### Ne celih dimenzij

1. Opis parih fraktalov
2. Način risanja fraktalov
3. Par jih narišeš
