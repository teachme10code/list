# README #

### Description ### 

This repository contains code for a pro con server with an angular based client

### How do I get set up? ###

* Summary of set up
**Install node
**Install node dependencies running 'npm install' in the root directory
**Install mysql with the following:
- Username: root
- Password: 
**Start mysql by running 'sudo /usr/local/mysql/support-files/mysql.server start' 
**Run 'node ProConServer.js' in your terminal

* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions


* Other notes
WARNING: These need to be cleaned up so may not work.
-----
curl -H "Content-Type: application/json" -d '{"userId":2, "topicId":30, "type":"PRO", description":"It will feel like Thanksgiving", "weight":7}' 127.0.0.1:3000/proConListitem -v

curl -H "Content-Type: application/json" -d '{"description":"Should I have turkey tonight?", "userId":2}' 127.0.0.1:3000/proConTopic -v

curl -H "Content-Type: application/json" -d '{"proList":[{"id":1,"description":"I love cats","weight":3}],"conList":[{"id":1,"description":"Its too hard","weight":3}]}' localhost:3000/proConList -v

curl -H "Content-Type: application/json" -d '{"description":"Should I stay or should I go", "userId":1}' localhost:3000/proConTopic -v

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact