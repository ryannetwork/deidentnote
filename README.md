# DeIdentified Notes Viewer

## Background
This is a NodeJS and Express web application that displays Differences between Identified Clinical Notes and the deidentified versions.

## Install
    
    git clone git@github.uiowa.edu:ICTS/deidentnote.git 
    cd deidentnote
    export PORT=3032
    yarn install
    npm start

## Access the Page 

Open a browser and connect to [LocalHost](http://localhost:3032/)




## Apache Reverse Proxy Configuration
Optionally you can configure an apache reverse proxy:

    ProxyPass /deident/ http://localhost:3032/
    ProxyPassReverse /deident/ http://localhost:3032/
    ProxyPreserveHost On
    <Location /deident/>
       RequestHeader set X-DeIdent-Name "/deident"
       Require all granted
    </Location>

