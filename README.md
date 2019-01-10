# DeIdentified Notes Viewer

## Background
This is a NodeJS and Express web application that displays Differences between Identified Clinical Notes and the deidentified versions.

## Install
    
    git clone git@github.uiowa.edu:ICTS/deidentnote.git 
    cd deidentnote
    export PORT=3032
    yarn install
    npm start

## Note URL
In our environment the Note URL accesses the Notes table by Note ID, and returns the Note Type, the Identified Text, Note Date Time, and the Deidentified text.

The note URL will need to reply to a GET request with:

Request: 

    curl localhost:9292/clinicnote/?noteid=100244475

Returns:

    {
        "noteType":"Sticky Note",
        "noteText":"Sample Text...",
        "noteDts":null,
        "txtNoteRptIrId":100244475,
        "noteRptTxtDeid":"Sample Text..."
    }

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

