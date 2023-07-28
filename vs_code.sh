#!/bin/bash

# instala las dependencias del front
cd client
echo "###VScode front###"
code .

# instala las dependencias del back-end

echo""
echo""
cd ../server
echo "###VScode back###"
code .
