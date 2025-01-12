const TelegramBot = require('node-telegram-bot-api');
const chatId = process.argv[2];
const TOKEN_BOT_TELEGRAM = process.env.BOT_TOKEN;
let LINTER_RESULT = process.argv[3].toString();
let TEST_RESULT = process.argv[4].toString();
let UPDATE_README_RESULT = process.argv[5]
let DEPLOY_RESULT = process.argv[6]

const bot = new TelegramBot(TOKEN_BOT_TELEGRAM, {polling: true});

console.log(`
  - Linter_stage: ${LINTER_RESULT} \n
  - Tests_stage: ${TEST_RESULT} \n
  - Update_readme_stage: ${UPDATE_README_RESULT} \n
  - Deploy_to_Verce_stage: ${DEPLOY_RESULT}`);

//Gestió de les dades que ens retorna cada stage, per a pintar-ho bonico al telegram.

(LINTER_RESULT.toString() === '0') ? LINTER_RESULT = 'Linter - ✅' : LINTER_RESULT = 'Linter falla - ❌';
(TEST_RESULT.toString() === '0') ? TEST_RESULT = 'Tests - ✅' : TEST_RESULT = 'Tests fallen - ❌';
(UPDATE_README_RESULT.toString() === '0') ? UPDATE_README_RESULT = 'Update_readme - ✅' : UPDATE_README_RESULT = 'Update_readme falla - ❌';
(DEPLOY_RESULT.toString() === '0') ? DEPLOY_RESULT = 'Deploy_to_Verce - ✅' : DEPLOY_RESULT = 'Deploy_to_Verce falla - ❌';

//Template

const msg = `S´ha executat la pipeline de jenkins amb els següents resultats: \n 
- Linter_stage: ${LINTER_RESULT} \n
- Tests_stage: ${TEST_RESULT} \n
- Update_readme_stage: ${UPDATE_README_RESULT} \n
- Deploy_to_Verce_stage: ${DEPLOY_RESULT}`;

bot.sendMessage(chatId, msg)
  .then(() => {
    console.log('Message sent');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });