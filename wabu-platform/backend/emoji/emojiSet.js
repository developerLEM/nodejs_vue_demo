//################################################
// emojiSet.js
//################################################
// This module defines a set of emojis used for logging and categorizing messages in the application.
// Each emoji corresponds to a specific type of message or action, making it easier to identify the context of the log messages.
// The emojis are used in conjunction with the logger utility to provide visual cues in the console output.
// This can help developers and administrators quickly understand the nature of the logs without needing to read the entire message.
// The emojis are categorized by their purpose, such as information, success, warning, error, and various application-specific actions.
// This modular approach allows for easy updates or additions to the emoji set as the application evolves or new features are added.
// The emojis can be used in both development and production environments, providing a consistent logging experience across different stages of the application lifecycle.
//################################################

const emojiSet = {
  info: "ℹ️",          // Informazioni generiche
  success: "✅",       // Operazione riuscita
  warning: "⚠️",       // Attenzione
  error: "❌",         // Errore
  debug: "🐛",         // Debug
  db: "🗄️",            // Database
  api: "🔌",           // Chiamate API
  telegram: "📲",      // Telegram bot / notifica
  file: "📁",          // Logging su file
  startup: "🚀",       // Avvio app
  shutdown: "🛑",      // Arresto app
  admin: "👮‍♂️",         // Operazioni di amministrazione
  login: "🔐",          // Login utente
  logout: "🔓",         // Logout utente
  maintenance: "🔧",    // Manutenzione
  notification: "🔔",   // Notifiche
  chat: "💬",          // Chat / mess
  message: "✉️",       // Messaggi
  like: "👍",          // Like / apprezzamento
  dislike: "👎",       // Dislike / non gradito
  share: "🔗",         // Condivisione
  follow: "👥",        // Segui / follower
  unfollow: "🚫",      // Non seguire / unfollow
  reaction: "❤️",      // Reazione / cuore
  poll: "📊",          // Sondaggi
  vote: "🗳️",          // Votazione
  event: "🎉",         // Evento / festa
  alert: "🚨",         // Allerta / avviso
  task: "📋",          // Compito / task
  reminder: "⏰",      // Promemoria
  calendar: "📅",      // Calendario
  clock: "⏱️",         // Orologio / tempo
  location: "📍",      // Posizione / geolocalizzazione
  link: "🔗",          // Link / URL
  attachment: "📎",    // Allegato / file
  image: "🖼️",         // Immagine
  video: "🎥",          // Video
  audio: "🎵",          // Audio / musica
  document: "📄",      // Documento / file di testo
  code: "💻",          // Codice / programmazione
  bug: "🐞",           // Bug / errore nel codice
  feature: "✨",        // Nuova funzionalità
  update: "🔄",         // Aggiornamento
  feedback: "📝",      // Feedback / commento
  support: "🆘",       // Supporto / aiuto
  faq: "❓",           // Domande frequenti
  tutorial: "📚",      // Tutorial / guida
  community: "👥",     // Comunità / gruppo
  forum: "💬",         // Forum / discussione
  blog: "📝",          // Blog / articolo
  news: "📰",          // Notizie / aggiornamenti
  announcement: "📢",  // Annuncio / comunicato
  promotion: "🎁",     // Promozione / offerta
  sale: "💰",          // Vendita / sconto
  cart: "🛒",          // Carrello / acquisto
  payment: "💳",        // Pagamento
  invoice: "📑",       // Fattura / ricevuta
  subscription: "📅",  // Abbonamento
  membership: "👥",    // Iscrizione / membro
  loyalty: "🏆",       // Fedeltà / programma fedeltà
  reward: "🎖️",       // Ricompensa / premio
  achievement: "🏅",   // Raggiungimento / traguardo
  challenge: "🏆",     // Sfida / competizione
  competition: "🏁",   // Gara / competizione
  leaderboard: "📊",   // Classifica / leaderboard
  tournament: "🏆",    // Torneo / competizione
  event: "🎉",         // Evento / celebrazione
  party: "🎊",         // Festa / evento sociale
  celebration: "🎉",   // Celebrazione / evento speciale
  gift: "🎁",          // Regalo / dono
  thankYou: "🙏",      // Ringraziamento / gratitudine
  welcome: "👋",       // Benvenuto / saluto
  goodbye: "👋",       // Addio / saluto finale
  congratulations: "🎉", // Congratulazioni / successo
  apology: "🙏",       // Scuse / richiesta di perdono
  invitation: "📩",    // Invito / richiesta di partecipazione
  request: "📥",       // Richiesta / domanda
  confirmation: "✅",  // Conferma / accettazione
  cancellation: "❌",  // Cancellazione / annullamento
  error: "❗",         // Errore / problema
  success: "✅",       // Successo / operazione riuscita
  loading: "⏳",       // Caricamento / in attesa
  processing: "🔄",    // Elaborazione / in corso
  completed: "✔️",    // Completato / finito
  pending: "⏳",       // In attesa / in sospeso
  failed: "❌",        // Fallito / errore
  retry: "🔄",         // Riprova / tentativo
  skip: "⏭️",          // Salta / ignora
  next: "➡️",          // Prossimo / avanti
  previous: "⬅️",      // Precedente / indietro
  first: "⏪",         // Primo / inizio
  last: "⏩",          // Ultimo / fine  
  back: "🔙",          // Indietro / ritorno  
  forward: "🔜",       // Avanti / proseguimento
  home: "🏠",          // Home / pagina principale
  settings: "⚙️",      // Impostazioni / configurazione
  profile: "👤",       // Profilo utente
  key: "🔑",         // Login / accesso
};

//################################################
// EXPORTS
//################################################
module.exports = emojiSet;
