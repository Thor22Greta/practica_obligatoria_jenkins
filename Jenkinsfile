pipeline {
    agent any
    tools {
        nodejs 'Node Js'
    }
 
    environment {
        BOT_TOKEN = credentials('BotToken')
        VERCEL_ORG_ID = credentials('ORG_ID_VERCEL')
        VERCEL_PROJECT_ID = credentials('PROJECT_ID_VERCEL')
        VERCEL_TOKEN = credentials('TOKEN_VERCEL')
    }
    parameters {
        string(name: 'executor', defaultValue: 'Edgar Montagud', description: 'Executor de la tasca')
        string(name: 'motiu', defaultValue: 'missatge', description: 'Motíu per el qual estem executant la pipeline')
        string(name: 'chatId', defaultValue: 'num_chatId', description: 'Número del chat de telegram')
    }

    stages {
        stage('Petició de dades') {
            steps {
                script {
                    env.executor = params.executor
                    env.motiu = params.motiu
                    env.chatId = params.chatId
                    sh "echo 'Executor --> ${env.executor}'"
                    sh "echo 'Motiu --> ${env.motiu}'"
                    sh "echo 'ChatId --> ${env.chatId}'"
                }
            }
        }

        stage('Executant linter') {
            steps {
                // Instal·lant dependències
                sh 'npm install'

                // Executant linter
                script {                    
                    env.RESULT_LINTER = sh(script: 'npm run lint', returnStatus: true)                    
                    sh "node ./jenkinsScripts/indexLinter.js '${env.RESULT_LINTER}'"
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Skipping Cypress tests for now.'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'               
            }
        }

        stage('Update Readme') {
            steps {
                script {
                    env.RESULT_UPDATE_README = sh(script: "node ./jenkinsScripts/indexUpdateReadme.js '${env.RESULT_UPDATE_README}'", returnStatus: true)
                }
            }
        }

        stage('Push Changes') {
            steps {
                script {
                    try {
                        sh 'node ./jenkinsScripts/indexPushChanges.js Edgar Montagud missatge'
                    } catch (e) {
                        echo "Push Changes failed: ${e.getMessage()}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Deploy to Vercel') {
            when {
                expression {
                    return currentBuild.result == 'SUCCESS' || currentBuild.result == null
                }
            }
            steps {
                script {
                    env.RESULT_DEPLOY = sh(script: 'node ./jenkinsScripts/indexDeployVercel.js', returnStatus: true)
                }
            }
        }

    

    post {
        always {
            script {
                sh 'npm install node-telegram-bot-api'
                sh "node ./jenkinsScripts/indexNotificationTelegram.js '${env.chatId}' '${env.RESULT_LINTER}' '${env.RESULT_TEST_JEST}' '${env.RESULT_UPDATE_README}' '${env.RESULT_DEPLOY}'"
            }
        }
    }
}
