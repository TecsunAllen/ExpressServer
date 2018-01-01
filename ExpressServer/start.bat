@echo off
start cmd.exe /c code
start cmd.exe /c "..\\environments\\MongoDB\\bin\\mongod.exe" --dbpath ..\\environments\\data
start cmd.exe /c webpack --display-error-details --watch