#!/usr/bin/env bash

apt-get update
apt-get install -y vim
apt-get install -y apache2
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs
cp -r /vagrant/* /srv
cd /srv
npm update
npm install
npm install pm2 -g
chown -hR www-data:www-data /srv
su -l www-data
pm2 start app.js
pm2 startup ubuntu
apt-get install libapache2-mod-proxy-html
a2enmod proxy
a2enmod proxy_http
cat << EOF > /etc/apache2/sites-available/default
<VirtualHost *:80>
    ServerAlias www.node-example.com

    ProxyRequests off

    <Proxy *>
            Order deny,allow
            Allow from all
    </Proxy>

    <Location />
            ProxyPass http://localhost:4242/
            ProxyPassReverse http://localhost:4242/
    </Location>

</VirtualHost>
EOF
/etc/init.d/apache2 restart