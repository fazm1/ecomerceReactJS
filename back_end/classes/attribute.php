<?php

class Attr{
    private String $id;
    private String $value;
    private String $displayValue;


    public function __construct(String $id, String $value, String $displayValue){
        $this->id = $id;
        $this->value = $value;
        $this->displayValue = $displayValue;
    }

    //setters
    public function setId($newId){
        $this->id = $newId;
    }
    public function setValue($newValue){
        $this->value = $newValue;
    }
    public function setDisplayValue($newDisplayValue){
        $this->displayValue = $newDisplayValue;
    }


    //getters
    public function getId(){
        return $this->id;
    }
    public function getValue(){
        return $this->value;
    }
    public function getDisplayValue(){
        return $this->displayValue;
    }
 
    

    public static function attributeResolve($rootValue3){
        $dbObj = new App\Model\Database;
        $db = $dbObj->getConnection();
        $as_id = $rootValue3['as_id'];
        $sql = "SELECT * FROM attribute INNER JOIN attribution ON attribute.attribute_id = attribution.a_id AND attribution.as_id= $as_id";
        $result = $db->query($sql);
        $items = [];
        while($row = $result->fetch_assoc()){
            $items[] = $row;
        }
        $db->close();
        return $items;
    }
}