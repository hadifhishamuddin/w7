let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("week7").collection("users")
	}

	static async register(username, password, email, phonenumber) {
		// TODO: Check if username exists
		return users.findOne({
			'username': username,
			}).then(async user =>{
				if (user) {
					if ( user.username == username )
					{
						return "username exists"
					}
				}
		 
		// TODO: Save user to database
				else{
					await users.insertOne({      
					'username' : username,
					'password' : password,
					'email': email,
					'phone number': phonenumber,
					})
				return "user saved"
				}
			}) 
	}

	static async login(username, password, email, phonenumber) {
		// TODO: Check if username exists
		return users.findOne({        
  			'username': username   
			}).then(async user =>{
		// TODO: Validate password
				if (user) {
					if(user.password==password){
						return "passed"
					}
					else{
						return "failed"
					}
				}
		// invalid username		
				else
				{
					return "Invalid username"
				}
			})
		// TODO: Return user object
		return;
		}
}

module.exports = User;
