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
		const res = await User.register("abu", "44dd", "0184342222")
		expect(res).toBe("user saved")
	})

	test("Duplicate username", async () => {
		const res = await User.register("abu", "44dd", "0184342222")
		expect(res).toBe("username exists")
	})

	test("User login incorrect username", async () => {
		const res = await User.login("syahmi", "44dd", "0184342222")
		expect(res).toBe("Incorrect username")
	})

	test("User login incorrect password", async () => {
		const res = await User.login("abu", "44de", "0184342222")
		expect(res).toBe("failed")
	})

	test("User login successfully", async () => {
		const res = await User.login("abu", "44dd", "0184342222")
		expect(res).toBe("passed")
	})
});
