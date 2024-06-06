<?php

class Currency{
    private String $label;
    private String $symbol;

    public function __construct(String $label, String $symbol)
    {
        $this->label = $label;
        $this->symbol = $symbol;
    }

    //setters
    public function setLabel($newLabel){
        $this->label = $newLabel;
    }
    public function setSymbol($newSymbol){
        $this->symbol = $newSymbol;
    }

    //getters
    public function getLabel(){
        return $this->label;
    }
    public function getSymbol(){
        return $this->symbol;
    }

    public static function currencyResolve($rootValue2) {
        $dbObj = new App\Model\Database;
        $db = $dbObj->getConnection();
        $price_id = $rootValue2['price_id'];
        $sql = "SELECT * FROM currency INNER JOIN price ON price.currency = currency.currency_id AND price.price_id = $price_id";
        $result = $db->query($sql);
        $currency = [];
        while($row = $result->fetch_assoc()){
            $currency[] = $row;
            }
        $db->close();
        return $currency;
    }
}