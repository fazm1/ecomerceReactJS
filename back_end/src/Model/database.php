<?php

namespace App\Model;
use mysqli;
class Database{
    private String $servername;
    private String $username;
    private String $password;
    private String $dbname;
    private $connection;
    //String $servername, String $username, String $password, String $dbname,
    public function __construct()
    {
        //$this->$servername = $servername;
        //$this->$username = $username;
        //$this->$password = $password;
        //$this->$dbname = $dbname;
        $this->connection = new mysqli('localhost', 'root', '', 'scandiweb_database');
    }

    //setters
    public function setServerName($newServerName){
        $this->servername = $newServerName;
    }
    public function setUserName($newUserName){
        $this->username = $newUserName;
    }
    public function setPassword($newPassword){
        $this->password = $newPassword;
    }
    public function setDbName($newDbName){
        $this->dbname = $newDbName;
    }
    public function setConnection($newConnection){
        $this->connection = $newConnection;
    }

    //getters
    public function getServerName(){
        return $this->servername;
    }
    public function getUserName(){
        return $this->username;
    }
    public function getPassword(){
        return $this->password;
    }
    public function getDbName(){
        return $this->dbname;
    }
    public function getConnection(){
        return $this->connection;
    }
 //$servername, $username, $password, $dbname
  

}