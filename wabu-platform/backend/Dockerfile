# Usa l'immagine ufficiale Node.js
FROM node:18

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia solo package.json per caching ottimale
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutto il resto del codice
COPY . .

# Espone la porta 3000
EXPOSE 3000

# Avvia l'app Express
#CMD ["node", "index.js"]
# Avvia in modalità dev con nodemon
CMD ["npm", "run", "dev"]
