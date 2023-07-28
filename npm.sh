#!/bin/bash

# instala las dependencias del front
cd client
echo "###Dependencias front###"
npm i

# instala las dependencias del back-end

echo""
echo""
cd ../server
echo "###Dependencias back###"
npm i
