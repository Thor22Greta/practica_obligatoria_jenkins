const { exec } = require('child_process');

function runCommand(command) {
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

async function deployToVercel() {
    const vercelToken = process.env.TOKEN_VERCEL;
    // const vercelOrgId = process.env.VERCEL_ORG_ID;
    // const vercelProjectId = process.env.VERCEL_PROJECT_ID;

    try {
        console.log("Desplegant el projecte a Vercel...");
        const deployCommand = `npx vercel --token ${vercelToken} --prod`;
        await runCommand(deployCommand);
        console.log("Desplegament completat amb exit ✅.");
    } catch (error) {
        console.error("Error al desplegar a Vercel ❌.");
        console.error(error);
        process.exit(1);
    }
}

deployToVercel();