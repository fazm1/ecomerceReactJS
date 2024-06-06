<?php

namespace AppController;

require_once __DIR__ . '/../../classes/gallery.php';
require_once __DIR__ . '/../../classes/price.php';
require_once __DIR__ . '/../../classes/currency.php';
require_once __DIR__ . '/../../classes/attributeSet.php';
require_once __DIR__ . '/../../classes/attribute.php';

use Exception;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;
use mysqli;

class GraphQL {

    public function __construct(){
        

    }
    static public function handle() {
        try {
            $AttributionType = new ObjectType([
                'name' => 'Attribution',
                'fields' => [
                    'attribution_id' => [
                        'type' => Type::int(),                 
                    ],
                ],
            ]);
            $CategoryType = new ObjectType([
                'name' => 'Category',
                'fields' => [
                    'name' => [
                        'type' => Type::string(),                 
                    ],
                ],
            ]);
            $AttributeType =new ObjectType([
                'name' => 'Attribute',
                'fields' => [
                    'displayValue' => [
                        'type' => Type::string(),                 
                    ],
                    'value' => [
                        'type' => Type::string(),                 
                    ],
                    'id' => [
                        'type' => Type::string(),                 
                    ],
                ],
            ]);
            $AttributeSetType =new ObjectType([
                'name' => 'AttributeSet',
                'fields' => [
                    'id' => [
                        'type' => Type::string(),                 
                    ],
                    'items' => [
                        'type' => Type::listOf($AttributeType),
                        'resolve' => function ($rootValue3) {
                            return \Attr::attributeResolve($rootValue3);
                        }                  
                    ],
                    'name' => [
                        'type' => Type::string(),                 
                    ],
                    'type' => [
                        'type' => Type::string(),                 
                    ],
                ],
            ]);
            $CurrencyType = new ObjectType([
                'name' => 'Currency',
                'fields' => [
                    'label' => [
                        'type' => Type::string(),                 
                    ],
                    'symbol' => [
                        'type' => Type::string(),                 
                    ],
                ],
            ]);
            $PricesType = new ObjectType([
                'name' => 'Prices',
                'fields' => [
                    'amount' => [
                        'type' => Type::float(),                 
                    ],
                    'currency' => [
                        'type' => Type::listOf($CurrencyType),
                        'resolve' => function ($rootValue2) {
                            return \Currency::currencyResolve($rootValue2);
                            
                        }                  
                    ],
                ],
            ]);
            $ProductsType = new ObjectType([
                'name' => 'Products',
                'fields' => [
                    'product_id' => [
                        'type' => Type::int(),                 
                    ],
                    'id' => [
                        'type' => Type::string(),                 
                    ],
                    'name' => [
                        'type' => Type::string(),                 
                    ],
                    'inStock' => [
                        'type' => Type::boolean(),                 
                    ],
                    'gallery' => [
                        'type' => Type::listOf(Type::string()),
                        'resolve' => function ($rootValue) {
                            return \Gallery::galleryResolve($rootValue);
                        }
                    ],
                    'description' => [
                        'type' => Type::string(),                 
                    ],
                    'category' => [
                        'type' => Type::string(),                 
                    ],
                    'attributes' => [
                        'type' => Type::listOf($AttributeSetType),
                        'resolve' => function ($rootValue) {
                            $rootValue3 [] = \AttributeSet::attributeSetResolve($rootValue);
                            return \AttributeSet::attributeSetResolve($rootValue);
                        }
                        
                    ],
                    'prices' => [
                        'type' => Type::listOf($PricesType),
                        'resolve' => function ($rootValue) {
                            $rootValue2 [] = \price::priceResolve($rootValue);
                            return \price::priceResolve($rootValue);
                        }                 
                    ],
                    'brand' => [
                        'type' => Type::string(),                 
                    ],

                ],
            ]);
            
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'products' => [
                        'type' => Type::listOf($ProductsType),                 
                        'resolve' => function () {
                            $db = new mysqli('localhost', 'root', '', 'scandiweb_database');
                            $sql = "SELECT * FROM product";
                            $result = $db->query($sql);
                            $arr = [];
                            while($row = $result->fetch_assoc()){
                                $arr[] = $row;
                                }
                            $rootValue [] = $arr;
                            $db->close();
                            return $arr;
                        },
                    ],
                    'categories' => [
                        'type' => Type::listOf($CategoryType),                 
                        'resolve' => function () {
                            $db = new mysqli('localhost', 'root', '', 'scandiweb_database');
                            $sql = "SELECT * FROM category";
                            $result = $db->query($sql);
                            $arr = [];
                            while($row = $result->fetch_assoc()){
                                $arr[] = $row;
                                }
                            $db->close();
                            return $arr;
                        },
                    ],
                    'getProductID' => [
                        'type' => Type::int(),
                        'args' => [
                            'name' => ['type' => Type::string()],
                        ],               
                        'resolve' => function ($calc, array $args) {
                            $name = $args['name'];
                            $db = new mysqli('localhost', 'root', '', 'scandiweb_database');
                            $sql = "SELECT product_id FROM product WHERE `name` = '$name' ";
                            $result = $db->query($sql);
                            $arr = [];
                            while($row = $result->fetch_assoc()){
                                $arr[] = $row;
                                }
                            $db->close();
                            return $arr[0]['product_id'];
                        },
                    ],
                    'getAttributionID' => [
                        'type' => Type::int(),
                        'args' => [
                            'attribute' => ['type' => Type::string()],
                            'set' => ['type' => Type::string()],
                        ],               
                        'resolve' => function ($calc, array $args) {
                            $value = $args['attribute'];
                            $aset = $args['set'];
                            $db = new mysqli('localhost', 'root', '', 'scandiweb_database');
                            $sql = "SELECT attribution_id FROM attribution INNER JOIN attribute ON attribution.a_id = attribute.attribute_id INNER JOIN attributeset ON attribution.as_id = attributeset.as_id WHERE attribute.value = '$value' AND attributeset.name = '$aset'";
                            $result = $db->query($sql);
                            $arr = [];
                            while($row = $result->fetch_assoc()){
                                $arr[] = $row;
                                }
                            $db->close();
                            return $arr[0]['attribution_id'];
                        },
                    ],
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'placeOrder' => [
                        'type' => Type::float(),
                        'args' => [
                            'total' => ['type' => Type::float()],
                        ],
                        'resolve' => function ($calc, array $args){
                            
                            $db = new mysqli('localhost', 'root', '', 'scandiweb_database');
                            $stmt = $db->prepare('INSERT INTO orderr (total) VALUES (?)');
                            $stmt->bind_param('d', $args['total']);
                            $stmt->execute();
                            /**Insert Order */
                            return $args['total'];
                        } ,
                    ],
                    'OrderItems' =>[
                        'type' => Type::listOf(Type::int()),
                        'args' => [
                            'product' => ['type' => Type::string()], //Product ID string
                            'item' => ['type'=> Type::listOf(Type::int())] //attribution ID
                        ],
                        'resolve' => function ($calc, array $args){
                            $db = new mysqli('localhost', 'root', '', 'scandiweb_database');
                            $sql = "SELECT LAST_INSERT_ID(order_id) FROM orderr";
                            $result = $db->query($sql);
                            $arr = [];
                            while($row = $result->fetch_assoc()){
                                $arr[] = $row;
                                }
                            $orderID = $arr[count($arr)-1]['LAST_INSERT_ID(order_id)'];
                            /**Get id of inserted element in a variable */

                            $pid = $args['product'];
                            $sql = "SELECT `product_id` FROM `product` WHERE `id` = '$pid'";
                            $result = $db->query($sql);
                            $arr = [];
                            while($row = $result->fetch_assoc()){
                                $arr[] = $row;
                                }
                            $pidNum = $arr[0]["product_id"];
                            /**Get product id number */

                            for($i = 0; $i < count($args['item']); $i++){
                            $stmt = $db->prepare('INSERT INTO ordereditem (item, product, order_id) VALUES (?, ?, ?)');
                            $stmt->bind_param('iii', $args['item'][$i], $pidNum, $orderID);
                            $stmt->execute();
                            }
                            /**Insert OrderID, Product, Item(s) in table ordereditems*/

                            $db->close();
                            return $args['item'];
                        },
                    ]
                ],
            ]);

            
             //See docs on schema options:
            // https://webonyx.github.io/graphql-php/schema-definition/#configuration-options
            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery($queryType)
                ->setMutation($mutationType)
            );
        
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }
            
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;
        

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();


        } catch (Throwable $e) {
            
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}