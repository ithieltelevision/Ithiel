#!/bin/bash
cd /sdcard/Ithiel\ Televisión
git add .
git commit -m "Sincronización manual $(date +'%d-%m-%Y %H:%M:%S')"
git push -f origin master
#!/bin/bash
cd /sdcard/Ithiel\ Televisión
git add .
git commit -m "Actualización automática $(date +'%d-%m-%Y %H:%M:%S')"
git push origin master

