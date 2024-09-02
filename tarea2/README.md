# tarea2

### Para instalar las dependencias:

```bash
npm install
```

### Para generar el bundle en `/dist`:

> [!WARNING]A tener en cuenta
> Si se abre directamente el archivo `index.html` la página web no funcionará bien, para esto se recomienda utilizar un servidor local, utilizar el entorno de desarrollo o utilizar el comando `npm run serve` 

```bash
npm run build
```

**Para crear un ambiente de desarrollo**

```bash
npm run dev
```

### Si se quiere cambiar el correo el cuál recibe la información, se tiene que modificar lo siguiente:
1. En el archivo `src/data.json` modificar el valor de `mail` al final del archivo.
2. Generar de nuevo el bundle con `npm run build`, en caso de estar usando el entorno de desarrollo, este paso no es necesario.

