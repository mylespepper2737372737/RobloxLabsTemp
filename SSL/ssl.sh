openssl genrsa -des3 -out ST4.key 1024
openssl req -new -key ST4.key -out ST4.csr -config config.conf
openssl x509 -req -days 3650 -in ST4.csr -signkey ST4.key -out ST4.crt -extfile config.conf -extensions v3_req