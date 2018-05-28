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
* Donde "cmd" sera el comando usado para abrir el navegador con la cuenta de correo asociada. Para que funcione bien con Chrome, lo suyo
es tener asociadas las cuentas en nuestro navegador[Añadir cuenta de Gmail] para que se puedam abrir por numero(mail/u/0)
```
{
  "Cuenta1": {
    "username": "usuario",
    "password": "pasword123",
    "cmd": "google-chrome-stable --app=https://mail.google.com/mail/u/0/#inbox --new-window &"
  },
  "Cuenta2": {
    "username": "usuario",
    "password": "pasword123",
    "cmd": "google-chrome-stable --app=https://mail.google.com/mail/u/1/#inbox --new-window &"
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
$> gchecker [options]
# Para ver los correos en la consola
$> gchecker -m check
# Para abrir el navegador en Gmail con la cuenta asociada
$> gchecker -m open
```

## Capturas
<p align="center"><img src="https://github.com/dokoto/gchecker/raw/master/assets/screen1.png" width="800" /></p>