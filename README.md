# nodejs_vue_demo
Demo of a remote server
Per impostare l'avvio della bash:
> nano ~/.systeminfo.sh
Fai le modifiche del caso, poi Ctrl+O poi Invio per salvare, Ctrl+X per uscire
Per cambiare i permessi:
> chmod +x ~/.systeminfo.sh
Per aggiungere l'esecuzione all'avvio:
> echo "~/.systeminfo.sh" >> ~/.bashrc

# toolchain GNU
Prima di installare la toolchain GNU
gcc (Ubuntu 13.3.0-6ubuntu2~24.04) 13.3.0
Per installare:
> wget https://github.com/foss-for-synopsys-dwc-arc-processors/toolchain/releases/download/arc-2024.12-release/arc_gnu_2024.12_prebuilt_elf32_le_linux_install.tar.xz
> tar xvf arc_gnu_2024.12_prebuilt_elf32_le_linux_install.tar.xz
> cd arc_gnu_2024.12_prebuilt_elf32_le_linux_install
# Aggiungi il bin alla variabile PATH, ad esempio:
> export PATH=$PATH:$(pwd)/bin

# comandi misti
Per cancellare tutta una directory:
> rm -r <dir>
Più cattivo:
> sudo rm -rf nome_cartella
Per ricaricare la console:
> source ~/.bashrc

# docker
Dopo aver creato un docker, per eseguirlo:
> docker-compose up --build
Per stoppare il processo Ctrl+c oppure:
> docker-compose down

# backend
- Installato chalk per avere log colorati
> cd backend
> npm install chalk@4  (installa la versione compatibile con js)