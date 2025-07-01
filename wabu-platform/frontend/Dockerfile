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

# Espone la porta usata da Vite (5173)
EXPOSE 5173

# Avvia server di sviluppo Vite accessibile dall'esterno
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
