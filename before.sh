#!/bin/bash

dockerize -wait tcp://db:3306 -timeout 20s
echo "db connected"
npm install  
npm rebuild bcrypt --build-from-source
npm run docker
