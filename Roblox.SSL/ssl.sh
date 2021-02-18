openssl genrsa -des3 -out mfdlabsprivate.key 1024
openssl req -new -key mfdlabsprivate.key -out mfdlabs.csr -config config.conf
openssl x509 -req -days 3650 -in mfdlabs.csr -signkey mfdlabsprivate.key -out mfdlabs.crt -extfile config.conf -extensions v3_req