//const makeWASocket = require("@whiskeysockets/baileys").default;
const { default: makeWASocket,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
     downloadContentFromMessage,
     DisconnectReason,
     useMultiFileAuthState,
     MessageOptions,
     useSingleFileAuthState,
         prepareWAMessageMedia,
         generateWAMessageFromContent,
         generateMessageID,
         WA_DEFAULT_EPHEMERAL,
         delay,
         Mimetype,
         MessageType,
         proto,
         getMessageFromStore
    } = require("@whiskeysockets/baileys");
    //@adiwajshing/baileys @whiskeysockets/baileys
const cfonts = require("cfonts");
const fs = require('fs');
const path = require('path');
const webp = require('webp-converter');

async function connect() {
   const { state, saveCreds } = await useMultiFileAuthState('./sessao/session');

   const whmer = makeWASocket({
       printQRInTerminal: true,
       auth: state,
       defaultQueryTimeoutMs: undefined,
   });

   const banner = cfonts.render(("iana bot"), {
       font: "tiny",
       align: "left",
       colors: ['magenta', 'white', 'magenta'],
   });
   //console.log(banner.string); //string

   whmer.ev.on('connection.update', (update) => {
       const { connection, lastDisconnect } = update;

       if (connection === 'close') {
           const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

           if (shouldReconnect) {
               console.log('Trying to reconnect...');
               connect();
           } else {
               console.log('Connection closed permanently.');
           }
       } else if (connection === 'open') {
           console.log('Connection established successfully!');
       }
   });

   whmer.ev.on('creds.update', saveCreds);

   whmer.ev.on('messages.upsert', async (m) => {
       const message = m.messages[0];
       if (!message) return;
       const msg = m.messages[0];

       console.log('Received message:', message);


       if (!message.key.fromMe) {
           const jid = message.key.remoteJid;
          console.log(`Message from ${message.key.remoteJid}:  ${message.message?.conversation || ''}`);

           // Marcar a mensagem como lida usando readMessages
           await whmer.readMessages([message.key]);

           const textuser = message.message?.conversation || '';
           const command = textuser.split(' ')[0].toLowerCase(); 
       }
   });

   return whmer;
}

module.exports = connect;