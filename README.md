
generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

