<p>Este error lo puede causar diferentes acciones, pero en este caso me refiero que apache en vez de presentar un error de php, como la variable no existe, el archivo no existe o cualquier otro tipo de error, muestra <strong>Apache 500 Internal Server Error</strong>.</p>

<span id="more-54"></span>

<p>Si este es el caso este problema puede ser un dolor de cabeza, por lo cual para esto tenemos dos forma como resolver.</p>

<h2>Metodo 1</h2>
<p>Si tienes acceso al archivo php.ini en tu servidor este metodo es el indicado, de lo contrario debes utilizar el <strong><a href="#metodo2">Metodo 2</a></strong>. para esto debemos localizar el archivo <strong>php.ini</strong> para una rapida consulta, en un archivo php ejecutamos el metodo <code>phpinfo();</code> y nos mostrara una serie pero las que nos interesa son dos en particular: <strong>Configuration File (php.ini) Path</strong> y <strong>Loaded Configuration File</strong> la cual nos indica donde esta el archivo <strong>php.ini</strong>.</p>

<p>Si los valores de <strong>Configuration File (php.ini) Path</strong> y <strong>Loaded Configuration File</strong> son diferentes deben utilizar Loaded Configuration File. ya que es el archivo que esta cargado actualmente.</p>

<p>La diferencia que hay entre <strong>Configuration File (php.ini) Path</strong> y <strong>Loaded Configuration File</strong> es que el archivo php.ini por defecto es Configuration File (php.ini) Path y Loaded Configuration File el que se esta utilizando actualmente, ya que php permite al usuario crear su propio php.ini, o si utilizas XAMPP, WAMP, MAMP o algo parecido para crear tu servidor es muy probable que ellos tengan su propio php.ini.</p>

<p>Ya que sabes cual archivo modificar, lo abres y edita con tu editor de texto favorito y buscar <strong>error_reporting</strong> y verificar que el valor sea <code>error_reporting = E_ALL</code> luego unas lineas mas abajo deberá aparecer <code>display_errors</code> verifica que tenga <code>display_errors = On</code></p>

<p>Solo tendras que reiniciar el servidor y los errores volverán aparecer.</p>

<p><b>NOTA:</b> Si lo errores siguen sin aparecer, y sigue mostrando 500 Internal Service Error en vez de un error de PHP debes verificar que el Software que uses para manejar el servidor ya sea XAMPP, WAMP, MAMP, etc. no manejen ellos mismo el php.ini, ya que estos mismo por mas que modifiques el php.ini lo modificaran ya que estos valores lo cambiarias por el cliente mismo en la Sección de PHP Manejo de Errores.</p>

<h2 id="metodo2">Metodo 2</h2>

<p>El metodo 2 lo utilizas si no tienes acceso al php.ini o no quieres modificarlos de todo caso este metodo para hacer que reaparezcan esos errores al inicio del archivo php deberás agregar estas linea, que vendría siendo lo mismo que modificaríamos en php.ini.
<pre>
<code class="php">
error_reporting(E_ALL);
ini_set('display_errors', 'On');
</code>
</pre>
</p>

<p>Y Con esto tenemos los errores de PHP devuelta en nuestro servidor.</p>