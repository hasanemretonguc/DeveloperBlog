    STACKS: NODE_JS MONGODB EJS

        SETUP FOR WINDOWS

Install NodeJS on Windows

Download the latest stable release of NodeJS from https://nodejs.org and install using all the default options.

Install MongoDB on Windows

Download the current stable release of MongoDB from https://www.mongodb.org/downloads and install using the "Complete" setup type and all the default options.

Create the MongoDB data directory

Create an empty folder at "C:\data\db".

MongoDB requires a directory for storing all of it's data, the default directory is "C:\data\db", you can use a different directory if you prefer by specifying the "--dbpath" parameter when starting the MongoDB server (below).

Start MongoDB Server on Windows

Start the MongoDB server by running "mongod.exe" from the command line, "mongod.exe" is located in "C:\Program Files\MongoDB\Server\[MONGODB VERSION]\bin", for example for version 3.2 the following command will start MongoDB:

"C:\Program Files\MongoDB\Server\3.2\bin\mongod"

Install NPM on Windows

Download the current stable release of NPM from https://www.npmjs.com/get-npm and install using the "Complete" setup type and all the default options.

Start the server.js 

"node server.js"

        SETUP FOR UBUNTU

Install Dependencies

First of all, we have to install some dependencies in order to proceed,

apt-get install build-essential git fontconfig libpng-dev ruby ruby-dev

gem install sass

Install MongoDB

In this section, we are going to install MongoDB as our Database, in order to install the latest stable version of MongoDB you should add the official repository:

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

Execute the following command to add the repository data in the proper path:

echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list

Now you can easily install MongoDB with the following command:

apt-get install mongodb-org

After the installation process is finished you can start and enable the MongoDB service with the commands below:

systemctl start mongod
systemctl enable mongod

Install NodeJS and NPM

In order to install Node.JS and NPM we have to add the “NodeSource” repository, the following bash script will do this easily:

curl -sL https://deb.nodesource.com/setup_8.x | -E bash -

Now you can execute the command below to install Node.JS and NPM:

apt-get install nodejs

Check the installed versions:

node -v
v8.9.1

npm -v
5.5.1