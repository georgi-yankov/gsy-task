<?php
 	require_once("Rest.inc.php");
	
	class API extends REST {
	
		public $data = "";
		
		const DB_SERVER = "127.0.0.1";
		const DB_USER = "user";
		const DB_PASSWORD = "qwerty";
		const DB = "gsy_task_db";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		 */
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
				
		private function signIn(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$user = json_decode(file_get_contents("php://input"),true);

			$email = $user['email'];	
			$passwd = $user['password'];

			if(!empty($email) and !empty($passwd)){
				if(filter_var($email, FILTER_VALIDATE_EMAIL)){
					$query="SELECT * FROM users WHERE email = '$email' AND passwd = '$passwd' LIMIT 1";
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

					if($r->num_rows > 0) {
						$result = $r->fetch_assoc();	
						// If success everythig is good send header as "OK" and user details
						$this->response($this->json($result), 200);
					}
					$this->response('', 204);	// If no records "No Content" status
				}
			}
			
			$error = array("status" => "Failed", "msg" => "Invalid Email address or Password");
			$this->response($this->json($error), 400);
		}

		private function signUp(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$user = json_decode(file_get_contents("php://input"),true);

			$email = $user['email'];	
			$passwd = $user['password'];

			$query = "INSERT INTO users(email, passwd) VALUES('$email', '$passwd')";

			if(!empty($email) and !empty($passwd)){
				if(filter_var($email, FILTER_VALIDATE_EMAIL)){
					// TO DO:
					// 1. password validation
					// 2. encrypt the password

					if($this->existUser($email)) {
						// Already exist a user with this email address
						$error = array("status" => "Failed", "msg" => "Exist such a user.");
						$this->response($this->json($error), 400);
					}

					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
					$success = array('status' => "Success", "msg" => "User Created Successfully.", "data" => $user);
					$this->response($this->json($success),200);
				}

				$error = array("status" => "Failed", "msg" => "Invalid Email address.");
				$this->response($this->json($error), 400);
			}else
				$this->response('',204);	//"No Content" status
			}

		private function existUser($email) {
			$existEmail = false;

			$query="SELECT email FROM users WHERE email = '$email' LIMIT 1";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0) {
				$existEmail = true;
			}

			return $existEmail;
		}
		
		/*
		 *	Encode array into JSON
		 */
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>