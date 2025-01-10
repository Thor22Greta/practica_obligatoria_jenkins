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

(LINTER_RESULT.toString() === '0') ? LINTER_RESULT = 'Linter s´ha executat exitosament - ✅' : LINTER_RESULT = 'Linter ha trobat errors - ❌';
(TEST_RESULT.toString() === '0') ? TEST_RESULT = 'Tests s´han executat exitosament - ✅' : TEST_RESULT = 'Tests han fallat - ❌';
(UPDATE_README_RESULT.toString() === '0') ? UPDATE_README_RESULT = 'Update_readme s´ha executat exitosament - ✅' : UPDATE_README_RESULT = 'Update_readme ha fallat - ❌';
(DEPLOY_RESULT.toString() === '0') ? DEPLOY_RESULT = 'Deploy_to_Verce s´ha executat exitosament - ✅' : DEPLOY_RESULT = 'Deploy_to_Verce ha fallat - ❌';

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