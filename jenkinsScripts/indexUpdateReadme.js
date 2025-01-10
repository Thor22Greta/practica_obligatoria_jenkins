const fs = require('fs').promises;

async function main() {
    try {        
        const resultat_test = process.env.RESULT_TEST_JEST;
        console.log('Resultat dels tests ->', resultat_test);
        
        const img_error = 'https://img.shields.io/badge/test-failure-red';
        const img_exit = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg';
        const badge = resultat_test === '0' ? img_exit : img_error;
        const missatge_badge = `RESULTAT DELS ÚLTIMS TESTS \n ![Test result badge](${badge})`;

        const oldReadmePath = './OldREADME.md';
        let oldReadmeContent = await fs.readFile(oldReadmePath, 'utf-8');
        let newReadmeContent = missatge_badge + "\n" + oldReadmeContent;
        const readmePath = './README.md';
        await fs.writeFile(readmePath, newReadmeContent);

        process.exit(0);
    } catch (e) {
        console.error(e);
        core.setFailed(e.message);
    }

};

main();