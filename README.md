# Payyex  
  
All commands listed below needed to be launched in the terminal inside the project folder.  

[How to install proccess manager on AWS](https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-2-5fbdea95f8a1).
  
## Local development  
  
Make sure that node and npm are installed.

```npm install```  
  
Run server:  
```npm run start```  
  
Run static files watcher:  
```npx ng build --watch```  
  
## Updating server  
  
Run production build:  
  
```npx ng build --aot -prod```  
  
Copy all files to the server.  
  
Connect to the server by ssh and lounch a command:  
```ps aux | grep node```   
  
Find line like:  
```ubuntu   22203  0.0  4.6 931132 47224 ?        Ssl  20:11   0:04 node /var/www/payyex-landing.com/server.js```  
  
Take first number — it's a pid of a proccess. And run a command with this number:  
```kill -9 22203```  
  
It will restart the server.

## Content updating

Files with translations:

* src/assets/i18n/*.json
* src/app/faq-info-*.ts

“General” is situated here src/app/apidocs/apidocs.component.ts (line 65, first one).
Categories select need to translate here src/app/contact/contact.component.html (lines 45-50).

## HTTPS

1. [Create certificates](https://aws.amazon.com/certificate-manager/).
2. Copy certificates to the folder ```keys```. Use file names: ```cert.pem``` and ```key.pem```.
3. Restart Nginx on the server by command:
```sudo service nginx restart```
