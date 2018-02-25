# gchecker
Herramienta de linea de comandos para comprobar si tienes correos en la bandeja de entra de Gmail
<p align="center"><img src="https://github.com/dokoto/gchecker/raw/master/assets/gmail.png" width="400" /></p>

## Como configurar
1º Crearemos el fichero ~/.gchecker/gcheckerrc.json'
```
$> mkdir ~/.gchecker
$> touch ~/.gchecker/gcheckerrc.json
```

2º Editamos el fichero y metemos algo asi:
```
{
  "Cuenta1": {
    "username": "usuario",
    "password": "pasword123"
  },
  "Cuenta2": {
    "username": "usuario",
    "password": "pasword123"
  }
}
```

## Como empezar
1º Como instalarla (Instalar siempre de manera global)
```
$> npm install gchecker -g
```

2º Como Ejecurarla
```
$> gchecker
```

## Capturas
<p align="center"><img src="https://github.com/dokoto/gchecker/raw/master/assets/screen1.png" width="800" /></p>