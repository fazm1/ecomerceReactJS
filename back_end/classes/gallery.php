<?php

class Gallery{
    private String $url;
    private Product $p_id;

    public function __construct(String $url, Product $p_id){
        $this->url = $url;
        $this->p_id = $p_id;
    }

    //setters
    public function setUrl($url){
        $this->url = $url;
    }
    public function setPid($p_id){
        $this->p_id = $p_id;
    }

    //getters
    public function getUrl(){
        return $this->url;
    }
    public function getPid(){
        return $this->p_id;
    }

    public static function galleryResolve($rootValue){
        $dbObj = new App\Model\Database;
        $db = $dbObj->getConnection();
        $product_id = $rootValue['product_id'];
        $sql = "SELECT `url` FROM gallery WHERE p_id = $product_id";
        $result = $db->query($sql);
        $galleryUrls = [];
        while($row = $result->fetch_assoc()){
            $galleryUrls[] = $row['url'];
        }
        $db->close();
        return $galleryUrls;
    }
    }
