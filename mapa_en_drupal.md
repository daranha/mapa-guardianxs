# Pasos para integrar un mapa con Leaflet que se vea en Drupal
 
A continuación se muestran cada uno de los pasos para lograr visualizar un mapa hecho con Leaflet. 
El resumen de los pasos a seguir es: primero tener un mapa ya desarrollado, despues crear un nodo en Drupal en el sitio de riiaver.org, despues editar el archivo asamblea.libraries.yml para agregar dependencias dentro del tema asamblea. despues crear un template twig con el nombre del nodo creado y despues subir los archivos que se agregaron al tema del sitio en linea.
A continuación se explica cada paso:


 
## Que partes componen un mapa

Lo componen tres archivos

**leaflet.js**
El archivo que crea los mapas.

**script.js**
Este archivo es donde se trabaja todo lo que se le vaya a añadir de funcionalidad a el mapa. No tiene que llamarse exactamente asi, puede irse llamando segun el proyecto de mapa.

**leaflet.css**
Este archvio CSS es para tener algunos estilos definidos que ya trae leaflet. no se le hacen modficiaciones, solo se agrega como dependencia.

Existen otros archivos que se agregan, para el proyecto que se va a realizar seguramente existiran archivos **geojson** para los datos geograficos y el archivo leaflet.js necesita un archivo **leaflet.js.map** También se cargan algunas imágenes para mostrar marcadores en los mapas.
La ubicación de todos estos archivos se indican más adelante en la sección de dependencias.
 
 
## 1- Crear un nodo
Una vez que se tenga el mapa en leafleft se crea un nodo (una nueva pagina)  del tipo de contenido mapa. Este nodo debe tener el titulo del mapa y una descripción del mismo, esots son los unicos datos que se agregan a Drupal.
Al crea el nodo, Drupal le asigna un numero a ese nodo por ejemplo pondremos el nombre de : https://riaaver.org/node/1091

Se toma ese numero 1091 y se crea en el tema un archivo que se llevara ese numero en el nombre (node--1091.html.twig). Más adelante lo explicaremos en el paso 3.


## 2- Agregar dependencias en tema
Para los siguiente cambios se tiene que entrar a la carpeta donde esta el tema que usa el sitio. EL tema se llama asamblea y esta en esta ruta:

`/web/themes/contrib/asamblea`

Tenemos que agregar las dependencias que usaremos en el template de twig para mostrar el mapa, para hacer esto entramos al tema del sitio y en el archivo asamblea.libraries.yml.
En este archivo se agrega al final una regla de esta manera:

custom_mapa: <br>
  js:<br>
    js/script.js: {}
    
El primer nombre, en la primera linea puede ser el que se desee, solo no se puede acentos o palabras separadas.

Con este código indicamos que dentro del tema en la carpeta **js** se va a colocar un archivo llamado **script.js**. este archivo puede nombrarse como se desee, podria tener por ejemplo el nombre del mapa.
Si se requiere más de un archivo javascript se agrega en esta lista. Estos archivos solo se usaran en esta regla.

En el archivo **asamblea.libraries.yml** en la parte de arriba de manera más general se agregan 

**js/leaflet.js: {}
js/leaflet.js.map: {}**
    


 
## 3- Crear un template con twig
 
El sitio de riaaver tiene un tema que se llama **asamblea**. Ese tema es el que permite monstrar un diseño en el sitio web. 
Si se entra por SSH o por FTP el tema se encuentra en esta dirección:

`/web/themes/contrib/asamblea/`

esa carpeta de asamblea es propiamente el tema que usa el sitio dentro todos están los archivos que compone el tema, para el mapa solo se agregaran alguans cosas y se deja todo lo demas como esta.

Dentro de ese tema existe una carpeta donde estan los templates que usa el sitio, esta carpeta es:

`/web/themes/contrib/asamblea/templates/content/`

Los templates están escritos en un lenguaje que se llama twig y que es parecido al html y sirve para crear toda la estructura de cada tipo de pagina que muestra el sitio

ya en la ruta `/web/themes/contrib/asamblea/templates/content/` <br>
vamos a tomar un template que se llama **node--numeronodo.html.twig**  <br>
y lo vamos a copiar y renombrar a: **node--1091.html.twig**

lo que hace ese template es aplicar las instrucciones que tiene adentro solo al nodo  **1091**, cuando queramos hacer un nuevo mapa solo tenemos que repetir el paso poniendo el numero del nodo creado.

Si abrimos ese archivo lo unico que cambia es que tiene diferente es que tiene colocado este código html para llamar un mapa con leafleft.

`<div id="map"> </div>`

la otra diferencia que tiene este archivo twig es que llama el archivo(s) de javascript que se requiere para modificar el mapa, para agregarle caracteristicas. estos archivos se llama con este código:

`{{ attach_library('asamblea/custom_mapa') }}`
  
En este código se llama una libreria que se llama custom_mapa que es el mismo nombre de la regla que delcaramos en nuestro archivo de dependencias. Esta es la manera de poder indicar que el código que se llamara es este y que esta en el thema asamblea.  
  
  
para cada mapa se tiene que crear un nodo, agregar una regla en las dependendias y crear un archivo twig con el numero del nodo y el codigo que llama las dependencias.


  
  
## Ligas para mapa en Drupal



### Sobre leafleft y geojson

**Leaflet Tutorials**  <br>

https://leafletjs.com/examples.html

**Using GeoJSON in Leaflet**  <br>
https://bookdown.org/sammigachuhi/book-leaflet/using-geojson-in-leaflet.html

**Filtrando datos geográficos en formato GeoJSON con Leaflet**  <br>
https://mappinggis.com/2019/11/filtrando-datos-geograficos-en-formato-geojson-con-leaflet/

**Layer Groups and Layers Control**  <br>
https://leafletjs.com/examples/layers-control/

**Leaflet School**  <br>
https://github.com/sigdeletras/leaflet-school

**Leaflet-providers preview**  <br>
https://leaflet-extras.github.io/leaflet-providers/preview/


https://www.qgistutorials.com/en/docs/leaflet_maps_with_qgis2leaf.html


### Sobre Drupal y twig

**Twig Template naming conventions**  <br>
https://www.drupal.org/node/2354645

**Create html.twig in every pages in drupal 8**  <br>
https://stackoverflow.com/questions/40946752/create-html-twig-in-every-pages-in-drupal-8

**Agregar archivos an un twig en especifico**  <br>
https://www.youtube.com/watch?v=OEmG-teCmFM

**Adding assets (CSS, JS) to a Drupal module via *.libraries.yml**  <br>
https://www.drupal.org/docs/develop/creating-modules/adding-assets-css-js-to-a-drupal-module-via-librariesyml

**Agregar archivos an un twig en especifico**  <br>
https://www.youtube.com/watch?v=OEmG-teCmFM


