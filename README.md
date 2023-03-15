<h1>SunnyFramework Shop Systems</h1>
<p>SunnyFramework Shop Systems is one of the web development bundle name "SunnyFramework". The Layouts of website are powered by SunnyUX</p>
<h1>Configuration.</h1>
<p>You need to configs couples things before you can starting SunnyFW on Node.js</p>
<p>1) Creating <b>.env</b> file containing variables as below.</p>
<pre>
PORT=
MYSQL_HOST=
MYSQL_USERNAME=
MYSQL_PASSWORD=
MYSQL_DATABASE=
DEFAULT_PASSWORD=
crypto_secret=
</pre>
<p>
<b>Sunny Framework</b> will access .env file to receive MySQL details such as MySQL Users,Password and others configs stored in this file such as hashing-secret and etc. Without .env file Web Application will not be able to access the database and begin to install the database tables using in the application.
</p>
<ul>
    <li><b>PORT</b> is port that you want web appication to running on.</li>
    <li><b>DEFAULT_PASSWORD</b> is default admin password for first time login.</li>
    <li><b>crypto_secret</b> is password hashing secret salt for sha256 powered by "crypto" module.</li>
</ul>
<h1>Installation.</h1>
<p>
Go to URL "/install" to run the mysql installing commands. If web application have no error creating tables it will redirected you to homepage and show succuessfully alert.
</p>