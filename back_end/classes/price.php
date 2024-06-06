<?php

class Price{
    private String $amount;
    private Currency $currency;

    public function __construct(String $amount, Currency $currency)
    {
        $this->amount = $amount;
        $this->currency = $currency;
    }

    //setters
    public function setAmount($newAmount){
        $this->amount = $newAmount;
    }

    public function setCurrency($newCurrency){
        $this->currency = $newCurrency;
    }

    //getters
    public function getAmount(){
        return $this->amount;
    }
    public function getCurrency(){
        return $this->currency;
    }
    public static function priceResolve($rootValue){
        $dbObj = new App\Model\Database;
        $db = $dbObj->getConnection();
        $product_id = $rootValue['product_id'];
        $sql = "SELECT * FROM price INNER JOIN pricing ON price.price_id = pricing.pricing_id AND pricing.product_id = $product_id";
        $result = $db->query($sql);
        $priceAmount = [];
        while($row = $result->fetch_assoc()){
            $priceAmount[] = $row;
            }
        $db->close();
        return $priceAmount;
    }
    }