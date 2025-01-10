const { exec } = require('child_process');

async function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${stderr}`);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

async function main() {
    const executor = process.argv[2];
    const motiu = process.argv[3];
    const githubUser = process.env.GITHUB_USER;
    const githubPassword = process.env.GITHUB_PASSWORD;

    const commitMsg = `Pipeline executada per ${executor}. Motiu: ${motiu}`;
    const gitUsername = 'Thor22Greta';
    const gitUserEmail = 'edgarmg22@gmail.com';
    
    try {
        console.log('Configurant git');
        await runCommand(`git config --global user.name "${gitUsername}"`);
        await runCommand(`git config --global user.email "${gitUserEmail}"`);

        console.log('Afegint canvis...');
        await runCommand('git add .');

        console.log('Verificant estat de git abans del commit:');
        const {stdout: statusBefore} = await runCommand('git status');

        if(!statusBefore.includes('nothing to commit, working tree clean')) {
            console.log('Fent commit dels canvis...');
            await runCommand(`git commit -m "${commitMsg}"`);
    
            console.log('Verificant estat de git després del commit:');
            await runCommand('git status');
    
            console.log('Fent push dels canvis...');
            await runCommand(`git remote set-url origin https://${githubUser}:${githubPassword}@github.com/KvaleroSor/pratica_obligatoria_jenkins.git`);
            await runCommand('git push origin HEAD:ci_jenkins');
        }else{
            console.log('No hi ha canvis per fer commit.');
        }
    
        console.log('Canvis afegits correctament - ✅');
    } catch (error) {
        console.error('Error al intentar pujar els canvis:');
        if (error.stderr) {
            console.error('stderr:', error.stderr);
        }
        if (error.stdout) {
            console.error('stdout:', error.stdout);
        }
        if (error.message) {
            console.error('message:', error.message);
        }
        process.exit(1);
    }
}

main();