db.createUser(
    {
        user: "transaction",
        pwd: "transaction",
        roles: [
            {
                role: "readWrite",
                db: "transaction"
            }
        ]
    }
)