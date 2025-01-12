Example of nextjs project using Cypress.io

<!---Start place for the badge -->
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

<!---End place for the badge -->

## ¿Qué es Jenkins?

Jenkins es una herramienta de automatización de código abierto que se utiliza principalmente para la integración continua y entrega continua (CI/CD). Proporciona una plataforma flexible y extensible para compilar, probar y desplegar software automáticamente. 

### Características principales de Jenkins:
1. **Integración Continua (CI):** Ayuda a detectar errores temprano al integrar código de manera frecuente.
2. **Entrega Continua (CD):** Automatiza la preparación y despliegue de aplicaciones en entornos de producción.
3. **Extensibilidad:** Dispone de una amplia variedad de plugins para personalizar y adaptar a diferentes necesidades.
4. **Compatibilidad:** Funciona con múltiples sistemas operativos, lenguajes de programación y sistemas de control de versiones como Git.

### Ventajas de Jenkins:
- **Automatización:** Reduce el esfuerzo manual en el proceso de desarrollo y despliegue.
- **Monitoreo:** Ofrece reportes detallados del estado de las construcciones y las pruebas.
- **Comunidad Activa:** Dispone de una amplia comunidad que contribuye con plugins, soporte y mejoras constantes.

Para más información, visita el sitio oficial de Jenkins: [https://www.jenkins.io](https://www.jenkins.io)

---

## Pràctica Jenkins

**LINK DE VERCEL:** [https://practica-obligatoria-jenkins.vercel.app/](https://practica-obligatoria-jenkins.vercel.app/)  
**LINK DE GITHUB:** [https://github.com/Thor22Greta/practica_obligatoria_jenkins](https://github.com/Thor22Greta/practica_obligatoria_jenkins)  

Utilitzaré com a projecte base de React el repositori [https://github.com/antoni-gimenez/nodejs-blog-practica](https://github.com/antoni-gimenez/nodejs-blog-practica).  
Clone el repositori, accedisc a ell i el copie al nou repositori creat al meu GitHub: [https://github.com/Thor22Greta/practica_obligatoria_jenkins](https://github.com/Thor22Greta/practica_obligatoria_jenkins).  
![image1](images/image1.jpg)  

He tingut problemes amb Jenkins, per tant l’he eliminat i tornat a descarregar. He fet les instal·lacions del pluggins necesaris (NodeJS, Ant, Monitor Build View).  
![image2](images/image2.jpg)  

### CREACIÓ DE UNA PIPELINE A JENKINS:
Seleccionem “Nueva Tarea”, afegim un nom a la tasca i elegim l’opcio “Pipeline”:  
![image3](images/image3.jpg)  
![image4](images/image4.jpg)  

Necessitem passar uns parámetres a la nostra tasca. Cliquem a l’opció “Esta ejecución debe parametrizarse”, ”Añadir un parámetro” i seleccionarem “Parámetros de cadena” (son cadenes de text).  
![image5](images/image5.jpg)  

Configurarem els paràmetres que nosaltres dessitjem:  
![image6](images/image6.jpg)  

Vincule la Pipeline amb el repositori de Github, afegint els credencials i les branques del meu projecte:  
![image7](images/image7.jpg)  

### CREACIÓ DE LA BRANCA `ci_jenkins` I DEL `Jenkinsfile`
Clone el repositori [https://github.com/Thor22Greta/practica_obligatoria_jenkins.git](https://github.com/Thor22Greta/practica_obligatoria_jenkins.git), cree la nova branca `ci_jenkins` i l’arxiu `Jenkinsfile`.  

1. **Petició de Dades:**  
Serà necessari utilitzar paràmetres:  
![image8](images/image8.jpg)  

Haurem d’afegir un stage que gestione les dades que introduirem per paràmetres:  
![image9](images/image9.jpg)  

El resultat una vegada corre la nostra Pipeline es:  
![image10](images/image10.jpg)  

2. **STAGE DEL LINTER:**  
El linter revisa el nostre codi fent complir unes regles estandaritzades:  
![image11](images/image11.jpg)  

Cree un script per a fer mes visual els resultats de Linter. La idea me la fa arribar el company Kike Valero:  
![image12](images/image12.jpg)  

La execució de la part de Linter donarà este resultat a la Consola de la Pipeline:  
![image13](images/image13.jpg)  

3. **STAGE DELS TESTS:**  
Els test que realitzem son simples sobre la funció “handler” ubicada al nostre arxiu “./pages/api/users/index.js” i serveixen per a comprobar rutes.  
![image14](images/image14.jpg)  

La funció que executa les proves es ”handler.tests.js” i es troba dins del directori `/tests`:  
![image15](images/image15.jpg)  

Una vegada els tests pasen correctament, a la Console Pipeline es visualitzarà:  
![image16](images/image16.jpg)  

4. **STAGE BUILD:**  
Aquest stage crearà una versió empaquetada del nostre projecte per a poder desplegarlo a Vercel mes avant.  
![image17](images/image17.jpg)  

Aquests son els resultats del STAGE BUILD:  
![image18](images/image18.jpg)  

5. **UPDATE README:**  
Aquesta funció modificarà el Readme.md segons els resultats dels tests:  
![image19](images/image19.jpg)  

Aquest es el script que fa possible l’edició del Readme:  
![image20](images/image20.jpg)  

Resultats del UPDATE README a la Console Pipeline:  
![image21](images/image21.jpg)  

6. **PUSH CHANGES:**  
Aquest es l’stage que executarà l’script:  
![image22](images/image22.jpg)  

I aquest es l’script que afegirà canvis, farà el commit i push dels canvis al repositori remot dels arxius modificats. Utilitzarà les credencials creades a Jenkins i declarades al `Jenkinsfile` a l’element “Environment”:  
![image23](images/image23.jpg)  

Els resultats de PUSH CHANGES a la Console donen un error de credencials, que després de tornar a crear les credencials varies vegades, segueix donant i no puc resoldre. Seguiré intentant la seua resolució:  
![image24](images/image24.jpg)  

7. **DEPLOY A VERCEL:**  
Aquest stage s’encarregarà de desplegar el projecte a Vercel:  
![image25](images/image25.jpg)  

A l’script també es fa ús de les credencials creades a Jenkins:  
![image26](images/image26.jpg)  

Al haver un error al PUSH CHANGES, el DEPLOY en Vercel no es realitza correctament:  
![image27](images/image27.jpg)  

Pero realment la aplicació si s’ha pogut obrir a Vercel:  
![image28](images/image28.jpg)  

8. **POST A TELEGRAM:**  
A l’ultim stage, creem un missatge que ens arribarà per Telegram, notificant-nos les dades de cada stage de la Pipeline.  
![image29](images/image29.jpg)  

Aquest es l’script creat per a fer mes visual la resposta tant a la Consola de Jenkins com al missatge de Telegram:  
![image30](images/image30.jpg)  

Per a poder veure els posibles errors mentre anava realitzant la pràctica, vaig demanar que el POST de Telegram es realitzara de tota manera, enumerant els error i exits de la execució:  
![image31](images/image31.jpg)  

Este es el Post de Telegram recibido:  
![image32](images/image32.jpg)  

