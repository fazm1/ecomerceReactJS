<?php

abstract class AttributeSet{

    private String $id;
    private String $name;
    private String $type;


    public function __construct(string $id, string $name, string $type,)
    {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
    }

    //setters
    public function setId($newId){
        $this->id = $newId;
    }
    public function setName($newName){
        $this->name = $newName;
    }
    public function setType($newType){
        $this->type = $newType;
    }


    //getters
    public function getId(){
        return $this->id;
    }
    public function getName(){
        return $this->name;
    }
    public function getType(){
        return $this->type;
    }



    public static function attributeSetResolve($rootValue){
        $dbObj = new App\Model\Database;
        $db = $dbObj->getConnection();
        $product_id = $rootValue['product_id'];
        $sql = "SELECT * FROM attributeset INNER JOIN productattribution ON productattribution.as_id = attributeset.as_id AND productattribution.p_id= $product_id";
        $result = $db->query($sql);
        $attributes = [];
        while($row = $result->fetch_assoc()){
            $attributes[] = $row;
        }
        $db->close();
        return $attributes;
    }
}

