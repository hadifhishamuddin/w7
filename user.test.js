const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@Sandbox.mktdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("abu", "44dd", "b0220100xx", "0184342222")
		expect(res).toBe("new staff registered")
	})

	test("Duplicate username", async () => {
		const res = await User.register("abu", "44dd", "b0220100xx", "0184342222")
		expect(res).toBe("username already existed")
	})

	test("User login invalid username", async () => {
		const res = await User.login("syahmi", "44dd", "b0220100xx", "0184342222")
		expect(res).toBe("Invalid username")
	})

	test("User login invalid password", async () => {
		const res = await User.login("abu", "44de", "b0220100xx", "0184342222")
		expect(res).toBe("failed")
	})

	test("User login successfully", async () => {
		const res = await User.login("abu", "44dd", "b0220100xx", "0184342222")
		expect(res).toBe("passed")
	})
});