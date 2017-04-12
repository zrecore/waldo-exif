# waldo-exif
Sample EXIF extraction and query tool

You will need VirtualBox and Vagrant installed on your machine.

## Configure
Copy/Edit `waldo-exif/app/WaldoExifApi/server/datasources.json.sample` to `waldo-exif/app/WaldoExifApi/server/datasources.json`, as this file should contain the MongoDB user name and password set in `waldo-exif/app/mongo_setup.js`


## Run

Navigate to the `waldo-exif` directory, and run:

```
vagrant up
```

This should provision a new VM (Ubuntu 16.04).


You should edit your machine's `/etc/hosts` file to give your VM a nice local name:

```
192.168.33.11    local.waldo-exif.com
```


The Angular2 app is at [http://local.waldo-exif.com:4200]

The StrongLoop API server is at [http://local.waldo-exif.com:8080]