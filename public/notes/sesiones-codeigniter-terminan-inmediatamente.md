<p>He estado utilizando <strong>Codeigniter</strong> por mucho tiempo localmente y remotamente pero nunca me habia pasado algo como esto, tratando de utilizar las sesiones localmente funcionaban sin ningún problema, pero al utilizarlo en un servidor, las sesiones no querían funcionar, no querían almacenarse ni mantenerse su tiempo indicado en la configuración de CodeIgniter.</p>

<span id="more-36"></span>

<p>En <strong>CodeIgniter 2.1.3</strong> es la version que utilizo actualmente tiene por defecto estas configuraciones de sesión.</p>

<h2>Sesiones CodeIgniter</h2>

```php
<?php
$config['sess_cookie_name']	= 'ci_session';
$config['sess_expiration']	= 7200;
$config['sess_expire_on_close']	= FALSE;
$config['sess_encrypt_cookie']	= FALSE;
$config['sess_use_database']	= FALSE;
$config['sess_table_name']	= 'ci_sessions';
$config['sess_match_ip']	= FALSE;
$config['sess_match_useragent']	= TRUE;
$config['sess_time_to_update']	= 300;
```

<p>Como podrán notar en <code>$config['sess_expiration']	= 7200;</code> nos indica que la session expirara después de 7200 segundos de ser creada, que resulta ser 2 horas, la cual se ira actualizando en cada ejecución y en fin el caso seria que si dura 2 horas (7200 segundos) inactiva expirara.</p>

<p>Esto me estaba funcionando perfectamente en mi servidor local hasta que trate de subirlo a un servidor remoto en la cual no encontraba cual seria el problema que no podia iniciar sesión, pense que el servidor no me estaba guardando o trabajando las sesiones pero si las almacenabas.</p>

<p>Investigando encontre el <em>problema</em> y la <em>solución</em>.</p>

<h2>Problema</h2>
<p>El problema estaba en que el servidor remoto estaba en un pais con diferencia de horario mayor a 2 horas a mi pais de residencia, la cual el problema funcionaba de esta manera:</p>
<ol>
<li>Iniciaba Sesión en la web a las 08:00am.</li>
<li>El servidor creaba las sesiones y le indicaba al navegador local que esta sesión expiran en 2 horas de su hora local que es 01:00am, la cual nos indica que la sesión habra terminado a las 03:00am si no la consultan antes de esta hora.</li>
<li>Cuando inmediatamente volvia a preguntar por la sesión que acaba de crear... ¡BANG! no funciona porque ya expiro a las 03:00am hace 5 horas según el servidor, según mi navegador (cliente local) no es nada cierto.</li>
</ol>
<h2>Solución</h2>
<p>
Pues la solución es bastante simple, Incrementar el tiempo de expiración de la sesión, la cual seria 1 dia, así no encontraríamos ningún problema con el servidor y el cliente. Hay ciertos países que tienen casi 1 dia de diferencia así que pueden variar o elegir el valor que prefieran.
</p>