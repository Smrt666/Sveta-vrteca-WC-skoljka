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

`git push` shrani podatke na github.

Da prešteješ število vrstic v datotekah:

`git ls-files | xargs wc -l`
