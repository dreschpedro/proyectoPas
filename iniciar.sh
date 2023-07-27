#!/bin/bash

# Abre una nueva ventana del Git Bash en la carpeta del front-end y ejecuta el servidor del front-end
start "" "C:\Program Files\Git\git-bash.exe" -c "cd client; npm run dev"

# Abre otra nueva ventana del Git Bash en la carpeta del back-end y ejecuta el servidor del back-end
start "" "C:\Program Files\Git\git-bash.exe" -c "cd server; npm start" 
